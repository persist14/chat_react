import styles from './LoginForm.scss'
import { connect } from 'dva'
import {useRef, useState} from "react";
import { message } from 'antd'
import { useSpring, animated } from '@react-spring/web'
import { routerRedux } from 'dva/router'
import userIcon from '../../assets/image/user.png'
import userFocusIcon from '../../assets/image/user_focus.png'
import userPwdIcon from '../../assets/image/password.png'
import userFocusPwdIcon from '../../assets/image/password_focus.png'
const ThumbComponent = ({ currentTab, setCurr }) => {

  const [width, setWidth] = useState(120)
  const [ springs, api ] = useSpring(() => ({
    from: {
      x: currentTab ? 130 : 0,
    }
  }))
  const switchTab = () => {
    setCurr(!currentTab)
    console.log(currentTab);
    currentTab ? setWidth(120) : setWidth(105)
    api.start({
      to: {
        x: currentTab ? 0 : 130,
      }
    })
  }
  return (
          <>
          <p onClick={switchTab} > 手机验证码登录 </p>
          <p onClick={switchTab} > 账号密码登录 </p>
          <animated.div className={styles.tab_thumb} style={{ width: width + 'px' ,...springs}}  ></animated.div>
          </>
          )
}
const InputComponent = ({icon, iconFocus, alertText, inputType, top, getData}) => {
  const [isFocus, setFocus] = useState(false)
  const [springs, api] = useSpring(2, () => ({
    from: {
      borderColor:'#ccc',
      // borderWidth: isFocus ? 2: 1
      boxShadow: '0 0 0 #ccc',
      background: '#fff'
    },
  }))
  const handlerFocus = () => {
    setFocus(true)
    api.start({
      from: {
        borderColor: '#ccc',
        boxShadow: '0 0 0 #ccc',
        background: '#fff'
      },
      to: {
        // borderWidth:isFocus ? 1: 2,
        borderColor: ' #007aff',
        boxShadow: '0 0 1px #007aff',
        background: '#e5f6ff'
      },
      // delay: 0
    })
  }
  const handlerBlur = () => {
    setFocus(false)
    api.start({
      from: {
        borderColor: '#007aff',
        boxShadow: '0 0 1px #007aff',
        background: '#e5f6ff'
      },
      to: {
        borderColor: ' #ccc',
        boxShadow: '0 0 0 #ccc',
        background: '#fff'
      }
    })
  }
  return (
          <>
          <div className={styles.user_input} >
            <img src={isFocus ? iconFocus : icon} style={{top: top ? top: 14 + 'px'}} />
            <animated.input ref={getData} type={inputType} style={springs} onFocus={handlerFocus} onBlur={handlerBlur} placeholder={alertText} />
          </div>
          </>

          )
}
const Form = () => {
  const [currentTab, setCurrentTab] = useState(false)
  const setCurr = (item) => {
    setCurrentTab(item)
  }
  const userInfo = useRef(null)
  const pwdInfo = useRef(null)
  const inputComponentProps = {
    icon: userIcon,
    iconFocus: userFocusIcon,
    alertText: '请输入账号',
    inputType: 'text',
    getData: userInfo
  }
  const pwdComponentProps = {
    icon: userPwdIcon,
    iconFocus: userFocusPwdIcon,
    alertText: '请输入密码',
    inputType: 'password',
    top: 88,
    getData: pwdInfo
  }
  const btnClick = () => {
    let data = {}
    data.username = userInfo.current.value
    data.password = pwdInfo.current.value
    if(!data.username.length) {
      console.log(111);
      message.error('请输入账号')
      return
    }
    if(!data.password.length) {
      message.error('请输入密码')
      return
    }
//    dispatch(routerRedux.push('/'))
  }
  const thumbProps = {
    currentTab,
    setCurr
  }
  const [springs] = useSpring(() => ({
    from: {
      y: 300,
      opacity: 0,
      transform: 'scale(0.5)'
    },
    to: {
      y: 0,
      opacity: 1,
      transform: 'scale(1)'
    },
    delay: 1000,

  }))
  return (
          <>
          <animated.div className={styles.login_box} style={springs}  >
            <p className={styles.card_title} >登录你的聊天账户</p>
            <p className={styles.register} >没有账号？<span>立即注册</span></p>
            <div className={styles.card_content} >
              <ThumbComponent  {...thumbProps} />
            </div>
            <div className={styles.login_info} >
              {currentTab ? (
                      <>
                      <InputComponent {...inputComponentProps} />
                      <InputComponent {...pwdComponentProps} />
                      </>
                      ) : (<div>暂时未完成</div>)}
            </div>
            {currentTab ? (
                    <div className={styles.login_submit} >
                      <button onClick={btnClick} >登录</button>
                      <p className={styles.is_agree} >点击「登录」表示已阅读并同意 <span className={styles.rules} >服务条款</span></p>
                      <div className={styles.outer_login} >
                        <div>其他方式</div>
                        <hr />
                      </div>
                    </div>
                    ): null}
          </animated.div>
          </>
          )
}

export default Form