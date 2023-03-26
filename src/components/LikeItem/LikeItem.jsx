// Jasmine

import styles from 'components/LikeItem/LikeItem.module.scss'
import { ReactComponent as Reply } from 'assets/icons/reply.svg'
import { ReactComponent as Like } from 'assets/icons/heart.svg'

const LikeItem = ({ likeTweet }) => {
  return (
    <div className={styles.LikeItemContainer}>
      <img
        src={likeTweet.Tweet.User.avatar}
        className={styles.Avatar}
        alt="avatar"
      />
      <div className={styles.Tweet}>
        <span className={styles.UserName}>{likeTweet.Tweet.User.name}</span>
        <span className={styles.UserAccount}>
          @{likeTweet.Tweet.User.account}・{likeTweet.transferDateTime}
        </span>
        <div className={styles.TweetContent}>{likeTweet.Tweet.description}</div>
        <div className={styles.Icon}>
          <div className={styles.Message}>
            <Reply className={styles.Reply} />
            <span className={styles.Number}>
              {likeTweet.Tweet.totalReplies}
            </span>
          </div>
          <div className={styles.Heart}>
            <Like className={styles.Like} />
            <span className={styles.Number}>{likeTweet.Tweet.totalLikes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LikeItem
