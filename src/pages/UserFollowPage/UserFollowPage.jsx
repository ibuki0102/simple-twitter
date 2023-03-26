// Jasmine

import styles from './UserFollowPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import PopularUserList from 'components/PopularUserList/PopularUserList'
import UserFollowList from 'components/UserFollowList/UserFollowList'

import { useNavigate } from 'react-router-dom'
import { getUserFollowers, getUserFollowings } from 'api/userFollowPage'
import { useEffect, useState, useContext } from 'react'
import { PageContext } from 'contexts/PageContext'

const UserFollowPage = () => {
  const navigate = useNavigate()
  // Jasmine 註: 串接'追隨者'使用 setFollowers 管理資料
  const [followers, setFollowers] = useState([])

  // Jasmine 註: 串接'追隨者'使用 setFollowers 管理資料
  const [followings, setFollowings] = useState([])

  // Jasmine 註: 紀錄當前頁面，使用 setPage 管理頁面
  const [page, setPage] = useContext(PageContext)

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
      {page === 'followers' && (
        <UserFollowList followers={followers} page={page} setPage={setPage} />
      )}
      {page === 'followings' && (
        <UserFollowList followings={followings} page={page} setPage={setPage} />
      )}
      <PopularUserList />
    </div>
  )
}

export default UserFollowPage
