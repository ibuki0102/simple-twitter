import styles from '../ProfileEditModal/ProfileEditModal.module.scss'
import { ReactComponent as OrangeCross } from 'assets/icons/orange_cross.svg'
import { ReactComponent as WhiteCross } from 'assets/icons/white_cross.svg'
import { ReactComponent as AddPhoto } from 'assets/icons/add_photo.svg'
import AuthInput from 'components/AuthInput/AuthInput'
import InputTextArea from 'components/InputTextArea/InputTextArea'

const ProfileEditModal = ({ userData }) => {
  const { name, avatar, cover, introduction } = userData
  return (
    <div className={styles.Overlay}>
      <div className={styles.Container}>
        <div className={styles.HeaderContainer}>
          <OrangeCross className={styles.Close} />
          <div className={styles.Header}>
            <div className={styles.Title}>編輯個人資料</div>
            <button className={styles.SaveButton}>儲存</button>
          </div>
        </div>
        <div className={styles.MainContainer}>
          <div className={styles.CoverContainer}>
            <img src={cover} className={styles.Cover} alt="cover" />
            <div className={styles.CoverIcons}>
              <AddPhoto className={styles.CoverIcon} />
              <WhiteCross className={styles.CoverIcon} />
            </div>
          </div>
          <div className={styles.Main}>
            <div className={styles.BlackBg}></div>
            <div className={styles.AddAvatarPhoto}>
              <AddPhoto />
            </div>
            <img src={avatar} className={styles.Avatar} alt="avatar" />
            <div className={styles.InputGroupContainer}>
              <AuthInput inputLabel="名稱" type="text" value={name} />
              <InputTextArea
                inputLabel="自我介紹"
                type="text"
                value={introduction}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditModal
