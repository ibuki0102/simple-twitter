// Jasmine

import styles from './MainPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import TweetList from 'components/TweetList/TweetList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

import { useNavigate } from 'react-router-dom'
import { getMainPageUserTweets } from 'api/mainPageTweets'
import { useEffect, useState } from 'react'

const MainPage = () => {
  const navigate = useNavigate()
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const getTweets = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const tweets = await getMainPageUserTweets({ token, userId })
        if (tweets) {
          setTweets(tweets)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getTweets()
  }, [navigate])

  return (
    <div className={styles.MainPageContainer}>
      <Sidebar page="home" />
      <TweetList tweets={tweets}/>
      <PopularUserList />
    </div>
  )
}

export default MainPage
