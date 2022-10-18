import axios from 'axios'
import config from '../config'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import store from '../index'
import {  query, remove } from './localStorage'
const { configs } = config
const instance  = axios.create({
  timeout: 100000,
  baseURL: configs.BASE_URL,
})
instance.interceptors.request.use(config => {
  // 不是登录页面需要添加token
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
   remove('token')
   dispatch(routerRedux.push('/login'))
  }
})
export default instance