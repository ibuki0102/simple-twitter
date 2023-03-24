// 雪央

import styles from '../Sidebar/Sidebar.module.scss'
import { ReactComponent as Logo } from 'assets/icons/logo.svg'
import { ReactComponent as Home } from 'assets/icons/home.svg'
import { ReactComponent as ActiveHome } from 'assets/icons/active_home.svg'
import { ReactComponent as User } from 'assets/icons/user.svg'
import { ReactComponent as ActiveUser } from 'assets/icons/active_user.svg'
import { ReactComponent as Cog } from 'assets/icons/cog.svg'
import { ReactComponent as ActiveCog } from 'assets/icons/active_cog.svg'
import { ReactComponent as Logout } from 'assets/icons/logout.svg'
import { useNavigate } from 'react-router-dom'

// 帶入type這個props來決定要顯示前台的sidebar還是後台的，帶入user會顯示前台，admin會顯示後台
// page可帶入的值: 'home','user','setting'，帶入的值會決定哪個選項會是active的樣式
const Sidebar = ({ type, page }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/login')
  }

  return (
    <div className={styles.SidebarContainer}>
      <div className={styles.SidebarMenuContainer}>
        <Logo className={styles.Logo} />
        <div className={styles.MenuContainer}>
          <div
            className={
              page === 'home' ? styles.ActiveMenuItem : styles.MenuItem
            }
          >
            {page === 'home' ? <ActiveHome /> : <Home />}
            <span className={styles.Text}>
              {type === 'admin' ? '推文清單' : '首頁'}
            </span>
          </div>
          <div
            className={
              page === 'user' ? styles.ActiveMenuItem : styles.MenuItem
            }
          >
            {page === 'user' ? <ActiveUser /> : <User />}
            <span className={styles.Text}>
              {type === 'admin' ? '使用者列表' : '個人資料'}
            </span>
          </div>
          {type !== 'admin' && (
            <>
              <div
                className={
                  page === 'setting' ? styles.ActiveMenuItem : styles.MenuItem
                }
              >
                {page === 'setting' ? <ActiveCog /> : <Cog />}
                <span className={styles.Text}>設定</span>
              </div>
              <button className={styles.TweetButton}>推文</button>
            </>
          )}
        </div>
      </div>
      <div className={styles.LogoutLinkContainer}>
        <Logout />
        <span className={styles.Text} onClick={handleClick}>
          登出
        </span>
      </div>
    </div>
  )
}

export default Sidebar
