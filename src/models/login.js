import modelExtends from 'dva-model-extend'
import origin from './index'
import { login } from '../api/login'
import { add } from '../utils/localStorage'
export default modelExtends(origin, {
  namespace: 'login',
  effects: {
      *login({payload}, {put, call}) {
         const rs = yield call(login, payload)
         console.log(rs);
         if(rs.success) {
            let token = rs.token.split(' ').pop()
            console.log(token)
            add('token', token)
         }
      }
  },
  reducers: {},
  subscriptions: {}
}
)