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
  Homepage,
} from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from 'App.module.scss'
import { userData } from 'assets/userData'
import ProfileEditModal from 'components/ProfileEditModal/ProfileEditModal'
import { useState } from 'react'
import { PageContext, initialPage } from 'contexts/PageContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'

const basename = process.env.PUBLIC_URL

function App() {
  const [page, setPage] = useState(initialPage)
  const [replyTweetId, setReplyTweetId] = useState('')

  return (
    <div className={styles.App}>
      <PageContext.Provider value={[page, setPage]}>
        <ReplyContextProvider>
          <ReplyTweetContext.Provider value={[replyTweetId, setReplyTweetId]}>
            <BrowserRouter basename={basename}>
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="regist" element={<RegistPage />} />
                <Route path="admin" element={<AdminLoginPage />} />
                <Route
                  path="admin/tweetList"
                  element={<AdminTweetListPage />}
                />
                <Route path="admin/userList" element={<AdminUserListPage />} />
                <Route path="main" element={<MainPage />} />
                <Route path="main/replyList" element={<ReplyListPage />} />
                <Route path="/user/self" element={<UserTweetPage />} />
                <Route path="/user/follow" element={<UserFollowPage />} />
                <Route path="/user/other" element={<OtherTweetPage />} />
                <Route path="setting" element={<SettingPage />} />
                {/* 雪央註: Modal的路由僅供顯示，之後會在MainPage以及ReplyListPage裡用Component使用 */}
                <Route
                  path="profileEditModal"
                  element={<ProfileEditModal userData={userData} />}
                />
                <Route path="*" element={<Homepage />} />
              </Routes>
            </BrowserRouter>
          </ReplyTweetContext.Provider>
        </ReplyContextProvider>
      </PageContext.Provider>
    </div>
  )
}

export default App
