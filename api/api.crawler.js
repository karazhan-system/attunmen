const Router = require('koa-router')
const api = new Router()

const axios = require('axios')
const cheerio = require('cheerio')

api.get('/', async ctx => {

  ctx.body = 'aaaa'
  // const { ruleId, url } = ctx.request.body
  // const selector = '.Post-RichTextContainer'

  // const req = await axios({
  //   headers: {
  //     'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.139 Chrome/66.0.3359.139 Safari/537.36'
  //   },
  //   url: url || 'https://zhuanlan.zhihu.com/p/42370005'
  // })

  // const html = req.data

  // const $ = cheerio.load(html, {
  //   decodeEntities: false,
  //   xmlMode: true
  // })

  // // 清除不需要的标签
  // const needClearTags = ['applet', 'area', 'aside', 'audio', 'button', 'canvas', 'command', 'datalist', 'dialog', 'embed', 'fieldset', 'form', 'frame', 'frameset', 'iframe', 'input', 'keygen', 'label', 'legend', 'link', 'map', 'menu', 'menuitem', 'noframes', 'noscript', 'object', 'optgroup', 'option', 'output', 'param', 'progress', 'rp', 'rt', 'ruby', 'script', 'select', 'source', 'style', 'textarea', 'track', 'video']
  // needClearTags.forEach(tag => $(tag).remove())

  // // 获取标题
  // const title = $('title').text()
  
  // // 获取内容
  // const content = $(selector).html().replace(/<!--[\s\S]*?-->/, '')  
 

  // ctx.body = {
  //   title,
  //   html: content,
  // }
})

module.exports = api