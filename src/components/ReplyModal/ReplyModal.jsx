import styles from '../ReplyModal/ReplyModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'
import { useState, useContext } from 'react'
import { replyTweet } from 'api/replyTweet'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'
import Notification from 'components/Notification/Notification'
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'
import { UpdateTweetContext } from 'contexts/UpdateTweetContext'

const ReplyModal = ({ replyTweetData, userAvatar, setReplyModalState }) => {
  const avatar = replyTweetData.User.avatar
  const account = replyTweetData.User.account
  const name = replyTweetData.User.name

  const { id, description, transferDateTimeformodel } = replyTweetData
  const [comment, setComment] = useState('')
  const [submited, setSubmited] = useState(false)
  const [notiState, setNotiState] = useContext(NotiContext)
  const [updateTweetList, setUpdateTweetList] = useContext(UpdateTweetContext)
  const [notiType, setNotiType] = useContext(NotiTypeContext)
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)

  const handleClick = async () => {
    setErrorMessage('')
    if (comment.length > 140 || comment.length === 0) {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setErrorMessage('error')
      setNotiType('reply')
      return setSubmited(true)
    }
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const tweetId = id
    const { error } = await replyTweet({
      token,
      userId,
      tweetId,
      comment,
    })
    if (error) {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setErrorMessage(error)
      setNotiType('reply')
    } else {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setNotiType('reply')
      setUpdateTweetList(true)
      setReplyModalState(false)
    }
  }
  return (
    <>
      {errorMessage && (
        <Notification text="回覆失敗" type="failed" notiState={notiState} />
      )}
      <div className={styles.Overlay}>
        <div className={styles.Container}>
          <div className={styles.Header}>
            <OrangeCross
              className={styles.Close}
              onClick={() => setReplyModalState(false)}
            />
          </div>
          <div className={styles.ReplyTweetContainer}>
            <div className={styles.GrayLine}></div>
            <img
              src={avatar}
              className={styles.TweetUserAvatar}
              alt="tweetUserAvatar"
            />
            <div className={styles.ReplyTweetMain}>
              <div className={styles.TweetUserInfo}>
                <span className={styles.Name}>{name}</span>
                <span className={styles.GrayText}>
                  @{account}・{transferDateTimeformodel}
                </span>
              </div>
              <div className={styles.TweetContent}>{description}</div>
              <div className={styles.Footer}>
                <div> 回覆給</div>
                <div className={styles.TweetUserAccount}>@{account}</div>
              </div>
            </div>
          </div>
          <div className={styles.MainContainer}>
            <div className={styles.Main}>
              <img src={userAvatar} className={styles.Avatar} alt="avatar" />
              <div className={styles.TextAreaContainer}>
                <textarea
                  name=""
                  id=""
                  className={styles.TextArea}
                  placeholder="推你的回覆"
                  value={comment}
                  onChange={(contentInputValue) => {
                    setComment(contentInputValue.target.value)
                    setSubmited(false)
                  }}
                ></textarea>
              </div>
            </div>
            <div className={styles.Footer}>
              {comment.length === 0 && submited ? (
                <span className={styles.TweetLimitText}>內容不可空白</span>
              ) : null}
              {comment.length <= 140 && !submited ? (
                <span className={styles.TweetLengthText}>
                  {comment.length}/140
                </span>
              ) : null}
              {comment.length > 140 && (
                <span className={styles.TweetLimitText}>
                  字數不可超過 140 字
                </span>
              )}
              <button className={styles.TweetButton} onClick={handleClick}>
                回覆
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReplyModal
