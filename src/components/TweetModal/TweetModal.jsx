import styles from '../TweetModal/TweetModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'
import { useState } from 'react'
import { Tweet } from 'api/mainPageTweets'

const TweetModal = ({ setModalState, avatar }) => {
  const [description, setDescription] = useState('')
  const [submited, setSubmited] = useState(false)
  const handleClick = async () => {
    if (description.length > 140 || description.length === 0) {
      return setSubmited(true)
    }
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    await Tweet({ token, userId, description })
    setModalState(false)
  }
  return (
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
              <span className={styles.TweetLimitText}>字數不可超過 140 字</span>
            )}
            <button className={styles.TweetButton} onClick={handleClick}>
              推文
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetModal
