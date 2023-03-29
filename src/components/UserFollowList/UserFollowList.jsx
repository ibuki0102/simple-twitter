// Jasmine

import styles from 'components/UserFollowList/UserFollowList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import UserFollowItem from 'components/UserFollowItem/UserFollowItem'
import { getUserData } from 'api/auth'

const UserFollowList = ({
  followers,
  followings,
  page,
  setPage,
  user,
  setUser,
}) => {
  const navigate = useNavigate()

  // 管理使用者資料
  const [userData, setUserData] = useState({ name: '', tweetsCounts: 0 })

  function handleFollowPage(changePage) {
    if (changePage === 'followers') {
      setPage('followers')
    } else {
      setPage('followings')
    }
  }

  // 追隨頁面上的返回鍵
  function handleReturn() {
    const userId = localStorage.getItem('userId')
    if (user === userId) {
      navigate('/user/self')
    } else {
      navigate('/user/other')
    }
  }

  // 取得目前使用者
  useEffect(() => {
    const userName = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = user
        if (!token) {
          navigate('/login')
        }
        const result = await getUserData({ token, userId })
        if (result) {
          setUserData({
            name: result.name,
            tweetsCounts: result.tweetsCounts,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    userName()
  }, [navigate, user])

  return (
    <div className={styles.UserFollowListContainer}>
      <div className={styles.UserFollowListTopSection}>
        <div className={styles.Return}>
          <Back className={styles.Back} onClick={handleReturn} />
          <div className={styles.UserName}>
            <h5 className={styles.Name}>{userData.name}</h5>
            <div className={styles.TweetCount}>
              {userData.tweetsCounts} 推文
            </div>
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
