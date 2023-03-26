// Jasmine

import styles from 'pages/UserTweetPage/UserTweetPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import UserPostList from 'components/UserPostList/UserPostList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

import { useNavigate } from 'react-router-dom'
import {
  getUserPostTweets,
  getUserReplyTweets,
  getUserLikeTweets,
} from 'api/userTweetPage'
import { useEffect, useState, useContext } from 'react'
import { PageContext } from 'contexts/PageContext'

const UserTweetPage = () => {
  const navigate = useNavigate()
  // Jasmine 註: 串接'推文'使用 setTweets 管理資料
  const [tweets, setTweets] = useState([])

  // Jasmine 註: 串接'回覆'使用 setReplyTweets 管理資料
  const [replyTweets, setReplyTweets] = useState([])

  // Jasmine 註: 串接'喜歡的內容'使用 setLikeTweets 管理資料
  const [likeTweets, setLikeTweets] = useState([])

  // Jasmine 註: 紀錄當前頁面，使用 setPage 管理頁面
  const [page, setPage] = useContext(PageContext)

  // 串接個人資料的'推文'
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

  // 串接個人資料的'回覆'
  useEffect(() => {
    const getReplyTweets = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const replyTweets = await getUserReplyTweets({ token, userId })
        if (replyTweets) {
          setReplyTweets(replyTweets)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getReplyTweets()
  }, [navigate])

  // 串接個人資料的'喜歡的內容'
  useEffect(() => {
    const getLikeTweets = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const likeTweets = await getUserLikeTweets({ token, userId })
        if (likeTweets) {
          setLikeTweets(likeTweets)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getLikeTweets()
  }, [navigate])

  return (
    <div className={styles.UserTweetPageContainer}>
      <Sidebar page="user" type="user" />
      <UserPostList
        tweets={tweets}
        replyTweets={replyTweets}
        likeTweets={likeTweets}
        page={page}
        setPage={setPage}
      />
      <PopularUserList />
    </div>
  )
}

export default UserTweetPage
