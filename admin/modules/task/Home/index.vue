<template src="./view.html"></template>
<style lang="stylus" scoped src="./view.styl"></style>

<script>
import Model from '../model.js'
import Mixin from '@/mixins'
import * as monaco from 'monaco-editor'

// 状态
const state = {
  options: {},
  dlgCreateVisible: false,
  dlgEditVisible: false,
  createFormData: {},
  editFormData: {},
  rules: {
    name: [
      { required: true, message: '请输入采集任务名称', trigger: 'blur' },
    ],
    domain: [
      { required: true, message: '请输入要采集的网站域名', trigger: 'blur' },
    ],
    entriesText: [
      { required: true, message: '请设置采集入口地址', trigger: 'blur' },
    ]
  },
  selection: [],
  tasks: []
}

// 事件
const events = {
  _Create () {
    this.dlgCreateVisible = true
    this.$nextTick(() => {
      this.$refs.createForm.clearValidate()
    })
  },
  _Delete () {
    if (this.selection.length) {
      this.$confirm('是否删除所选任务？', { type: 'warning' }).then(() => {
        this.deleteTasks()
      }).catch(err => {})
    } else {
      this.$alert('请选择要删除的任务！')
    }
  },
  _EditTask (task) {
    this.dlgEditVisible = true
    this.editFormData = task

    this.$nextTick(() => {
      this.$refs.editForm.clearValidate()
    })
  },
  _Select (selection) {
    this.selection = selection
  },
  _ConfirmCreate () {
    this.$refs.createForm.validate(valid => {
      if (valid) {
        this.dlgCreateVisible = false
        this.createTask()
      } else {
        return false
      }
    })
  },
  _ConfirmEdit () {
    this.$refs.editForm.validate(valid => {
      if (valid) {
        this.dlgEditVisible = false
        this.editTask(this.editFormData)
      } else {
        return false
      }
    })
  },
  _Page () {
    this.getTasks()
  },
  _ViewTask (task) {
    this.$router.push(`/task/detail/${task._id}`)
  },
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
      await this.setOptions([
        'taskType'
      ])
      await this.getTasks()
    },
    async createTask () {
      this.createFormData.entries = this.createFormData.entriesText.split('\n')
      const result = await Model.createTask(this.createFormData)
      if (result) {
        this.$refs.createForm.resetFields()
        this.getTasks()
      }
    },
    async getTasks () {
      const result = await Model.getTasks({
        ...this.page
      })
      if (result) {
        this.tasks = result.list.map(task => {
          task.entriesText = task.entries.join('\n')
          return task
        })
        this.page.pageCount = result.total
      }
    },
    async deleteTasks () {
      const result = await Model.deleteTasks({
        ids: this.selection.map(item => item._id)
      })
      if (result) {
        this.$message('成功删除任务！')
        this.getTasks()
      }
    },
    async editTask ({ _id, entries, entriesText, ...rest }) {
      const result = await Model.editTask({
        _id, 
        entries: entriesText.split('\n'),
        ...rest
      })
      if (result) {
        this.$message('成功修改任务！')
        this.getTasks()
      }
    }
    
  },
  created () {
    this.init()
  },
  mounted () {

  }
}
</script>
