// Jasmine

import styles from "components/TweetItem/TweetItem.module.scss";
import { ReactComponent as DefaultAvatar } from "assets/icons/default_avatar.svg";
import { ReactComponent as Reply } from "assets/icons/reply.svg";
import { ReactComponent as Like } from "assets/icons/like.svg";

const TweetItem = () => {
  return (
    <div className={styles.TweetItemContainer}>
      <DefaultAvatar className={styles.DefaultAvatar} />
      <div className={styles.Tweet}>
        <span className={styles.UserName}>Apple</span>
        <span className={styles.UserAcount}>@apple・3 小時</span>
        <div className={styles.TweetContent}>
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
        <div className={styles.Icon}>
          <div className={styles.Message}>
            <Reply className={styles.Reply} />
            <span className={styles.Number}>13</span>
          </div>
          <div className={styles.Heart}>
            <Like className={styles.Like} />
            <span className={styles.Number}>76</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
