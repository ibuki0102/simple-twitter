// 雪央

import styles from '../SettingPage/SettingPage.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import AuthInput from 'components/AuthInput/AuthInput'
import { useNavigate } from 'react-router-dom'
import { getUserData } from 'api/auth'
import { useEffect, useState } from 'react'

const SettingPage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ account: '', name: '', email: '' })
  const [editUserData, setEditUserData] = useState({
    editAccount: '',
    editName: '',
    editEmail: '',
  })

  useEffect(() => {
    const UserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login')
        }
        const result = await getUserData({ token, userId })
        if (result) {
          setUserData({
            account: result.account,
            name: result.name,
            email: result.email,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    UserData()
  }, [navigate])

  return (
    <div className={styles.Container}>
      <Sidebar type="user" page="setting" />
      <div className={styles.SettingFormContainer}>
        <div className={styles.Header}>帳戶設定</div>
        <div className={styles.FormContainer}>
          <div className={styles.InputGroupContainer}>
            <AuthInput
              inputLabel="帳號"
              type="text"
              value={
                editUserData.editAccount !== ''
                  ? editUserData.editAccount
                  : userData.account
              }
              onChange={(accountInputValue) =>
                setEditUserData({
                  editAccount: accountInputValue,
                  editName: editUserData.editName,
                  editEmail: editUserData.editEmail,
                })
              }
            />
            <AuthInput
              inputLabel="名稱"
              type="text"
              value={
                editUserData.editName !== ''
                  ? editUserData.editName
                  : userData.name
              }
              onChange={(nameInputValue) =>
                setEditUserData({
                  editName: nameInputValue,
                  editAccount: editUserData.editAccount,
                  editEmail: editUserData.editEmail,
                })
              }
            />
            <AuthInput
              inputLabel="Email"
              type="email"
              value={
                editUserData.editEmail !== ''
                  ? editUserData.editEmail
                  : userData.email
              }
              onChange={(accountInputValue) =>
                setEditUserData({
                  editEmail: accountInputValue,
                  editAccount: editUserData.editAccount,
                  editName: editUserData.editName,
                })
              }
            />
            <AuthInput
              inputLabel="密碼"
              type="password"
              placeholder="請設定密碼"
            />
            <AuthInput
              inputLabel="密碼再確認"
              type="password"
              placeholder="請再次輸入密碼"
            />
            <button className={styles.SaveButton}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
