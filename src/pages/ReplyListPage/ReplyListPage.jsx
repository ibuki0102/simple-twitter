// Jasmine

import styles from './ReplyListPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import ReplyList from 'components/ReplyList/ReplyList'
import PopularUserList from 'components/PopularUserList/PopularUserList'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'
import { useContext } from 'react'

const ReplyListPage = () => {
  // 用Context取得要前往推文回覆頁面的推文id
  const tweetId = useContext(ReplyTweetContext)[0]
  return (
    <div className={styles.ReplyListPageContainer}>
      <Sidebar page="reply" />
      <ReplyList tweetId={tweetId} />
      <PopularUserList />
    </div>
  )
}

export default ReplyListPage
