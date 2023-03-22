// Jasmine

import styles from "components/OtherUserPostList/OtherUserPostList.module.scss";
import { ReactComponent as Back } from "assets/icons/back.svg";
import { ReactComponent as Photo } from "assets/icons/OtherBig_Photo.svg";
import { ReactComponent as Mail } from "assets/icons/message.svg";
import { ReactComponent as Bell } from "assets/icons/noti.svg";

import TweetItemCollection from "components/TweetItemCollection/TweetItemCollection";

const OtherUserPostList = () => {
  return (
    <div className={styles.UserPostListContainer}>
      <div className={styles.UserPostListTopSection}>
        <div className={styles.Return}>
          <Back />
          <div className={styles.UserName}>
            <h5 className={styles.Name}>Jane Cathy</h5>
            <div className={styles.TweetCount}>45 推文</div>
          </div>
        </div>
        <img
          src="https://i.imgur.com/kyJHtl4.png"
          className={styles.Banner}
          alt="banner"
        />
        <Photo className={styles.Photo} />
        <Mail className={styles.Mail} />
        <Bell className={styles.Bell} />
        <button>正在跟隨</button>

        <div className={styles.UserIntroduction}>
          <div className={styles.User}>
            <h5 className={styles.UserName}>Jane Cathy</h5>
            <div className={styles.UserAcount}>@iamjane1999</div>
          </div>
          <div className={styles.Introduction}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </div>
          <div className={styles.Follow}>
            <div className={styles.Following}>
              <div className={styles.Number}>231個</div>
              <div className={styles.Text}>跟隨中</div>
            </div>
            <div className={styles.Follower}>
              <div className={styles.Number}>45位</div>
              <div className={styles.Text}>跟隨者</div>
            </div>
          </div>
        </div>
        <div className={styles.Heading}>
          <div className={`${styles.Title} ${styles.Active}`}>推文</div>
          <div className={styles.Title}>回覆</div>
          <div className={styles.Title}>喜歡的內容</div>
        </div>
      </div>
      <TweetItemCollection />
    </div>
  );
};

export default OtherUserPostList;
