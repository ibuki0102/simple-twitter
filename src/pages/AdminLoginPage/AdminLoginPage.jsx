// 雪央
// 這頁的styles為LoginPage的styles

import styles from '../LoginPage/LoginPage.module.scss'
import Logo from 'assets/icons/logo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import { Link, useNavigate } from 'react-router-dom'
import Notification from 'components/Notification/Notification'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'

import { useEffect, useState, useContext } from 'react'
import { adminLogin } from 'api/auth'

const AdminLoginPage = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)
  const [notiState, setNotiState] = useContext(NotiContext)
  const [notiType, setNotiType] = useContext(NotiTypeContext)

  // Jasmine 新增 useState & handleClick
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  // 登入後自動轉向後台推文清單
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/admin/tweetList')
    }
  }, [navigate])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick()
    } else {
      setPassword(event.target.value)
      return setErrorMessage('')
    }
  }

  const handleClick = async () => {
    const { success, token, errorMessage, userId, role } = await adminLogin({
      account,
      password,
    })
    if (success) {
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      localStorage.setItem('role', role)
      setNotiState(true)
      setNotiType('admin')
      navigate('/admin/tweetList')
    } else if (errorMessage) {
      setErrorMessage(errorMessage)
      setNotiState(true)
      setTimeout(() => {
        setNotiState(false)
      }, 1500)
    }
  }

  return (
    <>
      {errorMessage && (
        <Notification text="登入失敗" type="failed" notiState={notiState} />
      )}
      <div className={styles.AuthContainer}>
        <img src={Logo} alt="logo" width="45px" />
        <h3 className={styles.Title}>後台登入</h3>
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
            <Link to="/login">前台登入</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default AdminLoginPage
