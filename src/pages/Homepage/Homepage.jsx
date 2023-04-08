import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    // 如果沒有token就導引到登入頁
    if (!token) {
      return navigate('/login')
    }
    // 根據使用者身分跳轉頁面，前台不能進入後台，後台也不能進入前台
    if (role === 'user') {
      return navigate('/main')
    }
    if (role === 'admin') {
      return navigate('/admin/tweetList')
    }
  })
}

export default Homepage
