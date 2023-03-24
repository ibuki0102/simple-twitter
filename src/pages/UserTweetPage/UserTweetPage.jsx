// Jasmine

import styles from 'pages/UserTweetPage/UserTweetPage.module.scss'

import Sidebar from 'components/Sidebar/Sidebar'
import UserPostList from 'components/UserPostList/UserPostList'
import PopularUserList from 'components/PopularUserList/PopularUserList'

// 帶入假資料
const dummyUsers = [
  {
    id: 34,
    description: 'Quo qui dolorem quasi nemo fugiat.',
    UserId: 14,
    createdAt: '2021-06-15T09:47:34.000Z',
    updatedAt: '2023-02-05T06:59:58.000Z',
    Likes: {
      totalLikes: 1,
      isLiked: 1,
    },
    Replies: {
      totalReplies: 3,
    },
    isLiked: true,
  },
  {
    id: 44,
    description: 'Aliquid dolorem aut adipisci impedit omnis aperiam vel.',
    UserId: 14,
    createdAt: '2021-04-19T23:07:00.000Z',
    updatedAt: '2023-02-14T05:40:43.000Z',
    Likes: {
      totalLikes: 1,
      isLiked: 0,
    },
    Replies: {
      totalReplies: 3,
    },
    isLiked: false,
  },
  {
    id: 4,
    description:
      'Commodi voluptas magnam et veniam ut quas ea voluptatem omnis.',
    UserId: 14,
    createdAt: '2021-02-07T11:39:44.000Z',
    updatedAt: '2023-02-13T14:40:22.000Z',
    Likes: {
      totalLikes: 0,
      isLiked: 0,
    },
    Replies: {
      totalReplies: 3,
    },
    isLiked: false,
  },
  {
    id: 24,
    description: 'In distinctio reprehenderit dolores sequi.',
    UserId: 14,
    createdAt: '2021-01-12T14:06:41.000Z',
    updatedAt: '2023-02-05T05:50:32.000Z',
    Likes: {
      totalLikes: 1,
      isLiked: 0,
    },
    Replies: {
      totalReplies: 3,
    },
    isLiked: false,
  },
]

const UserTweetPage = () => {
  return (
    <div className={styles.UserTweetPageContainer}>
      <Sidebar page="user" />
      <UserPostList users={dummyUsers} />
      <PopularUserList />
    </div>
  )
}

export default UserTweetPage
