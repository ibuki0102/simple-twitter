// Jasmine

import styles from 'components/UserFollowItem/UserFollowItem.module.scss'

const UserFollowItem = (follow) => {
  const userId = JSON.parse(localStorage.getItem('userId'))
  return (
    <div
      className={
        follow.follow.avatar !== null
          ? styles.UserFollowItemContainer
          : styles.None
      }
    >
      {follow.follow.avatar !== null && (
        <img
          src={follow.follow.avatar}
          className={styles.Avatar}
          alt="avatar"
        />
      )}
      <div className={styles.Tweet}>
        <div className={styles.UserName}>{follow.follow.name}</div>
        {follow.follow.isFollowed
          ? follow.follow.id !== userId &&
            follow.follow.avatar !== null && (
              <button className={styles.ActiveButton}>正在跟隨</button>
            )
          : follow.follow.id !== userId &&
            follow.follow.avatar !== null && (
              <button className={styles.DefaultButton}>跟隨</button>
            )}
        <div className={styles.TweetContent}>{follow.follow.introduction}</div>
      </div>
    </div>
  )
}

export default UserFollowItem
