const Router = require('koa-router')
const api = new Router()
const Rule = require('../model/rule')

api.prefix('/rule')

// 新增任务
api.post('/', async ctx => {
  ctx.verifyParams({
    domain: 'string',
    script: 'string'
  })

  const rule = await Rule(ctx.request.body).save()
  ctx.body = rule
})

// 删除任务
api.delete('/', async ctx => {
  ctx.verifyParams({
    ids: 'array'
  })
  const { ids = [] } = ctx.request.body

  const result = await Rule.remove({ _id: { $in: ids } })
  if (result) {
    ctx.body = result    
  }
})

// 修改任务
api.put('/:_id', async ctx => {
  ctx.verifyParams({
    domain: 'string',
    script: 'string'
  })

  const { _id } = ctx.params
  const { domain, script } = ctx.request.body

  const rule = await Rule.findOneAndUpdate({ _id }, { domain, script })
  if (rule) {
    ctx.body = rule
  }  
})

// 查询任务列表
api.get('/', async ctx => {
  const { size, index } = ctx.util.getPageInfo(ctx.query)
  const rules = await Rule.find().sort({ createdAt: -1 }).limit(size).skip(index)
  const total = await Rule.countDocuments()
  const list = rules.map(rule => rule.toObject({ virtuals: true }))
  
  ctx.body = {
    list,
    total, 
  }

})

module.exports = api
