// 雪央

import Sidebar from 'components/Sidebar/Sidebar'
import styles from '../AdminUserListPage/AdminUserListPage.module.scss'
import AdminUserListItem from 'components/AdminUserListItem/AdminUserListItem'
import { AdminUserListData } from 'assets/adminUserListData'

const AdminUserListPage = () => {
  const userListItems = AdminUserListData.map((listData) => (
    <AdminUserListItem userData={listData} />
  ))
  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <Sidebar type="admin" page="user" />
      </div>
      <div className={styles.TweetListContainer}>
        <div className={styles.Header}>使用者列表</div>
        <div className={styles.ListItemContainer}>{userListItems}</div>
      </div>
    </div>
  )
}

export default AdminUserListPage
