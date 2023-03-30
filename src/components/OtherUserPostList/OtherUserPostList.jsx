// Jasmine

import styles from 'components/OtherUserPostList/OtherUserPostList.module.scss'
import { ReactComponent as Back } from 'assets/icons/back.svg'
import { ReactComponent as Mail } from 'assets/icons/message.svg'
import { ReactComponent as Bell } from 'assets/icons/noti.svg'
import { getUserData } from 'api/auth'
import { useNavigate } from 'react-router-dom'
import { followUser, unFollowUser } from 'api/follow'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'
import Notification from 'components/Notification/Notification'

import TweetItemCollection from 'components/TweetItemCollection/TweetItemCollection'
import ReplyItemCollection from 'components/ReplyItemCollection/ReplyItemCollection'
import LikeItemCollection from 'components/LikeItemCollection/LikeItemCollection'

import { useState, useEffect, useContext } from 'react'

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
  setClickFollow,
}) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)
  const [notiState, setNotiState] = useContext(NotiContext)
  const [notiType, setNotiType] = useContext(NotiTypeContext)

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
  // 用來偵測使用者是否有點擊跟隨按紐
  const [isFollowing, setIsFollowing] = useState(userData.isFollowed)

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

  // 點擊追隨
  const handleClickFollow = async () => {
    const token = localStorage.getItem('token')
    const id = user
    const data = await followUser({ token, id })
    if (data) {
      setIsFollowing(true)
      setClickFollow(true)
    }
  }
  // 點擊取消追隨
  const handleClickUnFollow = async () => {
    const token = localStorage.getItem('token')
    const id = user
    const data = await unFollowUser({ token, id })
    if (data) {
      setIsFollowing(false)
      setClickFollow(false)
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
    if (notiState) {
      setTimeout(() => {
        setNotiState(false)
      }, 2500)
    }
  }, [navigate, user, isFollowing, notiState, setNotiState])

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
    <>
      {notiType === 'reply' && !errorMessage ? (
        <Notification text="回覆成功" type="success" notiState={notiState} />
      ) : null}
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
            <button
              className={styles.ActiveButton}
              onClick={handleClickUnFollow}
            >
              正在跟隨
            </button>
          ) : (
            <button
              className={styles.DefaultButton}
              onClick={handleClickFollow}
            >
              跟隨
            </button>
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
        {choice === 'userLike' && (
          <LikeItemCollection likeTweets={likeTweets} />
        )}
      </div>
    </>
  )
}

export default OtherUserPostList
