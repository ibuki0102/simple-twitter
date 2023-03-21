// Jasmine

import styles from "components/PopularUserList/PopularUserList.module.scss";

import PopularUser from "components/PopularUser/PopularUser";

const PopularUserList = () => {
  return (
    <div className={styles.PopularUserListContainer}>
      <h4>推薦跟隨</h4>
      <div className={styles.PopularUserContainer}>
        <PopularUser />
        <PopularUser />
        <PopularUser />
        <PopularUser />
        <PopularUser />
        <PopularUser />
        <PopularUser />
        <PopularUser />
      </div>
    </div>
  );
};

export default PopularUserList;