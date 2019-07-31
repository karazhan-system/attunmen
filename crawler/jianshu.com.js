const { Crawler } = require('../core/core.crawler')
const fs = require('fs')

class SiteCrawler extends Crawler {
  constructor (options) {
    super(options)
    this.domain = 'jianshu.com'
  }

  // 获取指定url的内容
  async fetchContent (url, selector = '.show-content-free') {
    const html = await this.fetch(url)
    const $ = this.parseHTML(html)

    const title = $('title').text()
    const keywords = $('meta[name=keywords]').attr('content')
    const description = $('meta[name=description]').attr('content')
    const rawContent = $(selector).html()

    const reg = /data-original-src="([^"]*)"/g

    let matches
    const imgs = []
    while ((matches = reg.exec(rawContent)) !== null) {
      const [matched, p1] = matches
      imgs.push(`https:${p1}`)
    }

    const ossImgs = await this.download(imgs)
    console.log(ossImgs);
    

    const content = $(selector).html().replace(/data-original-src="([^"]*)"/g, (match, p1) => {
      const filename = ossImgs[`https:${p1}`]
      return `src="https://karazhan.oss-cn-shenzhen.aliyuncs.com/${filename}"`
    })

    return {
      title,
      keywords,
      description,
      rawContent,
      content
    }
  }

  // 获取指定列表的内容
  fetchList () {

  }

  // 获取整站内容
  fetchSite () {

  }

}

module.exports = SiteCrawler