import styles from '../TweetModal/TweetModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'

const TweetModal = ({ userData }) => {
  const { avatar } = userData
  return (
    <div className={styles.Overlay}>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <OrangeCross className={styles.Close} />
        </div>
        <div className={styles.MainContainer}>
          <div className={styles.Main}>
            <div className={styles.Avatar}>
              <img src={avatar} alt="avatar" />
            </div>
            <div className={styles.TextAreaContainer}>
              <textarea
                name=""
                id=""
                className={styles.TextArea}
                placeholder="有什麼新鮮事？"
              ></textarea>
            </div>
          </div>
          <div className={styles.Footer}>
            <span className={styles.TweetLimitText}>字數不可超過 140 字</span>
            <button className={styles.TweetButton}>推文</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetModal
