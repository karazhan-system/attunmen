const Router = require('koa-router')
const api = new Router()

api.prefix('/api')

const setRoute = name => {
  const router = require(`../api/${name}`)
  api.use(router.routes(), router.allowedMethods())
}

setRoute('document')
setRoute('task')
setRoute('rule')
setRoute('dict')

module.exports = api