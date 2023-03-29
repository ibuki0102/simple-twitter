import styles from '../Notification/Notification.module.scss'
import { ReactComponent as NotiBlue } from 'assets/icons/noti_blue.svg'
import { ReactComponent as NotiGreen } from 'assets/icons/noti_green.svg'
import { ReactComponent as NotiRed } from 'assets/icons/noti_red.svg'
import { ReactComponent as NotiYellow } from 'assets/icons/noti_yellow.svg'

const Notification = ({ text, type, notiState }) => {
  return (
    <div
      className={notiState ? styles.ActiveNotiContainer : styles.NotiContainer}
    >
      <span className={styles.Context}>{text}</span>
      {type === 'warning' && <NotiYellow className={styles.NotiYellow} />}
      {type === 'info' && <NotiBlue className={styles.NotiBlue} />}
      {type === 'success' && <NotiGreen className={styles.NotiGreen} />}
      {type === 'failed' && <NotiRed className={styles.NotiRed} />}
    </div>
  )
}

export default Notification
