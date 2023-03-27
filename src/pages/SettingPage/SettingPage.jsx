// 雪央

import styles from '../SettingPage/SettingPage.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import AuthInput from 'components/AuthInput/AuthInput'
import { useNavigate } from 'react-router-dom'
import { getUserData } from 'api/auth'
import { useEffect, useState } from 'react'
import { patchInfo } from 'api/setting'

const SettingPage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ account: '', name: '', email: '' })
  const [editUserData, setEditUserData] = useState({
    editAccount: '',
    editName: '',
    editEmail: '',
    editPassword: '',
    editCheckPassword: '',
  })

  // '帳戶設定'代入使用者資料
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
          setEditUserData({
            editAccount: result.account,
            editName: result.name,
            editEmail: result.email,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    UserData()
  }, [navigate])

  const handleInputChange = (event) => {
    setEditUserData({
      ...editUserData,
      [event.target.name]: event.target.value,
    })
  }
  const handleClickSave = async () => {
    console.log(editUserData)
    const {
      editAccount,
      editName,
      editEmail,
      editPassword,
      editCheckPassword,
    } = editUserData

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    let payloadData = { token, userId, name: editName }
    // 帳號不等於目前帳號才加入payload
    if (editAccount !== userData.account) {
      payloadData = { ...payloadData, account: editAccount }
    }
    // email不等於目前email才加入payload
    if (editEmail !== userData.email) {
      payloadData = { ...payloadData, email: editEmail }
    }
    // 密碼與確認密碼不等於undefined才加入payload
    if (editPassword !== undefined && editCheckPassword !== undefined) {
      payloadData = {
        ...payloadData,
        password: editPassword,
        checkPassword: editCheckPassword,
      }
    }
    // 如果有輸入密碼但沒有輸入確認密碼，就不送出
    if (editPassword !== '' && editCheckPassword === '') {
      return
    }
    // 如果帳號，名稱，email沒有值，就不送出
    if (editAccount === '' || editName === '' || editEmail === '') {
      return
    }
    const data = await patchInfo({ payloadData })
    console.log(data)
  }

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
              name="editAccount"
              onChange={(event) => handleInputChange(event)}
            />
            <AuthInput
              inputLabel="名稱"
              type="text"
              value={
                editUserData.editName !== ''
                  ? editUserData.editName
                  : userData.name
              }
              name="editName"
              onChange={handleInputChange}
            />
            <AuthInput
              inputLabel="Email"
              type="email"
              value={
                editUserData.editEmail !== ''
                  ? editUserData.editEmail
                  : userData.email
              }
              name="editEmail"
              onChange={handleInputChange}
            />
            <AuthInput
              inputLabel="密碼"
              type="password"
              name="editPassword"
              placeholder="請設定密碼"
              value={editUserData.editPassword}
              onChange={handleInputChange}
            />
            <AuthInput
              inputLabel="密碼再確認"
              type="password"
              name="editCheckPassword"
              placeholder="請再次輸入密碼"
              value={editUserData.editCheckPassword}
              onChange={handleInputChange}
            />
            <button className={styles.SaveButton} onClick={handleClickSave}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
