//雪央
import styles from "./AuthInput.module.scss";

const AuthInput = ({ inputLabel, type, placeholder, value, onChange }) => {
  return (
    <>
      <div className={styles.AuthInputContainer}>
        <div className={styles.InputLabel}>{inputLabel}</div>
        <input
          className={styles.AuthInput}
          // Jasmine 新增 || onChange 取得 input 輸入值
          type={type || "text"}
          placeholder={placeholder || ""}
          value={value || ""}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </div>
      <div className={styles.BottomLine}></div>
    </>
  );
};

export default AuthInput;
