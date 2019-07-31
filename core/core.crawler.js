const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const config = require('../config')

// 爬虫基础类
class Crawler {
  constructor (options) {
    
  }

  async fetch (url) {
    const result = await axios({
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.139 Chrome/66.0.3359.139 Safari/537.36'
      },
      url,
    })
    return result.data
  }

  async download (urls) {
    const result = await axios({
      url: `${config.OSS}/img/`,
      method: 'post',
      data: {
        urls
      }
    })
    return result.data
  }

  // 处理远程获取的html文本，清除多余tag，生成cheerio对象
  parseHTML (html) {
    const $ = cheerio.load(html, {
      decodeEntities: false,
      xmlMode: true
    })
    const tags = ['applet', 'area', 'aside', 'audio', 'button', 'canvas', 'command', 'datalist', 'dialog', 'embed', 'fieldset', 'form', 'frame', 'frameset', 'iframe', 'input', 'keygen', 'label', 'legend', 'link', 'map', 'menu', 'menuitem', 'noframes', 'noscript', 'object', 'optgroup', 'option', 'output', 'param', 'progress', 'rp', 'rt', 'ruby', 'script', 'select', 'source', 'style', 'textarea', 'track', 'video']
    tags.forEach(tag => $(tag).remove())

    return $
  }
}

// 解析Url
const parseUrl = url => {
  return 'jianshu.com'
}

module.exports = {
  Crawler,
  // 创建爬虫对象函数
  createCrawler (url) {
    const domain = parseUrl(url)
    const SiteCrawler = require(`../crawler/${domain}`)
    
    return new SiteCrawler()
  }
}