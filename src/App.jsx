
import {
  RegistPage,
  LoginPage,
  AdminLoginPage,
  AdminTweetListPage,
  AdminUserListPage,
  MainPage
} from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from 'App.module.scss'

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
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
