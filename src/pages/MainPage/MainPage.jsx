// Jasmine

import styles from "./MainPage.module.scss";

import Sidebar from "components/Sidebar/Sidebar";
import TweetList from "components/TweetList/TweetList";
import PopularUserList from "components/PopularUserList/PopularUserList";

const MainPage = () => {
  return (
    <div className={styles.MainPageContainer}>
      <Sidebar />
      <TweetList />
      <PopularUserList />
    </div>
  );
};

export default MainPage;
