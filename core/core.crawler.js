const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
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

  parseHead ($) {
    const keywords = $('meta[name=keywords]').attr('content')
    const description = $('meta[name=description]').attr('content')
    return { keywords, description }
  }
}

const urlsReg = /(www\.)?([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+)/
const crawlers = fs.readdirSync(path.resolve(__dirname, '../crawler')).map(name => name.replace('.js', ''))

// 解析Url
const parseUrl = url => {
  const result = url.match(urlsReg)
  const [match, host, domain] = result

  let crawler = ''
  crawlers.forEach(name => {
    if (domain.match(name)) {
      crawler = name
    }
  })
  
  return crawler
}

module.exports = {
  Crawler,
  // 创建爬虫对象函数
  createCrawler (url) {
    const crawlerName = parseUrl(url)
    if (crawlerName) {
      const SiteCrawler = require(`../crawler/${crawlerName}`)
      return new SiteCrawler()
    } else {
      
    }
  }  
}