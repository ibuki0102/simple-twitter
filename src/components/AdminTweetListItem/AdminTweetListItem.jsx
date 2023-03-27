// 雪央

import styles from '../AdminTweetListItem/AdminTweetListItem.module.scss'
import { ReactComponent as GrayCross } from 'assets/icons/gray_cross.svg'
import defaultAvatar from 'assets/icons/default_avatar.svg'

const AdminTweetListItem = ({ adminTweet }) => {
  return (
    <div className={styles.ListItemContainer}>
      <div className={styles.Avatar}>
        <img src={adminTweet.User.avatar} alt="defaultAvatar" />
      </div>
      <div className={styles.ContentContainer}>
        <div className={styles.UserInfoContainer}>
          <div>
            <span className={styles.Name}>{adminTweet.User.name}</span>
            <span className={styles.DetailInfo}>
              @{adminTweet.User.account}・{adminTweet.transferDateTime}
            </span>
          </div>
          <div>
            <GrayCross className={styles.GrayCross} />
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
