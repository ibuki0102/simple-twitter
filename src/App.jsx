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
} from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from 'App.module.scss'
import { userData } from 'assets/userData'
import { replyTweetModalData } from 'assets/replyTweetModalData'
import TweetModal from 'components/TweetModal/TweetModal'
import ReplyModal from 'components/ReplyModal/ReplyModal'

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="regist" element={<RegistPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="admin/tweetList" element={<AdminTweetListPage />} />
          <Route path="admin/userList" element={<AdminUserListPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="main/replyList" element={<ReplyListPage />} />
          <Route path="/user/self" element={<UserTweetPage />} />
          <Route path="setting" element={<SettingPage userData={userData} />} />
          {/* 雪央註: Modal的路由僅供顯示，之後會在MainPage以及ReplyListPage裡用Component使用 */}
          <Route
            path="tweetModal"
            element={<TweetModal userData={userData} />}
          />
          <Route
            path="replyModal"
            element={<ReplyModal replyTweetModalData={replyTweetModalData} />}
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
