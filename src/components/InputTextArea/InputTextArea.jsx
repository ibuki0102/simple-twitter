//雪央
import styles from '../InputTextArea/InputTextArea.module.scss'

const InputTextArea = ({
  inputLabel,
  type,
  placeholder,
  value,
  onChange,
  name,
}) => {
  let introductionLengthExceed, hasIntroductionValue
  if (inputLabel === '自我介紹' && value) {
    if (value.length > 160) {
      introductionLengthExceed = true
    } else if (value.length <= 160) {
      hasIntroductionValue = true
    }
  }
  return (
    <>
      <div className={styles.InputContainer}>
        <div className={styles.InputLabel}>{inputLabel}</div>
        <textarea
          className={
            introductionLengthExceed ? styles.ErrorTextArea : styles.TextArea
          }
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={name ? onChange : (event) => onChange(event.target.value)}
          name={name}
        ></textarea>
        {hasIntroductionValue && (
          <div className={styles.IntroductionValue}>{value.length}/160</div>
        )}
        {introductionLengthExceed && (
          <>
            <div className={styles.IntroductionValue}>{value.length}/160</div>
            <div className={styles.ErrorMessage}>字數超過上限！</div>
          </>
        )}
      </div>
    </>
  )
}

export default InputTextArea
