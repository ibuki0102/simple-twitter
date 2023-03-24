// Jasmine

import styles from './MainPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import TweetList from 'components/TweetList/TweetList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

// 帶入假資料
const dummyUsers = [
  {
    name: 'Apple',
    id: 34,
    account: '@apple',
    time: '3 小時',
    description: 'Quo qui dolorem quasi nemo fugiat.',
    Likes: {
      totalLikes: 2,
    },
    Replies: {
      totalReplies: 3,
    },
  },
  {
    name: 'Banana',
    id: 44,
    account: '@banana',
    time: '4 小時',
    description: 'Quo qui dolorem quasi nemo fugiat.',
    Likes: {
      totalLikes: 1,
    },
    Replies: {
      totalReplies: 4,
    },
  },
  {
    name: 'Cat',
    id: 4,
    account: '@cat',
    time: '5 小時',
    description: 'Quo qui dolorem quasi nemo fugiat.',
    Likes: {
      totalLikes: 10,
    },
    Replies: {
      totalReplies: 2,
    },
  },
  {
    name: 'Dog',
    id: 24,
    account: '@dog',
    time: '6 小時',
    description: 'Quo qui dolorem quasi nemo fugiat.',
    Likes: {
      totalLikes: 5,
    },
    Replies: {
      totalReplies: 3,
    },
  },
  {
    name: 'Egg',
    account: '@egg',
    time: '7 小時',
    description: 'Quo qui dolorem quasi nemo fugiat.',
    Likes: {
      totalLikes: 9,
    },
    Replies: {
      totalReplies: 2,
    },
  },
  {
    name: 'Fly',
    account: '@fly',
    time: '9 小時',
    description: 'Quo qui dolorem quasi nemo fugiat.',
    Likes: {
      totalLikes: 1,
    },
    Replies: {
      totalReplies: 9,
    },
  },
]

const MainPage = () => {
  return (
    <div className={styles.MainPageContainer}>
      <Sidebar />
      <TweetList users={dummyUsers} />
      <PopularUserList />
    </div>
  )
}

export default MainPage
