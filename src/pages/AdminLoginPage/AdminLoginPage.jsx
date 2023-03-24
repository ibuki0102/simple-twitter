// 雪央
// 這頁的styles為LoginPage的styles

import styles from '../LoginPage/LoginPage.module.scss'
import Logo from 'assets/icons/logo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import { Link, useNavigate } from 'react-router-dom'

const AdminLoginPage = () => {
  return (
    <div className={styles.AuthContainer}>
      <img src={Logo} alt="logo" width="45px" />
      <h3 className={styles.Title}>後台登入</h3>
      <div className={styles.AuthInputGroup}>
        <form action="">
          <AuthInput inputLabel="帳號" type="text" placeholder="請輸入帳號" />
          <AuthInput
            inputLabel="密碼"
            type="password"
            placeholder="請輸入密碼"
          />
        </form>
      </div>
      <button className={styles.AuthButtons}>登入</button>
      <div className={styles.AuthLinkGroup}>
        <span className={styles.AuthLink}>
          <Link to="/login">前台登入</Link>
        </span>
      </div>
    </div>
  )
}

export default AdminLoginPage
