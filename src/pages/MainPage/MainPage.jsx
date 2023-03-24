// Jasmine

import styles from './MainPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import TweetList from 'components/TweetList/TweetList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

import { useNavigate } from 'react-router-dom'
import { getMainPageUserTweets } from 'api/auth'
import { useEffect, useState } from 'react'

const MainPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const users = await getMainPageUserTweets({ token, userId })
        if (users) {
          setUsers(users)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [navigate])

  return (
    <div className={styles.MainPageContainer}>
      <Sidebar page="home" />
      <TweetList users={users} />
      <PopularUserList />
    </div>
  )
}

export default MainPage
