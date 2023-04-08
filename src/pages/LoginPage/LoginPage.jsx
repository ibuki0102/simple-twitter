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
  // 用來控制錯誤訊息的內容
  const [errorMessage, setErrorMessage] = useState('')
  // 用來控制通知的狀態，true則會顯示，false則會消失
  const [notiState, setNotiState] = useContext(NotiContext)
  // 用來控制通知的類型，推文/登入/回復/編輯...等等
  const [notiType, setNotiType] = useContext(NotiTypeContext)

  // 雪央 新增 登入後自動轉向首頁
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/main')
    }
    // 如果目前有顯示通知，就在2.5秒後關閉通知
    if (notiState) {
      setTimeout(() => {
        setNotiState(false)
      }, 2500)
    }
  }, [navigate, notiState, setNotiState])

  // 偵測按下enter鍵就觸發handleClick事件
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick()
    } else {
      // 如果按下的按鍵不是enter就表示使用者還在輸入密碼
      setPassword(event.target.value)
      return setErrorMessage('')
    }
  }

  // 按下登入按鈕後觸發的事件
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
      // 在1.5秒後設定跳出通知
      return setTimeout(() => {
        setNotiState(true)
      }, 1500)
    } else if (errorMessage) {
      // 設定通知類型為登入失敗
      setNotiType('loginFailed')
      // 設定要顯示的錯誤訊息
      setErrorMessage(errorMessage)
      // 彈出通知
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      // 讓通知消失
      setTimeout(() => {
        setNotiState(false)
      }, 2500)
    }
  }

  return (
    <>
      {/* // 在通知類型&notiState都符合的情況下才會顯示通知 */}
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
