// Jasmine

import styles from './MainPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import TweetList from 'components/TweetList/TweetList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

import { useNavigate } from 'react-router-dom'
import { getMainPageUserTweets } from 'api/mainPageTweets'
import { useEffect, useState } from 'react'
import { useReplyContext } from 'contexts/ReplyContext'

const MainPage = ({ setReplyTweetId }) => {
  const navigate = useNavigate()
  const [tweets, setTweets] = useState([])
  const [modalState, setModalState] = useState(false)
  const [updateTweetList, setUpdateTweetList] = useState(false)
  const { replyModalState, setReplyModalState } = useReplyContext()

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
  }, [navigate, modalState, updateTweetList, replyModalState])

  return (
    <div className={styles.MainPageContainer}>
      <Sidebar
        page="home"
        modalState={modalState}
        setModalState={setModalState}
      />
      <TweetList
        tweets={tweets}
        setTweets={setTweets}
        modalState={modalState}
        setModalState={setModalState}
      />
      <PopularUserList
        updateTweetList={updateTweetList}
        setUpdateTweetList={setUpdateTweetList}
      />
    </div>
  )
}

export default MainPage
