import styles from '../TweetModal/TweetModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'
import { useState, useContext } from 'react'
import { Tweet } from 'api/mainPageTweets'
import { NotiContext } from 'contexts/NotiContext'
import { TweetModalContext } from 'contexts/TweetModalContext'
import Notification from 'components/Notification/Notification'
import { NotiTypeContext } from 'contexts/NoitTypeContext'
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'

const TweetModal = ({ avatar }) => {
  // 推文內容
  const [description, setDescription] = useState('')
  // 是否按下發送推文
  const [submited, setSubmited] = useState(false)
  const [notiState, setNotiState] = useContext(NotiContext)
  const setNotiType = useContext(NotiTypeContext)[1]
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)
  const setModalState = useContext(TweetModalContext)[1]
  // 按下發送推文
  const handleClick = async () => {
    setSubmited(true)
    setErrorMessage('')
    // 如果字數>140或為空的錯誤處理
    if (description.length > 140 || description.length === 0) {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setNotiType('tweet')
      setErrorMessage('字數不得超過或為空')
      return setTimeout(() => {
        setNotiState(false)
      }, 1500)
    }
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const { errorMessage } = await Tweet({ token, userId, description })

    if (errorMessage) {
      setErrorMessage(errorMessage)
      setNotiType('tweet')
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setModalState(false)
    } else {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setNotiType('tweet')
      // 關掉modal
      setModalState(false)
    }
  }

  return (
    <>
      {errorMessage && (
        <Notification text="推文失敗" type="failed" notiState={notiState} />
      )}
      <div className={styles.Overlay}>
        <div className={styles.Container}>
          <div className={styles.Header}>
            <OrangeCross
              className={styles.Close}
              onClick={() => setModalState(false)}
            />
          </div>
          <div className={styles.MainContainer}>
            <div className={styles.Main}>
              <img
                src={avatar || 'https://i.imgur.com/ZyXrPxB.png'}
                className={styles.Avatar}
                alt="avatar"
              />
              <div className={styles.TextAreaContainer}>
                <textarea
                  name=""
                  id=""
                  className={styles.TextArea}
                  placeholder="有什麼新鮮事？"
                  value={description}
                  onChange={(descriptionInputValue) => {
                    setDescription(descriptionInputValue.target.value)
                    setSubmited(false)
                  }}
                ></textarea>
              </div>
            </div>
            <div className={styles.Footer}>
              {description.length === 0 && submited ? (
                <span className={styles.TweetLimitText}>內容不可空白</span>
              ) : null}
              {description.length <= 140 && !submited ? (
                <span className={styles.TweetLengthText}>
                  {description.length}/140
                </span>
              ) : null}
              {description.length > 140 && (
                <span className={styles.TweetLimitText}>
                  字數不可超過 140 字
                </span>
              )}
              <button className={styles.TweetButton} onClick={handleClick}>
                推文
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TweetModal
