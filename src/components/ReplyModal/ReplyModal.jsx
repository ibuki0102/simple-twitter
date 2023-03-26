import styles from '../ReplyModal/ReplyModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'

const ReplyModal = ({ replyTweetData, userAvatar, setReplyModalState }) => {
  const { avatar, account, name } = replyTweetData.User
  const { description, createdAt } = replyTweetData
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
                @{account}・{createdAt}
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
              ></textarea>
            </div>
          </div>
          <div className={styles.Footer}>
            <span className={styles.TweetLimitText}>內容不可空白</span>
            <button className={styles.TweetButton}>回覆</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyModal
