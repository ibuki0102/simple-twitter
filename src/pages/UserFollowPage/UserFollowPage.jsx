// Jaasmine

import styles from "./UserFollowPage.module.scss";

import Sidebar from "components/Sidebar/Sidebar";
import PopularUserList from "components/PopularUserList/PopularUserList";
import UserFollowList from "components/UserFollowList/UserFollowList";

const UserFollowPage = () => {
  return (
    <div className={styles.UserFollowPageContainer}>
      <Sidebar />
      <UserFollowList />
      <PopularUserList />
    </div>
  );
};

export default UserFollowPage;
