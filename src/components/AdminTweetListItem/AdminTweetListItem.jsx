import styles from '../AdminTweetListItem/AdminTweetListItem.module.scss'
import { ReactComponent as GrayCross } from 'assets/icons/gray_cross.svg'
import defaultAvatar from 'assets/icons/default_avatar.svg'

const AdminTweetListItem = ({ itemData }) => {
  const { name, account, createAt, content } = itemData
  return (
    <div className={styles.ListItemContainer}>
      <div className={styles.Avatar}>
        <img src={defaultAvatar} alt="defaultAvatar" />
      </div>
      <div className={styles.ContentContainer}>
        <div className={styles.UserInfoContainer}>
          <div>
            <span className={styles.Name}>{name}</span>
            <span className={styles.DetailInfo}>
              @{account}・{createAt}
            </span>
          </div>
          <div>
            <GrayCross className={styles.GrayCross} />
          </div>
        </div>
        <div className={styles.tweetContentContainer}>
          {content.length > 50 ? content.substr(0, 50) + '...' : content}
        </div>
      </div>
    </div>
  )
}

export default AdminTweetListItem
