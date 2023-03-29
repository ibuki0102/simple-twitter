import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) {
      return navigate('/login')
    }
    if (role === 'user') {
      return navigate('/main')
    }
    if (role === 'admin') {
      return navigate('/admin/tweetList')
    }
  })
}

export default Homepage
