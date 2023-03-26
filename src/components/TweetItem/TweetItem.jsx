// Jasmine

import styles from 'components/TweetItem/TweetItem.module.scss'
import { ReactComponent as Reply } from 'assets/icons/reply.svg'
import { ReactComponent as Like } from 'assets/icons/heart.svg'
import { getOneTweet } from 'api/getOneTweet'
import { useReplyContext } from 'contexts/ReplyContext'
import ReplyModal from 'components/ReplyModal/ReplyModal'
import { useState } from 'react'
import { getUserData } from 'api/auth'

const TweetItem = ({ tweet }) => {
  const { replyModalState, setReplyModalState } = useReplyContext()
  const [replyTweetData, setReplyTweetData] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const handleClickReply = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const tweetId = tweet.id
    const userId = localStorage.getItem('userId')
    const userData = await getUserData({ token, userId })
    const data = await getOneTweet({ token, tweetId })
    setReplyTweetData(data)
    setUserAvatar(userData.avatar)
    setReplyModalState(true)
  }
  return (
    <div className={styles.TweetItemContainer}>
      {replyModalState && replyTweetData.User !== undefined ? (
        <ReplyModal
          replyTweetData={replyTweetData}
          userAvatar={userAvatar}
          setReplyModalState={setReplyModalState}
        />
      ) : null}
      <img src={tweet.User.avatar} className={styles.Avatar} alt="avatar" />
      <div className={styles.Tweet}>
        <span className={styles.UserName}>{tweet.User.name}</span>
        <span className={styles.UserAccount}>
          @{tweet.User.account}・{tweet.transferDateTime}
        </span>
        <div className={styles.TweetContent}>{tweet.description}</div>
        <div className={styles.Icon}>
          <div className={styles.Message}>
            <Reply className={styles.Reply} onClick={handleClickReply} />
            <span className={styles.Number}>{tweet.totalReplies}</span>
          </div>
          <div className={styles.Heart}>
            <Like className={styles.Like} />
            <span className={styles.Number}>{tweet.totalLikes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetItem
