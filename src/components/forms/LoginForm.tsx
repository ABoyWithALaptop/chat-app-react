import { Link } from "react-router-dom";
import { Button, InputContainer, InputField, InputLabel } from "../../utils/styles"
import styles from './index.module.scss'
import { useForm } from 'react-hook-form'


export const LoginForm = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm()

  const onSubmit = () => {
  }



  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email" >Email</InputLabel>
        <InputField id='email'
          type='text'

          {...register('email', { required: true })}
        />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">PassWord</InputLabel>
        <InputField id='password' type='password'
          {...register('password', { required: true })}
        />
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