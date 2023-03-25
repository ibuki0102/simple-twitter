// Jasmine

import styles from '../TweetList/TweetList.module.scss'
import { ReactComponent as Photo } from 'assets/icons/Photo.svg'

import TweetItemCollection from 'components/TweetItemCollection/TweetItemCollection'
import TweetModal from 'components/TweetModal/TweetModal'
import { useState, useEffect } from 'react'
import { getUserData } from 'api/auth'
import { useNavigate } from 'react-router-dom'

const TweetList = ({ tweets, setTweets, modalState, setModalState }) => {
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate()
  const userData = async () => {
    try {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (!token) {
        navigate('/login')
      }
      const result = await getUserData({ token, userId })
      if (result) {
        setAvatar(result.avatar)
      }
    } catch (error) {
      console.error(error)
    }
  }
  userData()
  return (
    <div className={styles.TweetListContainer}>
      <div className={styles.TweetListTopSection}>
        <h4>首頁</h4>
        <div onClick={() => setModalState(true)} className={styles.TweetArea}>
          <div className={styles.Post}>
            <img className={styles.Photo} src={avatar} alt="avatar" />
            <h5>有什麼新鮮事？</h5>
          </div>
          <button>推文</button>
        </div>
      </div>
      {modalState && (
        <TweetModal
          setModalState={setModalState}
          modalState={modalState}
          avatar={avatar}
          setTweets={setTweets}
          tweets={tweets}
        />
      )}
      <TweetItemCollection tweets={tweets} />
    </div>
  )
}

export default TweetList
