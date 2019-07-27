const Router = require('koa-router')
const api = new Router()

const { createCrawler, parseMd, parseKeyword } = require('../core')

api.get('/', async ctx => {
  ctx.verifyParams({
    url: 'string'
  })
  const { url } = ctx.query

  const crawler = createCrawler(url)
  const { title, content } = await crawler.fetchContent(url)

  const md = await parseMd(content)
  const keywords = await parseKeyword(content)

  ctx.body = {
    title,
    content,
    md,
    keywords
  }
})

module.exports = api