import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'

const Homepage = () => {
  const navigate = useNavigate()
  const setNotiState = useContext(NotiContext)[1]
  const setNotiType = useContext(NotiTypeContext)[1]
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const currentPage = localStorage.getItem('currentPage')
    if (!token) {
      setNotiType('notLogin')
      navigate('/login')
      if (!currentPage) {
        localStorage.setItem('currentPage', 'login')
      } else if (currentPage === 'login') {
        return
      } else {
        setTimeout(() => {
          setNotiState(true)
        }, 300)
      }
      return
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
