const Router = require('koa-router')
const api = new Router()

api.prefix('/api')

const crawler = require('./api.crawler')

api.use('/crawler', crawler.routes(), crawler.allowedMethods())

module.exports = api