// 雪央

import Sidebar from 'components/Sidebar/Sidebar'
import styles from '../AdminTweetListPage/AdminTweetListPage.module.scss'
import AdminTweetListItem from 'components/AdminTweetListItem/AdminTweetListItem'
import { getAdminTweetList } from 'api/admin'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminTweetListPage = () => {
  const navigate = useNavigate()

  // Jasmine 註: 管理後台推文
  const [adminTweets, setAdminTweets] = useState([])

  // Jasmine 註: 取得後台推文
  useEffect(() => {
    const getAdminTweets = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/admin')
        }
        const adminTweets = await getAdminTweetList({ token, userId })
        if (adminTweets) {
          setAdminTweets(adminTweets)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAdminTweets()
  }, [navigate])

  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <Sidebar type="admin" page="home" />
      </div>
      <div className={styles.TweetListContainer}>
        <div className={styles.Header}>推文清單</div>
        <div className={styles.ListItemContainer}>
          {adminTweets.map((adminTweet) => {
            return (
              <AdminTweetListItem key={adminTweet.id} adminTweet={adminTweet} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminTweetListPage
