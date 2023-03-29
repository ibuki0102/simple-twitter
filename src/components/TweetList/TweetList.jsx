// Jasmine

import styles from '../TweetList/TweetList.module.scss'

import TweetItemCollection from 'components/TweetItemCollection/TweetItemCollection'
import TweetModal from 'components/TweetModal/TweetModal'
import { useState, useEffect, useContext } from 'react'
import { TweetModalContext } from 'contexts/TweetModalContext'
import { getUserData } from 'api/auth'
import { useNavigate } from 'react-router-dom'
import { NotiContext } from 'contexts/NotiContext'
import Notification from 'components/Notification/Notification'

const TweetList = ({
  tweets,
  user,
  setUser,
  updateTweetList,
  setUpdateTweetList,
}) => {
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate()
  const [modalState, setModalState] = useContext(TweetModalContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [notiState, setNotiState] = useContext(NotiContext)

  useEffect(() => {
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
    if (notiState) {
      setTimeout(() => {
        setNotiState(false)
      }, 2500)
    }
    userData()
  }, [navigate, notiState, setNotiState])

  return (
    <>
      {!errorMessage && (
        <Notification text="推文成功" type="success" notiState={notiState} />
      )}
      <div className={styles.TweetListContainer}>
        <div className={styles.TweetListTopSection}>
          <h4>首頁</h4>
          <div onClick={() => setModalState(true)} className={styles.TweetArea}>
            <div className={styles.Post}>
              <img
                className={styles.Photo}
                src={avatar || 'https://i.imgur.com/ZyXrPxB.png'}
                alt="avatar"
              />
              <h5>有什麼新鮮事？</h5>
            </div>
            <button>推文</button>
          </div>
        </div>
        {modalState && (
          <TweetModal
            setModalState={setModalState}
            avatar={avatar}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
        <TweetItemCollection
          tweets={tweets}
          user={user}
          setUser={setUser}
          setUpdateTweetList={setUpdateTweetList}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
      </div>
    </>
  )
}

export default TweetList
