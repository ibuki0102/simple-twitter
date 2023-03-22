// Jasmine

import styles from "components/ReplyList/ReplyList.module.scss";
import { ReactComponent as Back } from "assets/icons/back.svg";
import { ReactComponent as DefaultAvatar } from "assets/icons/default_avatar.svg";
import { ReactComponent as Reply } from "assets/icons/reply.svg";
import { ReactComponent as Like } from "assets/icons/like.svg";

import ReplyItemCollection from "components/ReplyItemCollection/ReplyItemCollection";

const ReplyList = () => {
  return (
    <div className={styles.ReplyListContainer}>
      <div className={styles.ReplyListTopSection}>
        <div className={styles.Heading}>
          <Back className={styles.Back} />
          <div>推文</div>
        </div>
        <div>
          <div className={styles.User}>
            <DefaultAvatar className={styles.DefaultAvatar} />
            <div className={styles.ReplyUser}>
              <div className={styles.UserName}>Apple</div>
              <div className={styles.UserAcount}>@apple</div>
            </div>
          </div>
          <div className={styles.TweetContent}>
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt.
          </div>
          <div className={styles.Time}>上午 10:05・2021年11月10日</div>
        </div>
        <div className={styles.ReplyAndLike}>
          <div>
            <span className={styles.Number}>34</span>
            <span className={styles.Context}>回覆</span>
          </div>
          <div>
            <span className={styles.Number}>808</span>
            <span className={styles.Context}>喜歡次數</span>
          </div>
        </div>
        <div className={styles.Icon}>
          <Reply className={styles.Reply} />
          <Like className={styles.Like} />
        </div>
      </div>
      <ReplyItemCollection />
    </div>
  );
};

export default ReplyList;
