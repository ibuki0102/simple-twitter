// Jasmine

import styles from "../TweetList/TweetList.module.scss";
import { ReactComponent as Photo } from "assets/icons/Photo.svg";

import TweetItemCollection from "components/TweetItemCollection/TweetItemCollection";

const TweetList = () => {
  return (
    <div className={styles.TweetListContainer}>
      <div className={styles.TweetListTopSection}>
        <h4>首頁</h4>
        <div className={styles.Post}>
          <Photo className={styles.Photo} />
          <h5>有什麼新鮮事？</h5>
        </div>
        <button>推文</button>
      </div>
      <TweetItemCollection />
    </div>
  );
};

export default TweetList;
