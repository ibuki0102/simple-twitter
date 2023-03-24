// Jasmine

import styles from 'components/UserPostList/UserPostList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'
import { ReactComponent as Photo } from 'assets/icons/Big_Photo.svg'

import TweetItemCollection from 'components/TweetItemCollection/TweetItemCollection'
import ReplyItemCollection from 'components/ReplyItemCollection/ReplyItemCollection'

const UserPostList = ({ users }) => {
  return (
    <div className={styles.UserPostListContainer}>
      <div className={styles.UserPostListTopSection}>
        <div className={styles.Return}>
          <Back />
          <div className={styles.UserName}>
            <h5 className={styles.Name}>John Doe</h5>
            <div className={styles.TweetCount}>25 推文</div>
          </div>
        </div>
        <img
          src="https://i.imgur.com/jXE6Mmp.png"
          className={styles.Banner}
          alt="banner"
        />
        <Photo className={styles.Photo} />
        <button>編輯個人資料</button>
        <div className={styles.UserIntroduction}>
          <div className={styles.User}>
            <h5 className={styles.UserName}>John Doe</h5>
            <div className={styles.UserAcount}>@johndoe</div>
          </div>
          <div className={styles.Introduction}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </div>
          <div className={styles.Follow}>
            <div className={styles.Following}>
              <div className={styles.Number}>34個</div>
              <div className={styles.Text}>跟隨中</div>
            </div>
            <div className={styles.Follower}>
              <div className={styles.Number}>59位</div>
              <div className={styles.Text}>跟隨者</div>
            </div>
          </div>
        </div>
        <div className={styles.Heading}>
          <div className={`${styles.Title} ${styles.Active}`}>推文</div>
          <div className={styles.Title}>回覆</div>
          <div className={styles.Title}>喜歡的內容</div>
        </div>
      </div>
      {/* 推文 */}
      <TweetItemCollection users={users} />
      {/* 回覆 */}
      {/* <ReplyItemCollection /> */}
    </div>
  )
}

export default UserPostList
