// Jasmine

import styles from 'components/UserFollowItem/UserFollowItem.module.scss'

const UserFollowItem = (follow) => {
  return (
    <div className={styles.UserFollowItemContainer}>
      <img src={follow.follow.avatar} className={styles.Avatar} alt="avatar" />
      <div className={styles.Tweet}>
        <div className={styles.UserName}>{follow.follow.name}</div>
        <button>正在跟隨</button>
        <div className={styles.TweetContent}>{follow.follow.introduction}</div>
      </div>
    </div>
  )
}

export default UserFollowItem
