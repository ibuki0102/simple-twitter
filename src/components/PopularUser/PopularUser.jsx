// Jasmine

import styles from "components/PopularUser/PopularUser.module.scss";
import { ReactComponent as DefaultAvatar } from "assets/icons/default_avatar.svg";

const PopularUser = () => {
  return (
    <div className={styles.PopularUserContainer}>
      <DefaultAvatar className={styles.DefaultAvatar} />
      <div className={styles.PopularUserName}>
        <div className={styles.UserName}>Pizza Hut</div>
        <div className={styles.UserAcount}>@pizzahut</div>
      </div>
      <button>正在跟隨</button>
    </div>
  );
};

export default PopularUser;
