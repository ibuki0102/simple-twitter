import styles from '../Notification/Notification.module.scss'
import { ReactComponent as NotiBlue } from 'assets/icons/noti_blue.svg'
import { ReactComponent as NotiGreen } from 'assets/icons/noti_green.svg'
import { ReactComponent as NotiRed } from 'assets/icons/noti_red.svg'
import { ReactComponent as NotiYellow } from 'assets/icons/noti_yellow.svg'

const Notification = () => {
  return (
    <div className={styles.NotiContainer}>
      <span className={styles.Context}>登入成功</span>
      {/* <NotiYellow className={styles.NotiYellow} /> */}
      {/* <NotiBlue className={styles.NotiBlue} /> */}
      {/* <NotiGreen className={styles.NotiGreen} /> */}
      <NotiRed className={styles.NotiRed} />
    </div>
  )
}

export default Notification
