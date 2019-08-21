const Crawler = require('../core/crawler')

class WebCrawler extends Crawler {
  constructor (options) {
    super(options)
  }

  async parse () {
    const getList = async (entry, num) => {
      const url = entry + num
      const $ = await this.$fetch(url)
      if ($) {
        const list = $('#post_list .post_item')
        
        list.each((i, item) => {
          const url = $(item).find('.titlelnk').attr('href')
          const title = $(item).find('.titlelnk').text()
          this.$add({ url, title })
        })

        if ($('#pager_bottom .pager a').eq(-1).text().match('Next')) {
          await getList(entry, num + 1)
        }
      }
    }

    const listPromises = this.entries.map(entry => getList(entry, 1))
    await Promise.all(listPromises)
  }

  async run () {
    await this.$each(async doc => {
      console.log('get it');
      
      if (!(doc.data && doc.data.raw)) {
        console.log(doc);
        
        const $ = await this.$fetch(doc.url)
        if ($) {
          const description = $('meta[property="og:description"]').attr('content')
          const raw = $('#cnblogs_post_body').html()

          await this.$save(doc._id, { 
            data: { 
              description, 
              raw 
            } 
          })
        }
      }
      
    })
  } 
  
}

module.exports = WebCrawler