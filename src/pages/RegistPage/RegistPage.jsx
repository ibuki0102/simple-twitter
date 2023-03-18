// 雪央

import styles from './RegistPage.module.scss'
import Logo from 'assets/icons/logo.svg'
import AuthInput from 'components/AuthInput/AuthInput'

const RegistPage = () => {
  return (
    <div className={styles.AuthContainer}>
      <img src={Logo} alt="logo" width="45px" />
      <h3 className={styles.Title}>建立你的帳號</h3>
      <div className={styles.AuthInputGroup}>
        <AuthInput inputLabel="帳號" type="text" placeholder="請輸入帳號" />
        <AuthInput
          inputLabel="名稱"
          type="text"
          placeholder="請輸入使用者名稱"
        />
        <AuthInput inputLabel="Email" type="email" placeholder="請輸入Email" />
        <AuthInput inputLabel="密碼" type="password" placeholder="請設定密碼" />
        <AuthInput
          inputLabel="密碼確認"
          type="password"
          placeholder="請再次輸入密碼"
        />
      </div>
      <button className={styles.AuthButtons}>註冊</button>
      <a href="/#" className={styles.AuthLink}>
        取消
      </a>
    </div>
  )
}

export default RegistPage
