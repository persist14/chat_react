import {demo} from '../api/login'
export default {

  namespace: 'index',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      // history.listen(location => {
      //   // console.log(location);
      //   if(location.pathname === '/') {
      //     dispatch({
      //       type: 'demo'
      //     })
      //   }
      // })
    },
  },

  effects: {
    *demo({ payload }, { call, put }) {  // eslint-disable-line
      yield call(demo)
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
