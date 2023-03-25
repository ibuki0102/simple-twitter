// Jasmine

import styles from './UserFollowPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import PopularUserList from 'components/PopularUserList/PopularUserList'
import UserFollowList from 'components/UserFollowList/UserFollowList'

import { useNavigate } from 'react-router-dom'
import { getUserFollowers, getUserFollowings } from 'api/userFollowPage'
import { useEffect, useState } from 'react'

const UserFollowPage = () => {
  const navigate = useNavigate()
  // Jasmine 註: 串接'追隨者'使用 setFollowers 管理資料
  const [followers, setFollowers] = useState([])

  // Jasmine 註: 串接'追隨者'使用 setFollowers 管理資料
  const [followings, setFollowings] = useState([])

  // Jasmine 註: 紀錄當前頁面，使用 setFollowPage 管理頁面
  const [followPage, setFollowPage] = useState('followers')

  // 串接'追隨者'資料
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const followers = await getUserFollowers({ token, userId })
        if (followers) {
          setFollowers(followers)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getFollowers()
  }, [navigate])

  // 串接'正在追隨'資料
  useEffect(() => {
    const getFollowings = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const followings = await getUserFollowings({ token, userId })
        if (followings) {
          setFollowings(followings)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getFollowings()
  }, [navigate])

  return (
    <div className={styles.UserFollowPageContainer}>
      <Sidebar />
      {followPage === 'followers' && (
        <UserFollowList
          followers={followers}
          followPage={followPage}
          setFollowPage={setFollowPage}
        />
      )}
      {followPage === 'followings' && (
        <UserFollowList
          followings={followings}
          followPage={followPage}
          setFollowPage={setFollowPage}
        />
      )}
      <PopularUserList />
    </div>
  )
}

export default UserFollowPage
