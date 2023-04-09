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
import { NotiTypeContext } from 'contexts/NoitTypeContext'
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'

const TweetList = ({
  tweets,
  user,
  setUser,
  updateTweetList,
  setUpdateTweetList,
}) => {
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate()
  // 控制推文modal的狀態，開啟或關閉(true or false)
  const [modalState, setModalState] = useContext(TweetModalContext)
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)
  const [notiState, setNotiState] = useContext(NotiContext)
  const [notiType, setNotiType] = useContext(NotiTypeContext)

  useEffect(() => {
    // 取得當前使用者頭貼
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
      {notiType === 'login' && (
        <Notification text="登入成功" type="success" notiState={notiState} />
      )}
      {notiType === 'tweet' && !errorMessage ? (
        <Notification text="推文成功" type="success" notiState={notiState} />
      ) : null}
      {notiType === 'reply' && !errorMessage ? (
        <Notification text="回覆成功" type="success" notiState={notiState} />
      ) : null}
      <div className={styles.TweetListContainer}>
        <div className={styles.TweetListTopSection}>
          <h4>首頁</h4>
          {/* // 點選這個區域就會顯示推文modal */}
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
        {/* // 如果推文modal的state是true就會顯示 */}
        {modalState && (
          <TweetModal setModalState={setModalState} avatar={avatar} />
        )}
        <TweetItemCollection
          tweets={tweets}
          user={user}
          setUser={setUser}
          setUpdateTweetList={setUpdateTweetList}
        />
      </div>
    </>
  )
}

export default TweetList
