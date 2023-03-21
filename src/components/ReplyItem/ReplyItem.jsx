// Jasmine

import styles from "components/ReplyItem/ReplyItem.module.scss";
import { ReactComponent as DefaultAvatar } from "assets/icons/default_avatar.svg";

const ReplyItem = () => {
  return (
    <div className={styles.ReplyItemContainer}>
      <div className={styles.ReplyUser}>
        <DefaultAvatar className={styles.DefaultAvatar} />
        <div className={styles.Reply}>
          <span className={styles.UserName}>Devon Lane</span>
          <span className={styles.UserAcount}>@devon_lane・12 小時</span>
          <div className={styles.ReplyAndTag}>
            <span className={styles.ReplyText}>回覆</span>
            <span className={styles.Tag}>@apple</span>
          </div>
        </div>
      </div>
      <div className={styles.ReplyContent}>
        former apple engineer shares a simple DIY fix to seal your surgical mask
      </div>
    </div>
  );
};

export default ReplyItem;
