//雪央
import styles from './AuthInput.module.scss'

const AuthInput = ({
  inputLabel,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
  name,
  onKeyDown,
}) => {
  let nameLengthExceed,
    hasNameValue,
    accountNotExist,
    accountOrPasswordWrong,
    wrongEmail,
    wrongCheckPassword,
    sameAccountExist,
    sameEmailExist,
    accountLengthExceed,
    hasAccountValue

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
  if (
    inputLabel === '帳號' &&
    errorMessage === 'AssertionError: 帳號不存在！'
  ) {
    accountNotExist = true
  }
  if (
    inputLabel === '密碼' &&
    errorMessage === 'AssertionError: 帳號或密碼輸入錯誤！'
  ) {
    accountOrPasswordWrong = true
  }
  if (errorMessage) {
    if (
      (inputLabel === '密碼確認' || inputLabel === '密碼再確認') &&
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
      (errorMessage === 'AssertionError: email 已重複註冊！' ||
        errorMessage === 'Error: Email 已存在！')
    ) {
      sameEmailExist = true
    }
    if (
      inputLabel === '帳號' &&
      (errorMessage === 'AssertionError: account 已重複註冊！' ||
        errorMessage === 'Error: Account 已存在!')
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
            accountLengthExceed ||
            accountOrPasswordWrong
              ? styles.ErrorAuthInput
              : styles.AuthInput
          }
          // Jasmine 新增 || onChange 取得 input 輸入值
          type={type || 'text'}
          placeholder={placeholder || ''}
          value={value || ''}
          name={name}
          onChange={name ? onChange : (event) => onChange?.(event.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className={styles.Tips}>
          {/* // 錯誤訊息的判定跟顯示 */}
          {nameLengthExceed && (
            <span className={styles.ErrorMessage}>字數超出上限！</span>
          )}
          {accountNotExist && (
            <span className={styles.ErrorMessage}>帳號不存在！</span>
          )}
          {accountOrPasswordWrong && (
            <span className={styles.ErrorMessage}>帳號或密碼輸入錯誤！</span>
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
