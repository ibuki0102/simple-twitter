// Jasmine

import styles from 'components/PopularUserList/PopularUserList.module.scss'

import PopularUser from 'components/PopularUser/PopularUser'
import { getPopularUserList } from 'api/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PopularUserList = ({
  updateTweetList,
  setUpdateTweetList,
  profileModalState,
  clickFollow,
}) => {
  const [popularUserList, setPopularUserList] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const userList = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (!token) {
        navigate('/login')
      }
      const data = await getPopularUserList({ token })
      // 將使用者本身從推薦列表中移除
      const asArray = Object.entries(data)
      const filtered = asArray.filter((data) => data[1].id !== Number(userId))
      const filteredData = Object.fromEntries(filtered)
      const finalData = Object.values(filteredData)
      const dataList = finalData.map((userData) => {
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
