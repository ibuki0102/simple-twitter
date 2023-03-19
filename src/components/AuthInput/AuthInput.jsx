//雪央
import styles from './AuthInput.module.scss'

const AuthInput = ({ inputLabel, type, placeholder }) => {
  return (
    <>
      <div className={styles.AuthInputContainer}>
        <div className={styles.InputLabel}>{inputLabel}</div>
        <input
          className={styles.AuthInput}
          type={type}
          placeholder={placeholder}
        />
      </div>
      <div className={styles.BottomLine}></div>
    </>
  )
}

export default AuthInput
