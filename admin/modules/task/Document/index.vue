<template src="./view.html"></template>
<style lang="stylus" scoped src="./view.styl"></style>

<script>
import Model from '../model.js'
import Mixin from '@/mixins'

// 状态
const state = {
  data: {},
  title: '',
  url: '',
  activeNames: ['description', 'raw']
}

// 事件
const events = {
  
} 

export default {
  mixins: [
    Mixin.options,
  ],
  data () {
    return state
  },
  methods: {
    ...events,
    async init () {
      this.id = this.$route.params.id
      await this.getDoc()
    },
    async getDoc () {
      const result = await Model.getDoc(this.id)
      if (result) {
        this.title = result.title
        this.url = result.url
        this.data = result.data
      }
    }
  },
  created () {
    this.init()
  },
}
</script>
