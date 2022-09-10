import { InputContainer, InputField, InputLabel } from "../../utils/styles"
import styles from './index.module.scss'


export const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <InputContainer>
        hello
        <InputLabel>Label</InputLabel>
        <InputField />
      </InputContainer>

    </form>
  )
}