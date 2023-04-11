// Jasmine

import styles from 'components/PopularUser/PopularUser.module.scss'
import { followUser, unFollowUser } from 'api/follow'
import { useState, useContext } from 'react'
import { UpdateTweetContext } from 'contexts/UpdateTweetContext'

const PopularUser = ({ userData }) => {
  const [updateTweetList, setUpdateTweetList] = useContext(UpdateTweetContext)
  // 控制當前的使用者有沒有追隨這個人
  const [isFollowed, setIsFollow] = useState(userData.isFollowed)
  const userId = localStorage.getItem('userId')
  // 點擊追隨
  const handleClickFollow = async () => {
    const token = localStorage.getItem('token')
    const id = userData.id
    const data = await followUser({ token, id })
    if (data) {
      setIsFollow(true)
      setUpdateTweetList(true)
    }
  }
  // 點擊取消追隨
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
          <div className={styles.UserName}>
            {userData.name.length > 6
              ? userData.name.substr(0, 6) + '...'
              : userData.name || 'UserName'}
          </div>
          <div className={styles.UserAccount}>
            @
            {userData.account.length > 5
              ? userData.account.substr(0, 5) + '...'
              : userData.account || 'UserAccount'}
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
