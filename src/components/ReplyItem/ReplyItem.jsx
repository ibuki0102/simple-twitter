// Jasmine

import styles from 'components/ReplyItem/ReplyItem.module.scss'
import { useNavigate } from 'react-router-dom'

const ReplyItem = ({ replyTweet, user, setUser }) => {
  const navigate = useNavigate()

  // Jasmine 註: 點擊頭像獲取 id 並引導至個人資料頁
  const handleChangeUser = (id) => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    if (id !== userId) {
      setUser(id)
      navigate('/user/other')
    } else {
      navigate('/user/self')
    }
  }

  return (
    <>
      {replyTweet.Tweet.id !== null && (
        <div className={styles.ReplyItemContainer}>
          <div className={styles.ReplyUser}>
            <img
              src={replyTweet.User.avatar}
              className={styles.Avatar}
              alt="avatar"
              onClick={() => handleChangeUser?.(replyTweet.User.id)}
            />
            <div className={styles.Reply}>
              <span className={styles.UserName}>{replyTweet.User.name}</span>
              <span className={styles.UserAccount}>
                @{replyTweet.User.account}・{replyTweet.transferDateTime}
              </span>
              <div className={styles.ReplyAndTag}>
                <span className={styles.ReplyText}>回覆</span>
                <span className={styles.Tag}>
                  @{replyTweet.Tweet.User.ownerAccount}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.ReplyContent}>{replyTweet.comment}</div>
        </div>
      )}
    </>
  )
}

export default ReplyItem
