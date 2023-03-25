// Jasmine

import styles from 'components/PopularUser/PopularUser.module.scss'
import { followUser, unFollowUser } from 'api/follow'
import { useState } from 'react'

const PopularUser = ({ userData, updateTweetList, setUpdateTweetList }) => {
  const [isFollowed, setIsFollow] = useState(userData.isFollowed)
  const handleClickFollow = async () => {
    const token = localStorage.getItem('token')
    const id = userData.id
    const data = await followUser({ token, id })
    if (data) {
      setIsFollow(true)
      setUpdateTweetList(!updateTweetList)
    }
  }
  const handleClickUnFollow = async () => {
    const token = localStorage.getItem('token')
    const id = userData.id
    const data = await unFollowUser({ token, id })
    if (data) {
      setIsFollow(false)
      setUpdateTweetList(!updateTweetList)
    }
  }
  return (
    <div className={styles.PopularUserContainer}>
      <div className={styles.UserInfoContainer}>
        <img
          src={userData.avatar}
          className={styles.DefaultAvatar}
          alt="avatar"
        />
        <div className={styles.PopularUserName}>
          <div className={styles.UserName}>{userData.name || 'UserName'}</div>
          <div className={styles.UserAcount}>
            @{userData.account || 'UserAccount'}
          </div>
        </div>
      </div>

      {isFollowed ? (
        <button className={styles.ActiveButton} onClick={handleClickUnFollow}>
          正在跟隨
        </button>
      ) : (
        <button className={styles.DefaultButton} onClick={handleClickFollow}>
          跟隨
        </button>
      )}
    </div>
  )
}

export default PopularUser
