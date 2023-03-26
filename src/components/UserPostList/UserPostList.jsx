// Jasmine

import styles from 'components/UserPostList/UserPostList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'
import { getUserData } from 'api/auth'
import { useNavigate } from 'react-router-dom'

import TweetItemCollection from 'components/TweetItemCollection/TweetItemCollection'
import ReplyItemCollection from 'components/ReplyItemCollection/ReplyItemCollection'
import LikeItemCollection from 'components/LikeItemCollection/LikeItemCollection'
import { useEffect, useState } from 'react'

const UserPostList = ({ tweets, replyTweets, likeTweets, page, setPage }) => {
  const navigate = useNavigate()
  // 管理個人資料頁面上方的個人資料
  const [userData, setUserData] = useState({
    account: '',
    name: '',
    introduction: '',
    followerCounts: 0,
    followingCounts: 0,
    avatar: '',
    cover: '',
    tweetsCounts: 0,
  })

  // 切換到'跟隨中'或'跟隨者'
  function handleChangePage(changePage) {
    if (changePage === 'followers') {
      setPage('followers')
      navigate('/user/follow')
    } else {
      setPage('followings')
      navigate('/user/follow')
    }
  }

  // 渲染個人資料頁面上方的個人資料
  useEffect(() => {
    const UserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const result = await getUserData({ token, userId })
        if (result) {
          setUserData({
            account: result.account,
            name: result.name,
            introduction: result.introduction,
            followerCounts: result.followerCounts,
            followingCounts: result.followingCounts,
            avatar: result.avatar,
            cover: result.cover,
            tweetsCounts: result.tweetsCounts,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    UserData()
  }, [navigate])
  const {
    account,
    name,
    introduction,
    followerCounts,
    followingCounts,
    avatar,
    cover,
    tweetsCounts,
  } = userData

  return (
    <div className={styles.UserPostListContainer}>
      <div className={styles.UserPostListTopSection}>
        <div className={styles.Return}>
          <Back />
          <div className={styles.UserName}>
            <h5 className={styles.Name}>{name}</h5>
            <div className={styles.TweetCount}>{tweetsCounts} 推文</div>
          </div>
        </div>
        <img
          src={cover || `https://i.imgur.com/jXE6Mmp.png`}
          className={styles.Banner}
          alt="banner"
        />
        <img
          src={avatar || 'https://i.imgur.com/ZyXrPxB.png'}
          className={styles.Photo}
          alt=""
        />
        <button>編輯個人資料</button>
        <div className={styles.UserIntroduction}>
          <div className={styles.User}>
            <h5 className={styles.UserName}>{name}</h5>
            <div className={styles.UserAcount}>@{account}</div>
          </div>
          <div className={styles.Introduction}>{introduction}</div>
          <div className={styles.Follow}>
            <div
              className={styles.Following}
              onClick={() => {
                handleChangePage('followers')
              }}
            >
              <div className={styles.Number}>{followingCounts || 0} 個</div>
              <div className={styles.Text}>跟隨中</div>
            </div>
            <div
              className={styles.Follower}
              onClick={() => {
                handleChangePage('followings')
              }}
            >
              <div className={styles.Number}>{followerCounts || 0} 位</div>
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
      {page === 'userPost' && <TweetItemCollection tweets={tweets} />}
      {/* 回覆 */}
      {page === 'userReply' && (
        <ReplyItemCollection replyTweets={replyTweets} />
      )}
      <LikeItemCollection likeTweets={likeTweets} />
    </div>
  )
}

export default UserPostList
