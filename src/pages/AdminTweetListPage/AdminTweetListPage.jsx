import AdminNavbar from 'components/AdminNavbar/AdminNavbar'
import styles from '../AdminTweetListPage/AdminTweetListPage.module.scss'
import TweetListItem from 'components/TweetListItem/TweetListItem'
import { TweetListData } from 'components/TweetListItem/TweetListData'

const AdminTweetListPage = () => {
  const listItems = TweetListData.map((itemData) => (
    <TweetListItem itemData={itemData} />
  ))
  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <AdminNavbar />
      </div>
      <div className={styles.TweetListContainer}>
        <div className={styles.Header}>推文清單</div>
        <div className={styles.ListItemContainer}>{listItems}</div>
      </div>
    </div>
  )
}

export default AdminTweetListPage
