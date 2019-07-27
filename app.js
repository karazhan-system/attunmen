const Koa = require('koa')
const KoaLogger = require('koa-logger')
const KoaBodyParser = require('koa-bodyparser')
const KoaCors = require('@koa/cors')
const KoaParameter = require('koa-parameter')
const api = require('./api')

const app = new Koa()

app.use(KoaCors())
app.use(KoaLogger())
app.use(KoaParameter(app))
app.use(KoaBodyParser())
app.use(api.routes())
app.use(api.allowedMethods())

app.listen(12345)