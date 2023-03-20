
import { RegistPage, LoginPage, AdminLoginPage } from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminTweetListPage from 'pages/AdminTweetListPage/AdminTweetListPage'
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
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
