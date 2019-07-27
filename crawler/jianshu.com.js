const { Crawler } = require('../core/core.crawler')

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
    const content = $(selector).html().replace(/data-original-src/g, 'src')


    return {
      title,
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