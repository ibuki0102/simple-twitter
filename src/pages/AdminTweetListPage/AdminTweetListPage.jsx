// 雪央

import Sidebar from 'components/Sidebar/Sidebar'
import styles from '../AdminTweetListPage/AdminTweetListPage.module.scss'
import AdminTweetListItem from 'components/AdminTweetListItem/AdminTweetListItem'
import { AdminTweetListData } from 'components/AdminTweetListItem/AdminTweetListData'

const AdminTweetListPage = () => {
  const tweetlistItems = AdminTweetListData.map((listData) => (
    <AdminTweetListItem listData={listData} />
  ))
  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <Sidebar type="admin" />
      </div>
      <div className={styles.TweetListContainer}>
        <div className={styles.Header}>推文清單</div>
        <div className={styles.ListItemContainer}>{tweetlistItems}</div>
      </div>
    </div>
  )
}

export default AdminTweetListPage
