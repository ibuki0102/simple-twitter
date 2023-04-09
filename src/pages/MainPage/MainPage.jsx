// Jasmine

import styles from './MainPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import TweetList from 'components/TweetList/TweetList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

import { useNavigate } from 'react-router-dom'
import { getMainPageUserTweets } from 'api/mainPageTweets'
import { useEffect, useState, useContext } from 'react'
import { useReplyContext } from 'contexts/ReplyContext'
import { UserContext } from 'contexts/UserContext'
import { TweetModalContext } from 'contexts/TweetModalContext'
import { UpdateTweetContext } from 'contexts/UpdateTweetContext'

const MainPage = () => {
  const navigate = useNavigate()
  const [tweets, setTweets] = useState([])
  const modalState = useContext(TweetModalContext)[0]
  // 控制是否更新推文列表
  const [updateTweetList, setUpdateTweetList] = useContext(UpdateTweetContext)
  const replyModalState = useReplyContext()[0]
  const [user, setUser] = useContext(UserContext)

  // Jasmine 新增: 拿到使用者首頁推文的API
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
          setUpdateTweetList(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getTweets()
  }, [
    navigate,
    modalState,
    updateTweetList,
    replyModalState,
    setUpdateTweetList,
  ])

  return (
    <div className={styles.MainPageContainer}>
      <Sidebar page="home" />
      <TweetList
        tweets={tweets}
        setTweets={setTweets}
        user={user}
        setUser={setUser}
        updateTweetList={updateTweetList}
        setUpdateTweetList={setUpdateTweetList}
      />
      <PopularUserList />
    </div>
  )
}

export default MainPage
