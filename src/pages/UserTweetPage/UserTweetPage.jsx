// Jasmine

import styles from 'pages/UserTweetPage/UserTweetPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import UserPostList from 'components/UserPostList/UserPostList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

import { useNavigate } from 'react-router-dom'
import { getUserPostTweets } from 'api/userTweetPagePostTweets'
import { useEffect, useState, useContext } from 'react'
import { PageContext } from 'contexts/PageContext'

const UserTweetPage = () => {
  const navigate = useNavigate()
  const [tweets, setTweets] = useState([])
  const [page, setPage] = useContext(PageContext)

  useEffect(() => {
    const getTweets = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const tweets = await getUserPostTweets({ token, userId })
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
    <div className={styles.UserTweetPageContainer}>
      <Sidebar page="user" type="user" />
      <UserPostList tweets={tweets} page={page} setPage={setPage} />
      <PopularUserList />
    </div>
  )
}

export default UserTweetPage
