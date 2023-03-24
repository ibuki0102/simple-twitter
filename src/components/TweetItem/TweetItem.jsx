// Jasmine

import styles from 'components/TweetItem/TweetItem.module.scss'
import { ReactComponent as DefaultAvatar } from 'assets/icons/default_avatar.svg'
import { ReactComponent as Reply } from 'assets/icons/reply.svg'
import { ReactComponent as Like } from 'assets/icons/heart.svg'

const TweetItem = ({ user }) => {
  return (
    <div className={styles.TweetItemContainer}>
      <DefaultAvatar className={styles.DefaultAvatar} />
      <div className={styles.Tweet}>
        <span className={styles.UserName}>{user.name}</span>
        <span className={styles.UserAcount}>
          {user.account}・{user.time}
        </span>
        <div className={styles.TweetContent}>{user.description}</div>
        <div className={styles.Icon}>
          <div className={styles.Message}>
            <Reply className={styles.Reply} />
            <span className={styles.Number}>{user.Replies.totalReplies}</span>
          </div>
          <div className={styles.Heart}>
            <Like className={styles.Like} />
            <span className={styles.Number}>{user.Likes.totalLikes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetItem
