//雪央
import styles from './AuthInput.module.scss'

const AuthInput = ({ inputLabel, type, placeholder, value }) => {
  return (
    <>
      <div className={styles.AuthInputContainer}>
        <div className={styles.InputLabel}>{inputLabel}</div>
        <input
          className={styles.AuthInput}
          type={type}
          placeholder={placeholder}
          value={value}
        />
      </div>
      <div className={styles.BottomLine}></div>
    </>
  )
}

export default AuthInput
