import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'

const Homepage = ({ firstEnter, setFirstEnter }) => {
  const navigate = useNavigate()
  const setNotiState = useContext(NotiContext)[1]
  const setNotiType = useContext(NotiTypeContext)[1]
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) {
      setNotiType('notLogin')
      navigate('/login')
      if (!firstEnter) {
        return setTimeout(() => {
          setNotiState(true)
        }, 300)
      } else {
        setFirstEnter(false)
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
