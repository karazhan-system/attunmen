import request from '@/commons/request'

export default {
  createTask: data => request({
    url: '/task',
    method: 'post',
    data
  }),
  getTasks: data => request({
    url: '/task',
    method: 'get',
    params: data
  }),
  getTask: data => request({
    url: `/task/${data.taskId}`,
    method: 'get',
  }),
  getTaskStatus: taskId => request({
    url: `/task/${taskId}/status`,
    method: 'get',
  }),
  editTask: ({ _id, ...rest }) => request({
    url: `/task/${_id}`,
    method: 'put',
    data: {
      ...rest
    }
  }),
  setTask: ({ _id, status }) => request({
    url: `/task/${_id}/status`,
    method: 'put',
    data: {
      status
    }
  }),
  deleteTasks: data => request({
    url: '/task',
    method: 'delete',
    data
  }),
  getDocs: data => request({
    url: '/document',
    method: 'get',
    params: data
  }),
  getDoc: id => request({
    url: `/document/${id}`,
    method: 'get',
  }),
  deleteDocs: data => request({
    url: '/document',
    method: 'delete',
    data
  }),
  getRate: ({ taskId }) => request({
    url: `/task/${taskId}/rate`,
    method: 'get',
  }),
}