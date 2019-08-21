const Router = require('koa-router')
const api = new Router()

const { createCrawler, parseMd, parseKeyword } = require('../core')

api.get('/', async ctx => {
  ctx.verifyParams({
    url: 'string'
  })
  const { url } = ctx.query

  const crawler = createCrawler(url)
  const { title, keywords, description, rawContent, content } = await crawler.fetchContent(url)

  const md = await parseMd(content)
  const words = await parseKeyword(content)
  // ctx.body = content
  ctx.body = {
    // 标题
    title,
    // 源页面关键字
    keywords,
    // 源页面描述
    description,
    // 源页面原始HTML
    rawContent,
    // 解析静态资源（图片）后的HTML
    content,
    // Markdown文本
    md,
    // 分词工具解析的词语
    words
  }
})

module.exports = api