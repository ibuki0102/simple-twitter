// Jasmine

import styles from './OtherTweetPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import OtherUserPostList from 'components/OtherUserPostList/OtherUserPostList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

import { useNavigate } from 'react-router-dom'
import {
  getUserPostTweets,
  getUserReplyTweets,
  getUserLikeTweets,
} from 'api/userTweetPage'
import { useEffect, useState, useContext } from 'react'
import { PageContext } from 'contexts/PageContext'
import { UserContext } from 'contexts/UserContext'

const OtherTweetPage = () => {
  const navigate = useNavigate()
  // Jasmine 註: 串接'推文'使用 setTweets 管理資料
  const [tweets, setTweets] = useState([])

  // Jasmine 註: 串接'回覆'使用 setReplyTweets 管理資料
  const [replyTweets, setReplyTweets] = useState([])

  // Jasmine 註: 串接'喜歡的內容'使用 setLikeTweets 管理資料
  const [likeTweets, setLikeTweets] = useState([])

  // Jasmine 註: 紀錄當前頁面，使用 setPage 管理頁面
  const [page, setPage] = useContext(PageContext)

  // Jasmine 註: 紀錄使用者 id
  const [user, setUser] = useContext(UserContext)

  // 串接個人資料的'推文'、'回覆'、'喜歡的內容'
  useEffect(() => {
    const getTweets = async () => {
      const token = localStorage.getItem('token')
      const userId = user
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
  }, [navigate, user])

  return (
    <div className={styles.OtherTweetPageContainer}>
      <Sidebar page="user" type="user" />
      <OtherUserPostList
        tweets={tweets}
        replyTweets={replyTweets}
        likeTweets={likeTweets}
        page={page}
        setPage={setPage}
        user={user}
        setUser={setUser}
      />
      <PopularUserList />
    </div>
  )
}

export default OtherTweetPage
