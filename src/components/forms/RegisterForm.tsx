import { Button, InputContainer, InputField, InputLabel } from "../../utils/styles"
import styles from './index.module.scss'


export const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <InputContainer>
        <InputLabel htmlFor="email">Label</InputLabel>
        <InputField id='email' type='text' />
      </InputContainer>

      <section className={styles.nameFieldRow}>
        <InputContainer className={styles.nameContainer}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField id='firstName' type='text' />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField id='lastName' type='text' />
        </InputContainer>
      </section>

      <InputContainer>
        <InputLabel htmlFor="password">PassWord</InputLabel>
        <InputField id='password' type='password' />
      </InputContainer>
      <Button className='button'> Create My Account</Button>
    </form>
  )
}