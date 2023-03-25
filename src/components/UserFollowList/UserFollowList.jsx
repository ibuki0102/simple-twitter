// Jasmine

import styles from 'components/UserFollowList/UserFollowList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'

import UserFollowItem from 'components/UserFollowItem/UserFollowItem'

const UserFollowList = ({
  followers,
  followings,
  followPage,
  setFollowPage,
}) => {
  function handleFollowPage(page) {
    if (page === 'followers') {
      setFollowPage('followers')
    } else {
      setFollowPage('followings')
    }
  }

  return (
    <div className={styles.UserFollowListContainer}>
      <div className={styles.UserFollowListTopSection}>
        <div className={styles.Return}>
          <Back />
          <div className={styles.UserName}>
            <h5 className={styles.Name}>John Doe</h5>
            <div className={styles.TweetCount}>25 推文</div>
          </div>
        </div>
        <div className={styles.Heading}>
          <div
            className={
              followPage === 'followers' ? styles.Active : styles.Title
            }
            onClick={() => {
              handleFollowPage('followers')
            }}
          >
            追隨者
          </div>
          <div
            className={
              followPage === 'followings' ? styles.Active : styles.Title
            }
            onClick={() => {
              handleFollowPage('followings')
            }}
          >
            正在追隨
          </div>
        </div>
      </div>
      <div>
        {followPage === 'followers' &&
          followers.map((follower) => {
            return <UserFollowItem key={follower.id} follow={follower} />
          })}
        {followPage === 'followings' &&
          followings.map((following) => {
            return <UserFollowItem key={following.id} follow={following} />
          })}
      </div>
    </div>
  )
}

export default UserFollowList
