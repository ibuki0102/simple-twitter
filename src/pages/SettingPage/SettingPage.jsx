// 雪央

import styles from '../SettingPage/SettingPage.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import AuthInput from 'components/AuthInput/AuthInput'

const SettingPage = ({ userData }) => {
  const { account, name, email } = userData
  return (
    <div className={styles.Container}>
      <Sidebar type="user" page="setting" />
      <div className={styles.SettingFormContainer}>
        <div className={styles.Header}>帳戶設定</div>
        <div className={styles.FormContainer}>
          <div className={styles.InputGroupContainer}>
            <AuthInput inputLabel="帳號" type="text" value={account} />
            <AuthInput inputLabel="名稱" type="text" value={name} />
            <AuthInput inputLabel="Email" type="email" value={email} />
            <AuthInput
              inputLabel="密碼"
              type="password"
              placeholder="請設定密碼"
            />
            <AuthInput
              inputLabel="密碼再確認"
              type="password"
              placeholder="請再次輸入密碼"
            />{' '}
            <button className={styles.SaveButton}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
