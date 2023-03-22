// Jasmine

import styles from "pages/UserTweetPage/UserTweetPage.module.scss";

import Sidebar from "components/Sidebar/Sidebar";
import UserPostList from "components/UserPostList/UserPostList";
import PopularUserList from "components/PopularUserList/PopularUserList";

const UserTweetPage = () => {
  return (
    <div className={styles.UserTweetPageContainer}>
      <Sidebar />
      <UserPostList />
      <PopularUserList />
    </div>
  );
};

export default UserTweetPage;
