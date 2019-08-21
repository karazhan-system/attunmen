<template src="./view.html"></template>
<style lang="stylus" scoped src="./view.styl"></style>

<script>
import Model from '../model.js'
import Mixin from '@/mixins'

// 状态
const state = {
  options: {},
  selection: [],
  documents: [],
  task: {},
  rate: '0%',
  statusText: '',
  loading: false
}

// 事件
const events = {
  _Parse () {
    this.$confirm(`是否开始解析任务待采集列表`, { type: 'warning' }).then(() => {
      this.parseTask()
    }).catch(err => {})
  },
  _Run () {
    this.$confirm(`是否开始采集列表`, { type: 'warning' }).then(() => {
      this.runTask()
    }).catch(err => {})
  },
  _Delete () {
    if (this.selection.length) {
      this.$confirm('是否删除所选文档？', { type: 'warning' }).then(() => {
        this.deleteDocs()
      }).catch(err => {})
    } else {
      this.$alert('请选择要删除的文档！')
    }
  },
  _Clear () {
    this.$confirm('是否清空任务？', { type: 'warning' }).then(() => {
      this.clearDocs()
    }).catch(err => {})
  },
  _Select (selection) {
    this.selection = selection
  },
  _Page () {
    this.getDocs()
  },
  _View (row) {
    window.open(`#/task/document/${row._id}`)
  }
} 

export default {
  mixins: [
    Mixin.options,
    Mixin.page
  ],
  data () {
    return state
  },
  methods: {
    ...events,
    async init () {
      this.taskId = this.$route.params.id
      this.task = await this.getTask()

      this.setDisplayByStatus()
      
      await this.getDocs()
      this.rate = await this.getRate()
    },
    async setDisplayByStatus () {
      const status = await Model.getTaskStatus(this.taskId)
      if (status === 1) {
        this.loading = true
        this.statusText = '任务解析中'
        this.polling()
      }
      if (status === 3) {
        this.loading = true
        this.statusText = '任务采集中'
        this.polling(true)
        
      }
    },
    polling (calcRate) {
      let c = setInterval(async () => {
        const status = await Model.getTaskStatus(this.taskId)
        if (calcRate) {
          const rate = await this.getRate()
          this.statusText = `任务已采集${rate}%`
        }

        if (status !== 1 && status !== 3) {
          clearInterval(c)
          this.getDocs()
          this.loading = false
        }
      }, 5000);
    },
    async getRate () {
      const result = await Model.getRate({
        taskId: this.taskId
      })
      return result
    },
    async getTask () {
      const result = await Model.getTask({
        taskId: this.taskId
      })
      return result || {}
    },
    async parseTask () {
      const result = await Model.setTask({
        _id: this.taskId, 
        status: 1
      })
      if (result) {
        this.$message('开始解析！')
        this.setDisplayByStatus()
      }
    },
    async runTask () {
      const result = await Model.setTask({
        _id: this.taskId, 
        status: 3
      })
      if (result) {
        this.$message('开始采集！')
        this.setDisplayByStatus()
      }
    },
    async getDocs () {
      const result = await Model.getDocs({
        ...this.page,
        taskId: this.taskId
      })
      if (result) {
        this.documents = result.list
        this.page.total = result.total
      }
    },
    async deleteDocs () {
      const result = await Model.deleteDocs({
        ids: this.selection.map(item => item._id)
      })
      if (result) {
        this.$message('成功删除文档！')
        this.getDocs()
      }
    },
  },
  created () {
    this.init()
  },
}
</script>
