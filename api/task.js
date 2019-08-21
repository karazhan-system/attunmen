const Router = require('koa-router')
const api = new Router()
const Task = require('../model/task')
const Document = require('../model/document')
const { setTaskProcess } = require('../core/process')

api.prefix('/task')

// 新增任务
api.post('/', async ctx => {
  ctx.verifyParams({
    name: 'string',
    domain: 'string',
  })
  const task = await Task(ctx.request.body).save()
  ctx.body = task
})

// 删除任务
api.delete('/', async ctx => {
  ctx.verifyParams({
    ids: 'array'
  })
  const { ids = [] } = ctx.request.body

  const result = await Task.deleteOne({ _id: { $in: ids } })
  if (result) {
    ctx.body = result    
  }
})

// 修改任务
api.put('/:_id', async ctx => {
  const { _id } = ctx.params
  const { name, domain, entries, remark, cron } = ctx.request.body

  const task = await Task.findOneAndUpdate({ _id }, { name, domain, entries, remark, cron })
  if (task) {
    ctx.body = task
  }  
})

// 修改任务状态
api.put('/:_id/status', async ctx => {
  ctx.verifyParams({
    status: 'number'
  })

  const { _id } = ctx.params
  const { status } = ctx.request.body

  if (_id) {
    const task = await Task.findOneAndUpdate({ _id }, { status })
    if (task) {
      try {
        setTaskProcess({ _id, status })
      } catch (error) {
        await Task.findOneAndUpdate({ _id }, { status: 5 })
      }
      ctx.body = task
    }  
  }
})

api.get('/:_id/status', async ctx => {
  const { _id } = ctx.params
  if (_id) {
    const { status } = await Task.findById(_id, 'status')
    ctx.body = status
  }
})

// 查询任务列表
api.get('/', async ctx => {
  const { size, index } = ctx.util.getPageInfo(ctx.query)
  const tasks = await Task.find().sort({ createdAt: -1 }).limit(size).skip(index)
  const total = await Task.countDocuments()
  const list = tasks.map(task => task.toObject({ virtuals: true }))
  
  ctx.body = {
    list,
    total, 
  }

})

// 查询指定任务
api.get('/:_id', async ctx => {
  const { _id } = ctx.params
  const task = await Task.findById(_id)
  ctx.body = task
})

// 查询进度
api.get('/:taskId/rate', async ctx => {
  const { taskId } = ctx.params
  const total = await Document.countDocuments({ taskId })
  const finished = await Document.countDocuments({ taskId, status: 1 })
  ctx.body = Math.floor(finished / total * 100)
})

module.exports = api
