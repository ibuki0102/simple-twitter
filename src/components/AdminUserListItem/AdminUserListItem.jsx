// 雪央

import styles from '../AdminUserListItem/AdminUserListItem.module.scss'
import { ReactComponent as DefaultAvatar } from 'assets/icons/default_avatar.svg'
import { ReactComponent as Post } from 'assets/icons/post.svg'
import { ReactComponent as Like } from 'assets/icons/like.svg'

const AdminUserListItem = ({ adminUser }) => {
  return (
    <div className={styles.ListItemContainer}>
      <div className={styles.Bg}>
        {adminUser.cover === null ? (
          <img
            src="https://i.imgur.com/jXE6Mmp.png"
            className={styles.Banner}
            alt="banner"
          />
        ) : (
          <img src={adminUser.cover} className={styles.Banner} alt="banner" />
        )}
      </div>
      <div className={styles.AvatarAccountContainer}>
        {adminUser.avatar === null ? (
          <DefaultAvatar className={styles.Avatar} />
        ) : (
          <img src={adminUser.avatar} className={styles.Avatar} alt="avatar" />
        )}
        <div className={styles.NameAccount}>
          <span className={styles.Name}>
            {' '}
            {adminUser.name.length > 6
              ? adminUser.name.substr(0, 6) + '...' || 'UserName'
              : adminUser.name || 'UserName'}
          </span>
          <span className={styles.Account}>@{adminUser.account}</span>
        </div>
      </div>
      <div className={styles.DetailInfoContainer}>
        <div className={styles.TweetsLikesContainer}>
          <div className={styles.PostContainer}>
            <Post className={styles.Post} />
            <span>{adminUser.totalTweets}</span>
          </div>
          <div className={styles.LikeContainer}>
            <Like className={styles.Like} />
            <span>{adminUser.totalLikes}</span>
          </div>
        </div>
        <div className={styles.FollowContainer}>
          <div className={styles.Following}>
            <span>{adminUser.followingCount} 個</span>
            <span className={styles.GreyText}>跟隨中</span>
          </div>
          <div className={styles.Follower}>
            <span>{adminUser.followerCount} 位</span>
            <span className={styles.GreyText}>跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUserListItem
