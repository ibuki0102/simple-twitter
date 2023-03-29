import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }
    if (role === 'user') {
      navigate('/main')
    }
    if (role === 'admin') {
      navigate('/admin/tweetList')
    }
  })
}

export default Homepage
