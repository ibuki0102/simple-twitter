// 雪央

import styles from "./LoginPage.module.scss";
import Logo from "assets/icons/logo.svg";
import AuthInput from "components/AuthInput/AuthInput";

import { useState } from "react";
import { login } from "api/auth";

const LoginPage = () => {
  // Jasmine 新增 useState & handleClick
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const { success, token } = await login({
      account,
      password,
    });
  };

  return (
    <div className={styles.AuthContainer}>
      <img src={Logo} alt="logo" width="45px" />
      <h3 className={styles.Title}>登入 Alphitter</h3>
      <div className={styles.AuthInputGroup}>
        <AuthInput
          inputLabel={"帳號"}
          placeholder={"請輸入帳號"}
          value={account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <AuthInput
          inputLabel={"密碼"}
          type="password"
          placeholder={"請設定密碼"}
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </div>
      <button className={styles.AuthButtons} onClick={handleClick}>
        登入
      </button>
      <div className={styles.AuthLinkGroup}>
        <a href="/#" className={styles.AuthLink}>
          註冊
        </a>
        <span className={styles.Dot}>・</span>
        <a href="/#" className={styles.AuthLink}>
          後台登入
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
