// Jasmine

import styles from './ReplyListPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import ReplyList from 'components/ReplyList/ReplyList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

const ReplyListPage = () => {
  return (
    <div className={styles.ReplyListPageContainer}>
      <Sidebar />
      <ReplyList />
      <PopularUserList />
    </div>
  )
}

export default ReplyListPage
