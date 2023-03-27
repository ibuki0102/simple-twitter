// 雪央

import Sidebar from 'components/Sidebar/Sidebar'
import styles from '../AdminUserListPage/AdminUserListPage.module.scss'
import AdminUserListItem from 'components/AdminUserListItem/AdminUserListItem'
import { getAdminUserList } from 'api/admin'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminUserListPage = () => {
  const navigate = useNavigate()

  // Jasmine 註: 管理後台使用者
  const [adminUsers, setAdminUsers] = useState([])

  // Jasmine 註: 取得後台使用者
  useEffect(() => {
    const getAdminUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/admin')
        }
        const adminUsers = await getAdminUserList({ token, userId })
        if (adminUsers) {
          setAdminUsers(adminUsers)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAdminUsers()
  }, [navigate])

  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <Sidebar type="admin" page="user" />
      </div>
      <div className={styles.TweetListContainer}>
        <div className={styles.Header}>使用者列表</div>
        <div className={styles.ListItemContainer}>
          {' '}
          {adminUsers.map((adminUser) => {
            return (
              <AdminUserListItem key={adminUser.id} adminUser={adminUser} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminUserListPage
