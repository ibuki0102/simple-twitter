//雪央
import styles from './AuthInput.module.scss'

const AuthInput = ({
  inputLabel,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
}) => {
  let nameLengthExceed
  let hasNameValue
  let accountNotExist
  let wrongEmail
  let wrongCheckPassword
  let sameAccountExist
  let sameEmailExist
  let accountLengthExceed
  let hasAccountValue
  if (inputLabel === '名稱' && value) {
    if (value.length > 50) {
      nameLengthExceed = true
    }
    if (value !== '') {
      hasNameValue = true
    }
  }
  if (inputLabel === '帳號' && value) {
    if (value.length > 10) {
      accountLengthExceed = true
    }
    if (value !== '') {
      hasAccountValue = true
    }
  }
  // 雪央註: 要等後端設定帳戶不存在時回傳相關錯誤訊息
  // if (inputLabel === '帳號' && errorMessage) {
  //   accountNotExist = true
  // }
  if (errorMessage) {
    if (
      inputLabel === '密碼確認' &&
      errorMessage === 'AssertionError: 密碼與確認密碼不一致'
    ) {
      wrongCheckPassword = true
    }
    if (
      inputLabel === 'Email' &&
      errorMessage === 'AssertionError: Email格式錯誤'
    ) {
      wrongEmail = true
    }
    if (
      inputLabel === 'Email' &&
      errorMessage === 'AssertionError: email 已重複註冊！'
    ) {
      sameEmailExist = true
    }
    if (
      inputLabel === '帳號' &&
      errorMessage === 'AssertionError: account 已重複註冊！'
    ) {
      sameAccountExist = true
    }
  }
  return (
    <>
      <div className={styles.AuthInputContainer}>
        <div className={styles.InputLabel}>{inputLabel}</div>
        <input
          className={
            nameLengthExceed ||
            accountNotExist ||
            wrongCheckPassword ||
            wrongEmail ||
            sameEmailExist ||
            sameAccountExist ||
            accountLengthExceed
              ? styles.ErrorAuthInput
              : styles.AuthInput
          }
          // Jasmine 新增 || onChange 取得 input 輸入值
          type={type || 'text'}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={(event) => onChange?.(event.target.value)}
        />
        <div className={styles.Tips}>
          {/* // 錯誤訊息的判定跟顯示 */}
          {nameLengthExceed && (
            <span className={styles.ErrorMessage}>字數超出上限！</span>
          )}
          {hasNameValue ? (
            <span className={styles.InputValueLength}>{value.length}/50</span>
          ) : null}
          {accountLengthExceed ? (
            <span className={styles.ErrorMessage}>字數超出上限！</span>
          ) : null}
          {hasAccountValue ? (
            <span className={styles.InputValueLength}>{value.length}/10</span>
          ) : null}
          {wrongCheckPassword && (
            <span className={styles.ErrorMessage}>確認密碼與密碼不一致。</span>
          )}
          {wrongEmail && (
            <span className={styles.ErrorMessage}>Email 格式錯誤。</span>
          )}
          {sameEmailExist && (
            <span className={styles.ErrorMessage}>Email 已重複註冊！</span>
          )}
          {sameAccountExist && (
            <span className={styles.ErrorMessage}>Account 已重複註冊！</span>
          )}
        </div>
      </div>
    </>
  )
}

export default AuthInput
