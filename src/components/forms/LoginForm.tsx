import { Link } from "react-router-dom";
import { Button, InputContainer, InputField, InputLabel } from "../../utils/styles"
import styles from './index.module.scss'


export const LoginForm = () => {


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <InputContainer>
        <InputLabel htmlFor="email">Label</InputLabel>
        <InputField id='email' type='text' />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">PassWord</InputLabel>
        <InputField id='password' type='password' />
      </InputContainer>
      <Button className={styles.button}> Login</Button>
      <div className={styles.footerText}>
        <span>
          Don't have an account?
        </span>
        <Link to='/register'>Register</Link>
      </div>
    </form>
  )
}