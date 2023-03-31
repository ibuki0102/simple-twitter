// Jasmine

import styles from 'components/PopularUser/PopularUser.module.scss'
import { followUser, unFollowUser } from 'api/follow'
import { useState, useContext } from 'react'
import { UpdateTweetContext } from 'contexts/UpdateTweetContext'

const PopularUser = ({ userData }) => {
  const [updateTweetList, setUpdateTweetList] = useContext(UpdateTweetContext)
  const [isFollowed, setIsFollow] = useState(userData.isFollowed)
  const userId = localStorage.getItem('userId')
  const handleClickFollow = async () => {
    const token = localStorage.getItem('token')
    const id = userData.id
    const data = await followUser({ token, id })
    if (data) {
      setIsFollow(true)
      setUpdateTweetList(true)
    }
  }
  const handleClickUnFollow = async () => {
    const token = localStorage.getItem('token')
    const id = userData.id
    const data = await unFollowUser({ token, id })
    if (data) {
      setIsFollow(false)
      setUpdateTweetList(true)
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

      {userData.isFollowed
        ? userData.id !== Number(userId) && (
            <button
              className={styles.ActiveButton}
              onClick={handleClickUnFollow}
            >
              正在跟隨
            </button>
          )
        : userData.id !== Number(userId) && (
            <button
              className={styles.DefaultButton}
              onClick={handleClickFollow}
            >
              跟隨
            </button>
          )}
    </div>
  )
}

export default PopularUser
