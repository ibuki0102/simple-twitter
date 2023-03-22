// Jasmine

import styles from "components/UserFollowItem/UserFollowItem.module.scss";
import { ReactComponent as DefaultAvatar } from "assets/icons/default_avatar.svg";

const UserFollowItem = () => {
  return (
    <div className={styles.UserFollowItemContainer}>
      <DefaultAvatar className={styles.DefaultAvatar} />
      <div className={styles.Tweet}>
        <div className={styles.UserName}>Apple</div>
        <button>正在跟隨</button>
        <div className={styles.TweetContent}>
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
      </div>
    </div>
  );
};

export default UserFollowItem;
