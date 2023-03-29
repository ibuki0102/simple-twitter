// 雪央

import styles from '../AdminTweetListItem/AdminTweetListItem.module.scss'
import { ReactComponent as GrayCross } from 'assets/icons/gray_cross.svg'

const AdminTweetListItem = ({ adminTweet, onDeleteTweet }) => {
  return (
    <div className={styles.ListItemContainer}>
      <img
        src={adminTweet.User.avatar}
        className={styles.Avatar}
        alt="defaultAvatar"
      />
      <div className={styles.ContentContainer}>
        <div className={styles.UserInfoContainer}>
          <div>
            <span className={styles.Name}>{adminTweet.User.name}</span>
            <span className={styles.DetailInfo}>
              @{adminTweet.User.account}・{adminTweet.transferDateTime}
            </span>
          </div>
          <div>
            <GrayCross
              className={styles.GrayCross}
              onClick={() => onDeleteTweet?.(adminTweet.id)}
            />
          </div>
        </div>
        <div className={styles.tweetContentContainer}>
          {adminTweet.description.length > 50
            ? adminTweet.description.substr(0, 50) + '...'
            : adminTweet.description}
        </div>
      </div>
    </div>
  )
}

export default AdminTweetListItem
