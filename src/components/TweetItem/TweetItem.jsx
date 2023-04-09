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
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'
import { UpdateTweetContext } from 'contexts/UpdateTweetContext'

const TweetItem = ({ tweet, user, setUser }) => {
  // 控制回復modal的狀態，開或關
  const { replyModalState, setReplyModalState } = useReplyContext()
  // 控制回覆推文的內容
  const [replyTweetData, setReplyTweetData] = useState('')
  // 控制使用者的頭貼
  const [userAvatar, setUserAvatar] = useState('')
  // 控制是否要更新推文列表的內容
  const [updateTweetList, setUpdateTweetList] = useContext(UpdateTweetContext)
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)
  const navigate = useNavigate()
  const setReplyTweetId = useContext(ReplyTweetContext)[1]
  // 點下回復icon後打開回復modal
  const handleClickReply = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const tweetId = tweet.id
    const userId = localStorage.getItem('userId')
    // 取得當前使用者的頭貼
    const userData = await getUserData({ token, userId })
    // 取得回覆的推文的資料
    const data = await getOneTweet({ token, tweetId })
    // 打開回復modal
    setReplyModalState(true)
    // 設定要在modal裡顯示的資訊(頭貼 & 回覆推文內容)
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
            @{tweet.User.account}・
            {tweet.transferDateTimeformodel
              ? tweet.transferDateTimeformodel
              : tweet.transferDateTime}
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
