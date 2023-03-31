// Jasmine

import styles from 'components/UserFollowItem/UserFollowItem.module.scss'
import { followUser, unFollowUser } from 'api/follow'
import { useState, useContext } from 'react'
import { UpdateTweetContext } from 'contexts/UpdateTweetContext'

const UserFollowItem = (follow) => {
  const [updateTweetList, setUpdateTweetList] = useContext(UpdateTweetContext)
  const [isFollowed, setIsFollow] = useState(follow.follow.isFollowed)
  const userId = JSON.parse(localStorage.getItem('userId'))

  const handleClickFollow = async () => {
    const token = localStorage.getItem('token')
    const id = follow.follow.id
    const data = await followUser({ token, id })
    if (data) {
      setIsFollow(true)
      setUpdateTweetList(true)
    }
  }
  const handleClickUnFollow = async () => {
    const token = localStorage.getItem('token')
    const id = follow.follow.id
    const data = await unFollowUser({ token, id })
    if (data) {
      setIsFollow(false)
      setUpdateTweetList(true)
    }
  }

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
              <button
                className={styles.ActiveButton}
                onClick={handleClickUnFollow}
              >
                正在跟隨
              </button>
            )
          : follow.follow.id !== userId &&
            follow.follow.avatar !== null && (
              <button
                className={styles.DefaultButton}
                onClick={handleClickFollow}
              >
                跟隨
              </button>
            )}
        <div className={styles.TweetContent}>{follow.follow.introduction}</div>
      </div>
    </div>
  )
}

export default UserFollowItem
