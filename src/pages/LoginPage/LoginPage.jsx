// 雪央

import styles from './LoginPage.module.scss'
import Logo from 'assets/icons/logo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import { Link, useNavigate } from 'react-router-dom'

import Notification from 'components/Notification/Notification'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'

import { useContext, useEffect, useState } from 'react'
import { login } from 'api/auth'

const LoginPage = () => {
  const navigate = useNavigate()
  // Jasmine 新增 useState & handleClick
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [notiState, setNotiState] = useContext(NotiContext)
  const [notiType, setNotiType] = useContext(NotiTypeContext)

  // 雪央 新增 登入後自動轉向首頁
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/main')
    }
    if (notiState) {
      setTimeout(() => {
        setNotiState(false)
      }, 3000)
    }
  }, [navigate, notiState, setNotiState])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick()
    } else {
      setPassword(event.target.value)
      return setErrorMessage('')
    }
  }

  const handleClick = async () => {
    const { success, token, errorMessage, userId, role } = await login({
      account,
      password,
    })
    if (success) {
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      localStorage.setItem('role', role)
      setNotiType('login')
      navigate('/main')
      return setTimeout(() => {
        setNotiState(true)
      }, 1500)
    } else if (errorMessage) {
      setNotiState(true)
      setNotiType('loginFailed')
      setErrorMessage(errorMessage)
      setTimeout(() => {
        setNotiState(false)
      }, 1500)
    }
  }

  return (
    <>
      {notiType === 'regist' && (
        <Notification text="註冊成功" type="success" notiState={notiState} />
      )}
      {notiType === 'loginFailed' && (
        <Notification text="登入失敗" type="failed" notiState={notiState} />
      )}
      <div className={styles.AuthContainer}>
        <img src={Logo} alt="logo" width="45px" />
        <h3 className={styles.Title}>登入 Alphitter</h3>
        <div className={styles.AuthInputGroup}>
          <form action="">
            <AuthInput
              inputLabel={'帳號'}
              placeholder={'請輸入帳號'}
              value={account || ''}
              onChange={(accountInputValue) => {
                setAccount(accountInputValue)
                setErrorMessage('')
              }}
              errorMessage={errorMessage}
            />
            <AuthInput
              inputLabel={'密碼'}
              type="password"
              placeholder={'請輸入密碼'}
              value={password || ''}
              onChange={(passwordInputValue) => {
                setPassword(passwordInputValue)
                setErrorMessage('')
              }}
              onKeyDown={(event) => {
                handleKeyDown(event)
              }}
              errorMessage={errorMessage}
            />
          </form>
        </div>
        <button className={styles.AuthButtons} onClick={handleClick}>
          登入
        </button>
        <div className={styles.AuthLinkGroup}>
          <span className={styles.AuthLink}>
            <Link to="/regist">註冊</Link>
          </span>
          <span className={styles.Dot}>・</span>
          <span className={styles.AuthLink}>
            <Link to="/admin">後台登入</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default LoginPage
