import {
  RegistPage,
  LoginPage,
  AdminLoginPage,
  AdminTweetListPage,
  AdminUserListPage,
  MainPage,
  SettingPage,
  ReplyListPage,
  UserTweetPage,
  UserFollowPage,
  OtherTweetPage,
} from 'pages'
import { Route, Routes } from 'react-router-dom'
import styles from 'App.module.scss'
import { userData } from 'assets/userData'
import { replyTweetModalData } from 'assets/replyTweetModalData'
import TweetModal from 'components/TweetModal/TweetModal'
import ReplyModal from 'components/ReplyModal/ReplyModal'
import ProfileEditModal from 'components/ProfileEditModal/ProfileEditModal'

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="regist" element={<RegistPage />} />
        <Route path="admin" element={<AdminLoginPage />} />
        <Route path="admin/tweetList" element={<AdminTweetListPage />} />
        <Route path="admin/userList" element={<AdminUserListPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="main/replyList" element={<ReplyListPage />} />
        <Route path="/user/self" element={<UserTweetPage />} />
        <Route path="/user/follow" element={<UserFollowPage />} />
        <Route path="/user/other" element={<OtherTweetPage />} />
        <Route path="setting" element={<SettingPage userData={userData} />} />
        {/* 雪央註: Modal的路由僅供顯示，之後會在MainPage以及ReplyListPage裡用Component使用 */}
        <Route path="tweetModal" element={<TweetModal userData={userData} />} />
        <Route
          path="replyModal"
          element={<ReplyModal replyTweetModalData={replyTweetModalData} />}
        />
        <Route
          path="profileEditModal"
          element={<ProfileEditModal userData={userData} />}
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
