//雪央
import styles from '../InputTextArea/InputTextArea.module.scss'

const InputTextArea = ({ inputLabel, type, placeholder, value, onChange }) => {
  return (
    <>
      <div className={styles.InputContainer}>
        <div className={styles.InputLabel}>{inputLabel}</div>
        <textarea
          className={styles.TextArea}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        ></textarea>
      </div>
      <div className={styles.BottomLine}></div>
    </>
  )
}

export default InputTextArea
