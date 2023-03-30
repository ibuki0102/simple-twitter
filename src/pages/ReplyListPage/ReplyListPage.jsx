// Jasmine

import styles from './ReplyListPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import ReplyList from 'components/ReplyList/ReplyList'
import PopularUserList from 'components/PopularUserList/PopularUserList'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'
import { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'

const ReplyListPage = () => {
  // 用Context取得要前往推文回覆頁面的推文id
  const tweetId = useContext(ReplyTweetContext)[0]
  // 管理使用者ID
  const [user, setUser] = useContext(UserContext)

  return (
    <div className={styles.ReplyListPageContainer}>
      <Sidebar />
      <ReplyList tweetId={tweetId} user={user} setUser={setUser} />
      <PopularUserList />
    </div>
  )
}

export default ReplyListPage
