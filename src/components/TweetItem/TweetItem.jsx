// Jasmine

import styles from 'components/TweetItem/TweetItem.module.scss'
import { ReactComponent as DefaultAvatar } from 'assets/icons/default_avatar.svg'
import { ReactComponent as Reply } from 'assets/icons/reply.svg'
import { ReactComponent as Like } from 'assets/icons/heart.svg'

const TweetItem = ({ tweet }) => {
  return (
    <div className={styles.TweetItemContainer}>
      <img src={tweet.User.avatar} className={styles.Avatar} alt="avatar" />
      <div className={styles.Tweet}>
        <span className={styles.UserName}>{tweet.User.name}</span>
        <span className={styles.UserAcount}>
          @{tweet.User.account}・{tweet.transferDateTime}
        </span>
        <div className={styles.TweetContent}>{tweet.description}</div>
        <div className={styles.Icon}>
          <div className={styles.Message}>
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
