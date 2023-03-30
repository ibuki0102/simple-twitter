// Jasmine

import styles from 'components/ReplyList/ReplyList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'
import { ReactComponent as DefaultAvatar } from 'assets/icons/default_avatar.svg'
import { ReactComponent as Reply } from 'assets/icons/reply.svg'
import { ReactComponent as Like } from 'assets/icons/like.svg'
import { ReactComponent as Liked } from 'assets/icons/heart.svg'
import { useState, useEffect, useContext } from 'react'
import { getOneTweet } from 'api/getOneTweet'
import { useNavigate } from 'react-router-dom'
import { getReplyList } from 'api/replyTweet'
import { getUserData } from 'api/auth'
import { useReplyContext } from 'contexts/ReplyContext'
import ReplyModal from 'components/ReplyModal/ReplyModal'
import { likeTweet, unLikeTweet } from 'api/like'
import ReplyItem from 'components/ReplyItem/ReplyItem'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'
import Notification from 'components/Notification/Notification'

const ReplyList = ({ tweetId, user, setUser }) => {
  const { replyModalState, setReplyModalState } = useReplyContext()
  const [userAvatar, setUserAvatar] = useState('')
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)
  const [notiState, setNotiState] = useContext(NotiContext)
  const [notiType, setNotiType] = useContext(NotiTypeContext)
  const navigate = useNavigate()
  const [replyTweetData, setReplyTweetData] = useState({
    replyTweet: '',
    replyListData: '',
  })

  // 管理貼文的喜歡狀態
  const [isLiked, setIsLiked] = useState(replyTweetData.isLiked)
  // 喜歡貼文
  const handleLike = async () => {
    const token = localStorage.getItem('token')
    const id = replyTweetData.replyTweet.id
    const data = await likeTweet({ token, id })
    if (data) {
      setIsLiked(true)
    }
  }

  // 取消喜歡貼文
  const handleUnLike = async () => {
    const token = localStorage.getItem('token')
    const id = replyTweetData.replyTweet.id
    const data = await unLikeTweet({ token, id })
    if (data) {
      setIsLiked(false)
    }
  }

  const handleClickReply = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const userId = localStorage.getItem('userId')
    const userData = await getUserData({ token, userId })
    setReplyModalState(true)
    setUserAvatar(userData.avatar)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
    const getReplyData = async () => {
      const tweetData = await getOneTweet({ token, tweetId })
      const replyData = await getReplyList({ token, tweetId })
      setReplyTweetData({ replyTweet: tweetData, replyListData: replyData })
    }
    getReplyData()
    if (notiState) {
      setTimeout(() => {
        setNotiState(false)
      }, 2500)
    }
  }, [navigate, tweetId, replyModalState, isLiked, notiState, setNotiState])

  return (
    <>
      {notiType === 'reply' && !errorMessage ? (
        <Notification text="回覆成功" type="success" notiState={notiState} />
      ) : null}
      <div className={styles.ReplyListContainer}>
        {replyModalState && replyTweetData.replyTweet.User !== undefined ? (
          <ReplyModal
            replyTweetData={replyTweetData.replyTweet}
            userAvatar={userAvatar}
            setReplyModalState={setReplyModalState}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        ) : null}
        {/* 避免還沒有拿到資料就渲染，會產生錯誤 */}
        {replyTweetData.replyTweet.User !== undefined && (
          <div className={styles.ReplyListTopSection}>
            <div className={styles.Heading}>
              <Back
                className={styles.Back}
                onClick={() => {
                  navigate(-1)
                }}
              />
              <div>推文</div>
            </div>
            <div>
              <div className={styles.User}>
                <img
                  src={replyTweetData.replyTweet.User.avatar}
                  className={styles.DefaultAvatar}
                  alt="avatar"
                />
                <div className={styles.ReplyUser}>
                  <div className={styles.UserName}>
                    {replyTweetData.replyTweet.User.name}
                  </div>
                  <div className={styles.UserAccount}>
                    @{replyTweetData.replyTweet.User.account}
                  </div>
                </div>
              </div>
              <div className={styles.TweetContent}>
                {replyTweetData.replyTweet.description}
              </div>
              <div className={styles.Time}>
                {replyTweetData.replyTweet.transferDateTimeforpage}
              </div>
            </div>
            <div className={styles.ReplyAndLike}>
              <div>
                <span className={styles.Number}>
                  {replyTweetData.replyTweet.totalReplies}
                </span>
                <span className={styles.Context}>回覆</span>
              </div>
              <div>
                <span className={styles.Number}>
                  {replyTweetData.replyTweet.totalLikes}
                </span>
                <span className={styles.Context}>喜歡次數</span>
              </div>
            </div>
            <div className={styles.Icon}>
              {/* 點擊就可以回覆 */}
              <Reply className={styles.Reply} onClick={handleClickReply} />
              {replyTweetData.replyTweet.isLiked ? (
                <Liked className={styles.Liked} onClick={handleUnLike} />
              ) : (
                <Like className={styles.Like} onClick={handleLike} />
              )}
            </div>
          </div>
        )}
        {/* 避免還沒有拿到回覆列表跟推文資料就渲染，會產生錯誤 */}
        {replyTweetData.replyListData.length !== 0 && (
          <ReplyCollection
            replyListData={replyTweetData.replyListData}
            type="replyPage"
            user={user}
            setUser={setUser}
          />
        )}
      </div>
    </>
  )
}

const ReplyCollection = ({ replyListData, type, user, setUser }) => {
  let replyList
  replyList = replyListData.map((replyTweet) => {
    return (
      <ReplyItem
        key={replyTweet.id}
        replyTweet={replyTweet}
        type={type}
        user={user}
        setUser={setUser}
      />
    )
  })
  return <div>{replyList}</div>
}

export default ReplyList
