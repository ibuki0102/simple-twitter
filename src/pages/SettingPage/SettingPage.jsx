// 雪央

import styles from '../SettingPage/SettingPage.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import AuthInput from 'components/AuthInput/AuthInput'
import { useNavigate } from 'react-router-dom'
import { getUserData } from 'api/auth'
import { useEffect, useState, useContext } from 'react'
import { patchInfo } from 'api/setting'
import Notification from 'components/Notification/Notification'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'

const SettingPage = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [notiState, setNotiState] = useContext(NotiContext)
  const [notiType, setNotiType] = useContext(NotiTypeContext)
  // 儲存使用者編輯過的資料
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
        if (result && notiType !== 'fail setting') {
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
    if (notiState) {
      setTimeout(() => {
        setNotiState(false)
      }, 2500)
    }
  }, [navigate, notiState, setNotiState, notiType])

  // 使用者編輯資料時觸發的事件
  const handleInputChange = (event) => {
    setEditUserData({
      ...editUserData,
      [event.target.name]: event.target.value,
    })
  }
  // 使用者點擊儲存觸發的事件
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
      setNotiType('fail setting')
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      return
    }
    // 帳號或名稱字數超過，就不送出
    if (editAccount.length > 10 || editName.length > 50) {
      setNotiType('fail setting')
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      return
    }
    const { data, errorMessage } = await patchInfo({ payloadData })
    if (data) {
      setNotiType('setting')
      setTimeout(() => {
        setNotiState(true)
      }, 300)
    }
    if (errorMessage) {
      setErrorMessage(errorMessage)
      setNotiType('fail setting')
      setTimeout(() => {
        setNotiState(true)
      }, 300)
    }
  }

  return (
    <>
      {notiType === 'setting' && (
        <Notification text="設定成功" type="success" notiState={notiState} />
      )}
      {notiType === 'fail setting' && (
        <Notification text="設定失敗" type="failed" notiState={notiState} />
      )}
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
    </>
  )
}

export default SettingPage
