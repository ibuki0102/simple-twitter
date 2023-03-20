// 雪央

import Sidebar from 'components/Sidebar/Sidebar'
import styles from '../AdminTweetListPage/AdminTweetListPage.module.scss'
import AdminTweetListItem from 'components/AdminTweetListItem/AdminTweetListItem'
import { AdminTweetListData } from 'components/AdminTweetListItem/AdminTweetListData'

const AdminTweetListPage = () => {
  const listItems = AdminTweetListData.map((itemData) => (
    <AdminTweetListItem itemData={itemData} />
  ))
  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <Sidebar type="admin" />
      </div>
      <div className={styles.TweetListContainer}>
        <div className={styles.Header}>推文清單</div>
        <div className={styles.ListItemContainer}>{listItems}</div>
      </div>
    </div>
  )
}

export default AdminTweetListPage
