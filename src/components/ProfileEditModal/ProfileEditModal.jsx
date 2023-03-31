import styles from '../ProfileEditModal/ProfileEditModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'
import { ReactComponent as WhiteCross } from 'assets/icons/white_cross.svg'
import { ReactComponent as AddPhoto } from 'assets/icons/add_photo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import InputTextArea from 'components/InputTextArea/InputTextArea'
import { editUserProfile } from 'api/setting'
import { useState, useEffect, useContext } from 'react'
import defaultBanner from 'assets/images/default_banner.png'
import { NotiContext } from 'contexts/NotiContext'
import { NotiTypeContext } from 'contexts/NoitTypeContext'
import { ErrorMessageContext } from 'contexts/ErrorMessageContext'
import Notification from 'components/Notification/Notification'

const ProfileEditModal = ({ userData, setProfileModalState }) => {
  const { name, avatar, cover, introduction } = userData
  const [coverDataURL, setCoverDataURL] = useState(null)
  const [avatarDataURL, setAvatarDataURL] = useState(null)
  const [defaultCover, setDefaultCover] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)
  const [notiState, setNotiState] = useContext(NotiContext)
  const setNotiType = useContext(NotiTypeContext)[1]
  const [editUserData, setEditUserData] = useState({
    name: name,
    avatar: '',
    cover: '',
    introduction: introduction || '',
  })
  // 雪央新增: 如果input有更動就更新editUserData
  const handleInputChange = (event) => {
    const targetName = event.target.name
    if (targetName === 'name' || targetName === 'introduction') {
      setEditUserData({
        ...editUserData,
        [event.target.name]: event.target.value,
      })
    }
    if (targetName === 'cover') {
      setEditUserData({
        ...editUserData,
        [event.target.name]: event.target.files[0],
      })
      setDefaultCover('')
    }
    if (targetName === 'avatar') {
      setEditUserData({
        ...editUserData,
        [event.target.name]: event.target.files[0],
      })
    }
  }

  const handleResetCover = (event) => {
    setDefaultCover('')
    event.target.value = null
    setDefaultCover(defaultBanner)
  }

  const handleSaveButton = async () => {
    setErrorMessage('')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    let payload = {
      token,
      userId,
      name: editUserData.name,
      introduction: editUserData.introduction,
      avatar: editUserData.avatar,
    }
    if (
      editUserData.introduction.length > 160 ||
      editUserData.name.length > 50 ||
      editUserData.name.length === 0
    ) {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setNotiType('editProfile')
      return setErrorMessage('error')
    }
    if (defaultCover) {
      payload = { ...payload, cover: null }
    } else if (cover) {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setNotiType('editProfile')
      setLoading(false)
      setProfileModalState(false)
      return
    } else if (editUserData.cover) {
      payload = { ...payload, cover: editUserData.cover }
    }
    setLoading(true)
    const { data, errorMessage } = await editUserProfile({ payload })
    if (data) {
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setNotiType('editProfile')
      setLoading(false)
      setProfileModalState(false)
    }
    if (errorMessage) {
      setLoading(false)
      setTimeout(() => {
        setNotiState(true)
      }, 300)
      setNotiType('editProfile')
      setErrorMessage(errorMessage)
    }
  }
  // 雪央註: 這段程式碼目前我也看不太懂，但它可以做到上傳就可以預覽的效果
  useEffect(() => {
    let fileReader,
      isCancel = false
    if (editUserData.cover) {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result && !isCancel) {
          setCoverDataURL(result)
        }
      }
      fileReader.readAsDataURL(editUserData.cover)
    }
    if (editUserData.avatar) {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result && !isCancel) {
          setAvatarDataURL(result)
        }
      }
      fileReader.readAsDataURL(editUserData.avatar)
    }
    if (notiState) {
      setTimeout(() => {
        setNotiState(false)
      }, 2500)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [editUserData.cover, editUserData.avatar, notiState, setNotiState])
  return (
    <>
      {errorMessage && (
        <Notification text="編輯失敗" type="failed" notiState={notiState} />
      )}
      <div className={styles.Overlay}>
        {loading && <div className={styles.Loading}>更新中請稍後...</div>}
        <div className={styles.Container}>
          <div className={styles.HeaderContainer}>
            <OrangeCross
              className={styles.Close}
              onClick={() => setProfileModalState(false)}
            />
            <div className={styles.Header}>
              <div className={styles.Title}>編輯個人資料</div>
              <button className={styles.SaveButton} onClick={handleSaveButton}>
                儲存
              </button>
            </div>
          </div>
          <div className={styles.MainContainer}>
            <div className={styles.CoverContainer}>
              {coverDataURL && !defaultCover ? (
                <img src={coverDataURL} className={styles.Cover} alt="cover" />
              ) : null}
              {!coverDataURL && !defaultCover && cover ? (
                <img src={cover} className={styles.Cover} alt="cover" />
              ) : null}
              {defaultCover && (
                <img src={defaultCover} className={styles.Cover} alt="cover" />
              )}
              {!cover && !coverDataURL && !defaultCover ? (
                <img
                  src="https://i.imgur.com/jXE6Mmp.png"
                  className={styles.Cover}
                  alt="cover"
                />
              ) : null}
              <div className={styles.CoverIcons}>
                <label htmlFor="cover-upload" className="custom-file-upload">
                  <AddPhoto className={styles.CoverIcon} />
                </label>
                <input
                  id="cover-upload"
                  type="file"
                  name="cover"
                  accept=".png, .jpg, .jpeg"
                  onChange={(event) => handleInputChange(event)}
                />
                <WhiteCross
                  className={styles.CoverIcon}
                  name="reset-cover"
                  onClick={handleResetCover}
                />
              </div>
            </div>
            <div className={styles.Main}>
              <div className={styles.BlackBg}></div>
              <div className={styles.AddAvatarPhoto}>
                <label htmlFor="avatar-upload" className="custom-file-upload">
                  <AddPhoto className={styles.Icon} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              {avatarDataURL ? (
                <img
                  src={avatarDataURL}
                  className={styles.Avatar}
                  alt="avatar"
                />
              ) : (
                <img src={avatar} className={styles.Avatar} alt="avatar" />
              )}
              <div className={styles.InputGroupContainer}>
                <AuthInput
                  inputLabel="名稱"
                  type="text"
                  value={editUserData.name}
                  name="name"
                  onChange={(event) => handleInputChange(event)}
                />
                <InputTextArea
                  inputLabel="自我介紹"
                  type="text"
                  value={editUserData.introduction}
                  name="introduction"
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileEditModal
