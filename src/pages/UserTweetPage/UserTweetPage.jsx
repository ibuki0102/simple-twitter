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

  // 雪央註: 個人資訊頁下方換頁時需要重新整理畫面，需要確認資料成功回傳
  const [currentPage, setCurrentPage] = useState('userPost')

  // 串接個人資料的'推文'
  useEffect(() => {
    const getTweets = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (!token) {
        navigate('/login')
      }
      try {
        const tweetsList = await getUserPostTweets({ token, userId })
        if (tweetsList) {
          setTweets(tweetsList)
        }
        const replyTweetsList = await getUserReplyTweets({ token, userId })
        if (replyTweetsList) {
          setReplyTweets(replyTweetsList)
        }
        const likeTweetsList = await getUserLikeTweets({ token, userId })
        if (likeTweetsList) {
          setLikeTweets(likeTweetsList)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getTweets()
  }, [navigate, currentPage])

  return (
    <div className={styles.UserTweetPageContainer}>
      <Sidebar page="user" type="user" />
      <UserPostList
        tweets={tweets}
        replyTweets={replyTweets}
        likeTweets={likeTweets}
        page={page}
        setPage={setPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <PopularUserList />
    </div>
  )
}

export default UserTweetPage
