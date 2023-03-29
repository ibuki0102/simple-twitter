// 雪央

import styles from './RegistPage.module.scss'
import Logo from 'assets/icons/logo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import { useState, useContext } from 'react'
import { regist } from 'api/auth'
import { Link, useNavigate } from 'react-router-dom'
import Notification from 'components/Notification/Notification'
import { NotiContext } from 'contexts/NotiContext'

const RegistPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setcheckPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [notiState, setNotiState] = useContext(NotiContext)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick()
    } else {
      setPassword(event.target.value)
      return setErrorMessage('')
    }
  }

  const handleClick = async () => {
    if (account.length === 0 || account.length > 10) {
      return
    }
    if (name.length === 0 || name.length > 50) {
      return
    }
    if (email.length === 0) {
      return
    }
    if (password.length === 0) {
      return
    }
    if (checkPassword.length === 0) {
      return
    }
    const { success, errorMessage } = await regist({
      account,
      name,
      email,
      password,
      checkPassword,
    })
    console.log(errorMessage)
    if (success) {
      setNotiState(true)
      setTimeout(() => {
        setNotiState(false)
      }, 1500)
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    }
    if (errorMessage) {
      setErrorMessage(errorMessage)
      setNotiState(true)
      setTimeout(() => {
        setNotiState(false)
      }, 1500)
    }
  }

  return (
    <>
      {errorMessage ? (
        <Notification text="註冊失敗" type="failed" notiState={notiState} />
      ) : (
        <Notification text="註冊成功" type="success" notiState={notiState} />
      )}
      <div className={styles.AuthContainer}>
        <img src={Logo} alt="logo" width="45px" />
        <h3 className={styles.Title}>建立你的帳號</h3>
        <div className={styles.AuthInputGroup}>
          <form action="">
            <AuthInput
              inputLabel="帳號"
              type="text"
              placeholder="請輸入帳號"
              value={account}
              onChange={(accountInputValue) => {
                setAccount(accountInputValue)
                setErrorMessage('')
              }}
              errorMessage={errorMessage}
            />
            <AuthInput
              inputLabel="名稱"
              type="text"
              placeholder="請輸入使用者名稱"
              value={name}
              onChange={(nameInputValue) => setName(nameInputValue)}
            />
            <AuthInput
              inputLabel="Email"
              type="email"
              placeholder="請輸入Email"
              value={email}
              onChange={(emailInputValue) => {
                setEmail(emailInputValue)
                setErrorMessage('')
              }}
              errorMessage={errorMessage}
            />
            <AuthInput
              inputLabel="密碼"
              type="password"
              placeholder="請設定密碼"
              value={password || ''}
              onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            />
            <AuthInput
              inputLabel="密碼確認"
              type="password"
              placeholder="請再次輸入密碼"
              value={checkPassword || ''}
              onChange={(checkPasswordInputValue) => {
                setcheckPassword(checkPasswordInputValue)
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
          註冊
        </button>
        <span className={styles.AuthLink}>
          <Link to="/login">取消</Link>
        </span>
      </div>
    </>
  )
}

export default RegistPage
