// 雪央

import styles from '../Sidebar/Sidebar.module.scss'
import { ReactComponent as Logo } from 'assets/icons/logo.svg'
import { ReactComponent as ActiveHome } from 'assets/icons/active_home.svg'
import { ReactComponent as User } from 'assets/icons/user.svg'
import { ReactComponent as Logout } from 'assets/icons/logout.svg'
import { ReactComponent as Cog } from 'assets/icons/cog.svg'

// 帶入type這個props來決定要顯示前台的sidebar還是後台的，帶入user會顯示前台，admin會顯示後台
// page還不確定是否帶入，應該會用來決定要顯示為active的icom
const Sidebar = ({ type, page }) => {
  return (
    <div className={styles.SidebarContainer}>
      <div className={styles.SidebarMenuContainer}>
        <Logo className={styles.Logo} />
        <div className={styles.MenuContainer}>
          <div className={styles.ActiveMenuItem}>
            <ActiveHome />
            <span className={styles.Text}>
              {type === 'admin' ? '推文清單' : '首頁'}
            </span>
          </div>
          <div className={styles.MenuItem}>
            <User />
            <span className={styles.Text}>
              {type === 'admin' ? '使用者列表' : '個人資料'}
            </span>
          </div>
          {type !== 'admin' && (
            <>
              <div className={styles.MenuItem}>
                <Cog />
                <span className={styles.Text}>設定</span>
              </div>
              <button className={styles.TweetButton}>推文</button>
            </>
          )}
        </div>
      </div>
      <div className={styles.LogoutLinkContainer}>
        <Logout />
        <span className={styles.Text}>登出</span>
      </div>
    </div>
  )
}

export default Sidebar
