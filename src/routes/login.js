import { connect } from 'dva'
import {useState} from "react";
import { useSpring, animated } from '@react-spring/web'
import styles from './login.scss'
import chatLogo from '../assets/image/chat_logo.png'
function Login() {
  const [currentTab, setCurrentTab] = useState(false)
  const [ springs, api ] = useSpring(() => ({
      from: {
        x: currentTab ? 120 : 0
      }
  }))
  const switchTab = () => {
      setCurrentTab(!currentTab)
      api.start({
        to: currentTab ? 0 : 120
      })
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
        <div className={styles.login_box} >
          <p className={styles.card_title} >登录你的聊天账户</p>
          <p className={styles.register} >没有账号？<span>立即注册</span></p>
          <div className={styles.card_content} >
            <p onClick={switchTab} > 手机验证码登录 </p>
            <p onClick={switchTab} > 账号密码登录 </p>
            <animated.div className={styles.tab_thumb} style={springs}  ></animated.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default connect()(Login)
