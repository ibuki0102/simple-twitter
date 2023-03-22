// Jasmine

import styles from "./OtherTweetPage.module.scss";

import Sidebar from "components/Sidebar/Sidebar";
import OtherUserPostList from "components/OtherUserPostList/OtherUserPostList";
import PopularUserList from "components/PopularUserList/PopularUserList";

const OtherTweetPage = () => {
  return (
    <div className={styles.OtherTweetPageContainer}>
      <Sidebar />
      <OtherUserPostList />
      <PopularUserList />
    </div>
  );
};

export default OtherTweetPage;
