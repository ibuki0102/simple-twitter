// Jasmine

import styles from 'components/OtherUserPostList/OtherUserPostList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'
import { ReactComponent as Mail } from 'assets/icons/message.svg'
import { ReactComponent as Bell } from 'assets/icons/noti.svg'
import { getUserData } from 'api/auth'
import { useNavigate } from 'react-router-dom'

import TweetItemCollection from 'components/TweetItemCollection/TweetItemCollection'
import ReplyItemCollection from 'components/ReplyItemCollection/ReplyItemCollection'
import LikeItemCollection from 'components/LikeItemCollection/LikeItemCollection'

import { useState, useEffect } from 'react'

const OtherUserPostList = ({
  tweets,
  replyTweets,
  likeTweets,
  page,
  setPage,
  user,
  setUser,
  choice,
  setChoice,
}) => {
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
    isFollowed: '',
  })

  // 切換到'跟隨中'或'跟隨者'
  function handleChangePage(changePage) {
    if (changePage === 'followers') {
      setPage('followings')
      navigate('/user/other/follow')
    } else {
      setPage('followers')
      navigate('/user/other/follow')
    }
  }

  // 切換'推文'、'回覆'、'喜歡的內容'
  function handleChoose(changePage) {
    if (changePage === 'userReply') {
      setChoice('userReply')
    } else if (changePage === 'userLike') {
      setChoice('userLike')
    } else {
      setChoice('userPost')
    }
  }

  // 渲染個人資料頁面上方的個人資料
  useEffect(() => {
    const UserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = user
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
            isFollowed: result.isFollowed,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    UserData()
  }, [navigate, user])
  const {
    account,
    name,
    introduction,
    followerCounts,
    followingCounts,
    avatar,
    cover,
    tweetsCounts,
    isFollowed,
  } = userData

  return (
    <div className={styles.UserPostListContainer}>
      <div className={styles.UserPostListTopSection}>
        <div className={styles.Return}>
          <Back className={styles.Back} onClick={() => navigate('/main')} />
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
        <Mail className={styles.Mail} />
        <Bell className={styles.Bell} />
        {isFollowed ? (
          <button className={styles.ActiveButton}>正在跟隨</button>
        ) : (
          <button className={styles.DefaultButton}>跟隨</button>
        )}

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
              <div className={styles.Number}>{followerCounts || 0} 個</div>
              <div className={styles.Text}>跟隨中</div>
            </div>
            <div
              className={styles.Follower}
              onClick={() => {
                handleChangePage('followings')
              }}
            >
              <div className={styles.Number}>{followingCounts || 0} 位</div>
              <div className={styles.Text}>跟隨者</div>
            </div>
          </div>
        </div>
        <div className={styles.Heading}>
          <div
            className={choice === 'userPost' ? styles.Active : styles.Title}
            onClick={() => {
              handleChoose('userPost')
            }}
          >
            推文
          </div>
          <div
            className={choice === 'userReply' ? styles.Active : styles.Title}
            onClick={() => {
              handleChoose('userReply')
            }}
          >
            回覆
          </div>
          <div
            className={choice === 'userLike' ? styles.Active : styles.Title}
            onClick={() => {
              handleChoose('userLike')
            }}
          >
            喜歡的內容
          </div>
        </div>
      </div>
      {choice === 'userPost' && (
        <TweetItemCollection tweets={tweets} user={user} setUser={setUser} />
      )}
      {choice === 'userReply' && (
        <ReplyItemCollection replyTweets={replyTweets} />
      )}
      {choice === 'userLike' && <LikeItemCollection likeTweets={likeTweets} />}
    </div>
  )
}

export default OtherUserPostList
