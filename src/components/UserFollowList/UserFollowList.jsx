// Jasmine

import styles from 'components/UserFollowList/UserFollowList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'

import UserFollowItem from 'components/UserFollowItem/UserFollowItem'

const UserFollowList = ({ followers, followings, page, setPage }) => {
  function handleFollowPage(changePage) {
    if (changePage === 'followers') {
      setPage('followers')
    } else {
      setPage('followings')
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
            className={page === 'followers' ? styles.Active : styles.Title}
            onClick={() => {
              handleFollowPage('followers')
            }}
          >
            追隨者
          </div>
          <div
            className={page === 'followings' ? styles.Active : styles.Title}
            onClick={() => {
              handleFollowPage('followings')
            }}
          >
            正在追隨
          </div>
        </div>
      </div>
      <div>
        {page === 'followers' &&
          followers.map((follower) => {
            return <UserFollowItem key={follower.id} follow={follower} />
          })}
        {page === 'followings' &&
          followings.map((following) => {
            return <UserFollowItem key={following.id} follow={following} />
          })}
      </div>
    </div>
  )
}

export default UserFollowList
