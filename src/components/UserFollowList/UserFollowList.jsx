// Jasmine

import styles from "components/UserFollowList/UserFollowList.module.scss";
import { ReactComponent as Back } from "assets/icons/back.svg";

import UserFollowItem from "components/UserFollowItem/UserFollowItem";

const UserFollowList = () => {
  return (
    <div className={styles.UserFollowListContainer}>
      <div className={styles.UserFollowListTopSection}>
        <div className={styles.Return}>
          <Back />
          <div className={styles.UserName}>
            <h5 className={styles.Name}>John Doe</h5>
            <div className={styles.TweetCount}>25 推文</div>
          </div>
        </div>
        <div className={styles.Heading}>
          <div className={`${styles.Title} ${styles.Active}`}>追隨者</div>
          <div className={styles.Title}>正在追隨</div>
        </div>
      </div>
      <UserFollowItem />
      <UserFollowItem />
      <UserFollowItem />
      <UserFollowItem />
      <UserFollowItem />
      <UserFollowItem />
      <UserFollowItem />
    </div>
  );
};

export default UserFollowList;
