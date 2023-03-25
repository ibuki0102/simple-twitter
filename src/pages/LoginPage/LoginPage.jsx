// 雪央

import styles from './LoginPage.module.scss'
import Logo from 'assets/icons/logo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useEffect, useState } from 'react'
import { login } from 'api/auth'

const LoginPage = () => {
  const navigate = useNavigate()
  // Jasmine 新增 useState & handleClick
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // 雪央 新增 登入後自動轉向首頁
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/main')
    }
  }, [navigate])

  const handleClick = async () => {
    const { success, token, errorMessage, userId } = await login({
      account,
      password,
    })
    if (success) {
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
      return navigate('/main')
    } else if (errorMessage) {
      setErrorMessage(errorMessage)
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      })
    }
  }

  return (
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
  )
}

export default LoginPage
