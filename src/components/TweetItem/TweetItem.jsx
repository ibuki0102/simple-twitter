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

const TweetItem = ({ tweet, user, setUser, setUpdateTweetList }) => {
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
  // 雪央註: 這東西會讓畫面重新渲染52次，需要改成context，之後優化再做
  useEffect(() => {
    if (!replyModalState) {
      setReplyTweetData('')
    }
  }, [replyModalState])

  // Jasmine 註: 點擊頭像獲取 id 並引導至個人資料頁
  const handleChangeUser = (id) => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    if (id !== userId) {
      setUser(id)
      navigate('/user/other')
    } else {
      navigate('/user/self')
    }
  }

  return (
    <div className={styles.TweetItemContainer}>
      {replyModalState && replyTweetData.User !== undefined ? (
        <ReplyModal
          replyTweetData={replyTweetData}
          userAvatar={userAvatar}
          setUpdateTweetList={setUpdateTweetList}
          setReplyModalState={setReplyModalState}
        />
      ) : null}
      <img
        src={tweet.User.avatar}
        className={styles.Avatar}
        alt="avatar"
        onClick={() => handleChangeUser?.(tweet.User.id)}
      />
      <div className={styles.Tweet}>
        <div className={styles.ClickableArea} onClick={handleToReplyList}>
          <span className={styles.UserName}>{tweet.User.name}</span>
          <span className={styles.UserAccount}>
            @{tweet.User.account}・{tweet.transferDateTime}
          </span>
          <div className={styles.TweetContent}>{tweet.description}</div>
          <div className={styles.Icon}>
            <div className={styles.Heart}>
              <Like className={styles.Like} />
              <span className={styles.Number}>{tweet.totalLikes}</span>
            </div>
          </div>
        </div>
        <div className={styles.Message} onClick={handleClickReply}>
          <Reply className={styles.Reply} />
          <span className={styles.Number}>{tweet.totalReplies}</span>
        </div>
      </div>
    </div>
  )
}

export default TweetItem
