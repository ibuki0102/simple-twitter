import styles from '../ReplyModal/ReplyModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'
import { useState } from 'react'
import { replyTweet } from 'api/replyTweet'

const ReplyModal = ({ replyTweetData, userAvatar, setReplyModalState }) => {
  const avatar = replyTweetData.User.avatar
  const account = replyTweetData.User.account
  const name = replyTweetData.User.name

  const { id, description, transferDateTimeformodel } = replyTweetData
  const [comment, setComment] = useState('')
  const [submited, setSubmited] = useState(false)
  const handleClick = async () => {
    if (description.length > 140 || description.length === 0) {
      return setSubmited(true)
    }
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const tweetId = id
    const data = await replyTweet({ token, userId, tweetId, comment })
    console.log(data)
    setReplyModalState(false)
  }
  return (
    <div className={styles.Overlay}>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <OrangeCross
            className={styles.Close}
            onClick={() => setReplyModalState(false)}
          />
        </div>
        <div className={styles.ReplyTweetContainer}>
          <div className={styles.TweetUserAvatar}>
            <img src={avatar} alt="tweetUserAvatar" />
          </div>
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
            <div className={styles.Avatar}>
              <img src={userAvatar} alt="avatar" />
            </div>
            <div className={styles.TextAreaContainer}>
              <textarea
                name=""
                id=""
                className={styles.TextArea}
                placeholder="推你的回覆"
                value={comment}
                onChange={(contentInputValue) => {
                  setComment(contentInputValue.target.value)
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
              <span className={styles.TweetLimitText}>字數不可超過 140 字</span>
            )}
            <button className={styles.TweetButton} onClick={handleClick}>
              回覆
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyModal
