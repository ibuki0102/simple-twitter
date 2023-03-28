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
  const [errorMessage, setErrorMessage] = useState('')
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
  const handleClickSave = async (event) => {
    event.preventDefault()
    const {
      editAccount,
      editName,
      editEmail,
      editPassword,
      editCheckPassword,
    } = editUserData

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    let payloadData = {
      token,
      userId,
      name: editName,
      account: editAccount,
      email: editEmail,
    }
    // 密碼或確認密碼不等於undefined才加入payload
    if (editPassword !== undefined || editCheckPassword !== undefined) {
      payloadData = {
        ...payloadData,
        password: editPassword,
        checkPassword: editCheckPassword,
      }
    }
    // 如果帳號，名稱，email沒有值，就不送出
    if (editAccount === '' || editName === '' || editEmail === '') {
      return
    }
    if (editAccount.length > 10 || editName.length > 50) {
      return
    }
    const { data, errorMessage } = await patchInfo({ payloadData })
    if (data) {
      console.log(data)
    }
    if (errorMessage) {
      setErrorMessage(errorMessage)
      console.log(errorMessage)
    }
  }

  return (
    <div className={styles.Container}>
      <Sidebar type="user" page="setting" />
      <div className={styles.SettingFormContainer}>
        <div className={styles.Header}>帳戶設定</div>
        <form action="">
          <div className={styles.FormContainer}>
            <div className={styles.InputGroupContainer}>
              <AuthInput
                inputLabel="帳號"
                type="text"
                value={editUserData.editAccount}
                name="editAccount"
                onChange={(e) => {
                  handleInputChange(e)
                  setErrorMessage('')
                }}
                errorMessage={errorMessage}
              />
              <AuthInput
                inputLabel="名稱"
                type="text"
                value={editUserData.editName}
                name="editName"
                onChange={(e) => {
                  handleInputChange(e)
                  setErrorMessage('')
                }}
              />
              <AuthInput
                inputLabel="Email"
                type="email"
                value={editUserData.editEmail}
                name="editEmail"
                onChange={(e) => {
                  handleInputChange(e)
                  setErrorMessage('')
                }}
                errorMessage={errorMessage}
              />
              <AuthInput
                inputLabel="密碼"
                type="password"
                name="editPassword"
                placeholder="請設定密碼"
                value={editUserData.editPassword}
                onChange={(e) => {
                  handleInputChange(e)
                  setErrorMessage('')
                }}
                errorMessage={errorMessage}
              />
              <AuthInput
                inputLabel="密碼再確認"
                type="password"
                name="editCheckPassword"
                placeholder="請再次輸入密碼"
                value={editUserData.editCheckPassword}
                onChange={(e) => {
                  handleInputChange(e)
                  setErrorMessage('')
                }}
                errorMessage={errorMessage}
              />
              <button className={styles.SaveButton} onClick={handleClickSave}>
                儲存
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingPage
