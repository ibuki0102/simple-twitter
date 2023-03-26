// Jasmine

import styles from 'components/ReplyList/ReplyList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'
import { ReactComponent as DefaultAvatar } from 'assets/icons/default_avatar.svg'
import { ReactComponent as Reply } from 'assets/icons/reply.svg'
import { ReactComponent as Like } from 'assets/icons/like.svg'
import { ReactComponent as Liked } from 'assets/icons/heart.svg'
import { useContext, useState, useEffect } from 'react'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'
import { getOneTweet } from 'api/getOneTweet'
import { useNavigate } from 'react-router-dom'
import { getReplyList } from 'api/replyTweet'
import { getUserData } from 'api/auth'
import { useReplyContext } from 'contexts/ReplyContext'
import ReplyModal from 'components/ReplyModal/ReplyModal'
import { likeTweet, unLikeTweet } from 'api/like'

import ReplyItemCollection from 'components/ReplyItemCollection/ReplyItemCollection'

const ReplyList = () => {
  const { replyModalState, setReplyModalState } = useReplyContext()
  const [replyTweetData, setReplyTweetData] = useState('')
  const [replyListData, setReplyListData] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  
  // 管理貼文的喜歡狀態
  const [isLiked, setIsLiked] = useState(replyTweetData.isLiked)

  // 喜歡貼文
  const handleIsLiked = async () => {
    const token = localStorage.getItem('token')
    const id = replyTweetData.id
    const data = await likeTweet({ token, id })
    if (data) {
      setIsLiked(true)
    }
  }

  // 取消喜歡貼文
  const handleUnLike = async () => {
    const token = localStorage.getItem('token')
    const id = replyTweetData.id
    const data = await unLikeTweet({ token, id })
    if (data) {
      setIsLiked(false)
    }
  }
  
   // 用Context取得要前往推文回覆頁面的推文id
  const tweetId = useContext(ReplyTweetContext)[0]
  const navigate = useNavigate()

  const handleClickReply = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const userId = localStorage.getItem('userId')
    const userData = await getUserData({ token, userId })
    const data = await getOneTweet({ token, tweetId })
    setReplyModalState(true)
    setUserAvatar(userData.avatar)
    setReplyTweetData(data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
    const getReplyData = async () => {
      const tweetData = await getOneTweet({ token, tweetId })
      const replyData = await getReplyList({ token, tweetId })
      setReplyTweetData(tweetData)
      setReplyListData(replyData)
    }
    getReplyData()
  }, [navigate, tweetId, replyModalState])

  return (
    <div className={styles.ReplyListContainer}>
      {replyModalState && replyTweetData.User !== undefined ? (
        <ReplyModal
          replyTweetData={replyTweetData}
          userAvatar={userAvatar}
          setReplyModalState={setReplyModalState}
        />
      ) : null}
      {/* 避免還沒有拿到資料就渲染，會產生錯誤 */}
      {replyTweetData.User !== undefined && (
        <div className={styles.ReplyListTopSection}>
          <div className={styles.Heading}>
            <Back className={styles.Back} onClick={() => navigate('/main')} />
            <div>推文</div>
          </div>
          <div>
            <div className={styles.User}>
              <DefaultAvatar className={styles.DefaultAvatar} />
              <div className={styles.ReplyUser}>
                <div className={styles.UserName}>
                  {replyTweetData.User.name}
                </div>
                <div className={styles.UserAcount}>
                  @{replyTweetData.User.account}
                </div>
              </div>
            </div>
            <div className={styles.TweetContent}>
              {replyTweetData.description}
            </div>
            <div className={styles.Time}>
              {replyTweetData.transferDateTimeforpage}
            </div>
          </div>
          <div className={styles.ReplyAndLike}>
            <div>
              <span className={styles.Number}>
                {replyTweetData.totalReplies}
              </span>
              <span className={styles.Context}>回覆</span>
            </div>
            <div>
              <span className={styles.Number}>{replyTweetData.totalLikes}</span>
              <span className={styles.Context}>喜歡次數</span>
            </div>
          </div>
          <div className={styles.Icon}>
            {/* 點擊就可以回覆 */}
            <Reply className={styles.Reply} onClick={handleClickReply} />
            {isLiked ? (
              <Liked className={styles.Liked} onClick={handleUnLike} />
            ) : (
              <Like className={styles.Like} onClick={handleIsLiked} />
            )}
          </div>
        </div>
      )}
      {/* 避免還沒有拿到回覆列表跟推文資料就渲染，會產生錯誤 */}
      {replyListData !== undefined && replyTweetData.User !== undefined ? (
        <ReplyItemCollection
          replyListData={replyListData}
          replyTweetData={replyTweetData}
        />
      ) : null}
    </div>
  )
}

export default ReplyList
