import axios from 'axios'
import config from '../config'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import store from '../index'
import { add, query } from './localStorage'
const { configs } = config
const instance  = axios.create({
  timeout: 100000,
  baseURL: configs.BASE_URL,
  // withCredentials: true
})
instance.interceptors.request.use(config => {
  if (!config.url.includes('login')) {
    let token = 'bearer ' + query('token')
    config.headers.authorization = token
  }
  config.url = 'web/' + config.url
  return config
}, (err) => {
  console.log('errMsg',err)
})
instance.interceptors.response.use(config => {
  return config.data
}, (err) => {
  const { status } = err.response
  const { dispatch } = store
  if(status === 401) {
   message.error('token 无效')
   dispatch(routerRedux.push('/login'))
  }
  // throw err
})
export default instance