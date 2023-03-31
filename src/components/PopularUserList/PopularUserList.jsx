// Jasmine

import styles from 'components/PopularUserList/PopularUserList.module.scss'

import PopularUser from 'components/PopularUser/PopularUser'
import { getPopularUserList } from 'api/auth'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdateTweetContext } from 'contexts/UpdateTweetContext'

const PopularUserList = ({ profileModalState, clickFollow }) => {
  const [popularUserList, setPopularUserList] = useState('')
  const [updateTweetList, setUpdateTweetList] = useContext(UpdateTweetContext)
  const navigate = useNavigate()
  useEffect(() => {
    const userList = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
      }
      const data = await getPopularUserList({ token })
      const dataList = data.map((userData) => {
        return (
          <PopularUser
            userData={userData}
            key={userData.id}
            updateTweetList={updateTweetList}
            setUpdateTweetList={setUpdateTweetList}
          />
        )
      })
      setPopularUserList(dataList)
    }
    userList()
  }, [
    navigate,
    updateTweetList,
    setUpdateTweetList,
    profileModalState,
    clickFollow,
  ])
  return (
    <div className={styles.PopularUserListContainer}>
      <div className={styles.PopularUserContainer}>
        <h4>推薦跟隨</h4>
        <div className={styles.PopularUserCollection}>{popularUserList}</div>
      </div>
    </div>
  )
}

export default PopularUserList
