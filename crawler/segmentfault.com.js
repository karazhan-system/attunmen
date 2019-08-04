const { Crawler } = require('../core/core.crawler')
const fs = require('fs')

class SiteCrawler extends Crawler {
  constructor (options) {
    super(options)
    this.domain = 'segmentfault.com'
  }

  // 获取指定url的内容
  async fetchContent (url, selector = '.article__content') {
    const html = await this.fetch(url)
    const $ = this.parseHTML(html)

    const title = $('#articleTitle a').text()
    const keywords = $('meta[name=keywords]').attr('content')
    const description = $('meta[name=description]').attr('content')
    const rawContent = $(selector).html()

    const imgReg = /<img[\s\S]*?data-src\s*=\s*[\"|\'](.*?)[\"|\'][\s\S]*?>/g

    let matches
    const imgs = []
    while ((matches = imgReg.exec(rawContent)) !== null) {
      const [matched, p1] = matches
      imgs.push(`https://segmentfault.com${p1}`)
    }

    const ossImgs = await this.download(imgs)

    const content = $(selector).html().replace(imgReg, (match, p1) => {
      const filename = ossImgs[`https://segmentfault.com${p1}`]
      return match.replace(/src\s*=\s*[\"|\'](.*?)[\"|\']/g, `src="https://karazhan.oss-cn-shenzhen.aliyuncs.com/${filename}"`)
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