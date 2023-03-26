// Jasmine

import styles from 'components/ReplyItem/ReplyItem.module.scss'

const ReplyItem = ({ replyTweet, replyTweetData }) => {
  return (
    <div className={styles.ReplyItemContainer}>
      <div className={styles.ReplyUser}>
        <img
          src={replyTweet.User.avatar}
          className={styles.Avatar}
          alt="avatar"
        />
        <div className={styles.Reply}>
          <span className={styles.UserName}>{replyTweet.User.name}</span>
          <span className={styles.UserAccount}>
            @{replyTweet.User.account}・{replyTweet.transferDateTime}
          </span>
          <div className={styles.ReplyAndTag}>
            <span className={styles.ReplyText}>回覆</span>
            <span className={styles.Tag}>@{replyTweetData.User.account}</span>
          </div>
        </div>
      </div>
      <div className={styles.ReplyContent}>{replyTweet.comment}</div>
    </div>
  )
}

export default ReplyItem
