// 雪央

import styles from './RegistPage.module.scss'
import Logo from 'assets/icons/logo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import { useState, useContext } from 'react'
import { regist } from 'api/auth'
import { Link, useNavigate } from 'react-router-dom'
import Notification from 'components/Notification/Notification'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'

const RegistPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setcheckPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [notiState, setNotiState] = useContext(NotiContext)
  // 僅取用setNotiType的function
  const setNotiType = useContext(NotiTypeContext)[1]

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick()
    } else {
      setcheckPassword(event.target.value)
      return setErrorMessage('')
    }
  }
  // 按下註冊後觸發的事件
  const handleClick = async () => {
    // 輸入值為0或是超過字數的例外處理
    if (
      account.length === 0 ||
      account.length > 10 ||
      name.length === 0 ||
      name.length > 50 ||
      email.length === 0 ||
      password.length === 0 ||
      checkPassword.length === 0
    ) {
      // 錯誤訊息的通知處理
      setErrorMessage('error')
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setTimeout(() => {
        setNotiState(false)
      }, 1500)
      return
    }
    // 發送註冊api並取得回傳資料
    const { success, errorMessage } = await regist({
      account,
      name,
      email,
      password,
      checkPassword,
    })
    // 如果有錯誤訊息就執行錯誤訊息通知
    if (errorMessage) {
      setErrorMessage(errorMessage)
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setTimeout(() => {
        setNotiState(false)
      }, 1500)
    }
    // 成功註冊就導回登入頁並顯示註冊成功通知
    if (success) {
      setNotiType('regist')
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    }
  }

  return (
    <>
      {errorMessage && (
        <Notification text="註冊失敗" type="failed" notiState={notiState} />
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
