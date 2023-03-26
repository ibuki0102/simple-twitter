// Jasmine

import styles from 'components/TweetItem/TweetItem.module.scss'
import { ReactComponent as Reply } from 'assets/icons/reply.svg'
import { ReactComponent as Like } from 'assets/icons/heart.svg'
import { getOneTweet } from 'api/getOneTweet'
import { useReplyContext } from 'contexts/ReplyContext'
import ReplyModal from 'components/ReplyModal/ReplyModal'
import { useContext, useState } from 'react'
import { getUserData } from 'api/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'

const TweetItem = ({ tweet }) => {
  const { replyModalState, setReplyModalState } = useReplyContext()
  const [replyTweetData, setReplyTweetData] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const navigate = useNavigate()
  const setReplyTweetId = useContext(ReplyTweetContext)[1]
  const handleClickReply = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const tweetId = tweet.id
    const userId = localStorage.getItem('userId')
    const userData = await getUserData({ token, userId })
    const data = await getOneTweet({ token, tweetId })
    setReplyModalState(true)
    setUserAvatar(userData.avatar)
    setReplyTweetData(data)
  }
  // 雪央註: 導向回覆頁
  const handleToReplyList = () => {
    setReplyTweetId(tweet.id)
    navigate('/main/replyList')
  }
  // 雪央註: 清空上一則欲回覆的推文內容
  useEffect(() => {
    if (!replyModalState) {
      setReplyTweetData('')
    }
  }, [setReplyTweetData, replyModalState])

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
        <div className={styles.ClickableArea} onClick={handleToReplyList}>
          <span className={styles.UserName}>{tweet.User.name}</span>
          <span className={styles.UserAccount}>
            @{tweet.User.account}・{tweet.transferDateTime}
          </span>
          <div className={styles.TweetContent}>{tweet.description}</div>
        </div>

        <div className={styles.Icon}>
          <div className={styles.Message} onClick={handleClickReply}>
            <Reply className={styles.Reply} />
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
