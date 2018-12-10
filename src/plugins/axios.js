import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, error => {
  return Promise.reject(new Error(error.response.data))
})

export default axios