// 雪央

import styles from '../AdminUserListItem/AdminUserListItem.module.scss'
import { ReactComponent as DefaultAvatar } from 'assets/icons/default_avatar.svg'
import { ReactComponent as Post } from 'assets/icons/post.svg'
import { ReactComponent as Like } from 'assets/icons/like.svg'

const AdminUserListItem = ({ userData }) => {
  const {
    name,
    account,
    avatar,
    banner,
    totalTweets,
    totalLikes,
    following,
    follower,
  } = userData
  return (
    <div className={styles.ListItemContainer}>
      <div className={styles.Bg}>
        <img src={banner} className={styles.Banner} alt={banner} />
      </div>
      <div className={styles.AvatarAccountContainer}>
        {avatar === null ? (
          <DefaultAvatar className={styles.Avatar} />
        ) : (
          <img src={avatar} className={styles.Avatar} alt={avatar} />
        )}

        <span className={styles.Name}>{name}</span>
        <span className={styles.Account}>@{account}</span>
      </div>
      <div className={styles.DetailInfoContainer}>
        <div className={styles.TweetsLikesContainer}>
          <div className={styles.PostContainer}>
            <Post className={styles.Post} />
            <span>{totalTweets}</span>
          </div>
          <div className={styles.LikeContainer}>
            <Like className={styles.Like} />
            <span>{totalLikes}</span>
          </div>
        </div>
        <div className={styles.FollowContainer}>
          <div className={styles.Following}>
            <span>{following}個</span>
            <span className={styles.GreyText}>跟隨中</span>
          </div>
          <div className={styles.Follower}>
            <span>{follower}位</span>
            <span className={styles.GreyText}>跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUserListItem
