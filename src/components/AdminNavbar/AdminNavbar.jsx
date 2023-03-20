import styles from '../AdminNavbar/AdminNavbar.module.scss'
import logo from 'assets/icons/logo.svg'
import filledHome from 'assets/icons/filled_home.svg'
import user from 'assets/icons/user.svg'
import logout from 'assets/icons/logout.svg'

const AdminNavbar = () => {
  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.NavbarMenuContainer}>
        <img src={logo} alt="logo" width="45px" className={styles.Logo} />
        <div className={styles.MenuContainer}>
          <div className={styles.ActiveMenuItem}>
            <img src={filledHome} alt="filledHome" />
            <span className={styles.Text}>推文清單</span>
          </div>
          <div className={styles.MenuItem}>
            <img src={user} alt="user" />
            <span className={styles.Text}>使用者列表</span>
          </div>
        </div>
      </div>
      <div className={styles.LogoutLinkContainer}>
        <img src={logout} alt="logout" />
        <span className={styles.Text}>登出</span>
      </div>
    </div>
  )
}

export default AdminNavbar
