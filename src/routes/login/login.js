import { connect } from 'dva'
// import { useState } from 'react'
import { routerRedux } from 'dva/router'
import styles from './login.scss'
import chatLogo from '../../assets/image/chat_logo.png'
import LoginForm from '../../components/Login/'
function loginBox({ dispatch, login }) {
  // const [loginShow, setLoginShow] = useState(true)
  const LoginFormProps = {
    title: '登录你的聊天账户',
    tabText: ['手机验证码登录', '账号密码登录'],
    onOk(data) {
      dispatch({
        type: 'login/login',
        payload: data
      })
      dispatch(routerRedux.push({
        pathname: '/'
      }))
    },
    btnText: '登录'
  }
  return (
    <>
      <div className={styles.login_container} >
        {/*logo信息*/}
        <div className={styles.login_logo} >
          <img src={chatLogo} alt="显示错误"/>
          <p> 聊天室 </p>
        </div>
        {/*描述*/}
        <div className={styles.login_description} >更加高效还原设计稿，好好学习。</div>
        {/*登录框*/}
        <LoginForm {...LoginFormProps} />
      </div>
    </>
  )
}

export default connect(({login}) => ({login}))(loginBox)
