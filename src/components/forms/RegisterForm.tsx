import { Link } from "react-router-dom";
import { Button, InputContainer, InputField, InputLabel } from "../../utils/styles"
import styles from './index.module.scss'
import { useForm } from 'react-hook-form'


export const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm()

  console.log(errors)
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField id='email' type='text'
          {...register('email', { required: 'Email is required' })}
        />
      </InputContainer>

      <section className={styles.nameFieldRow}>
        <InputContainer className={styles.nameContainer}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField id='firstName' type='text'
            {...register('firstName', { required: 'First Name is required' })}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField id='lastName' type='text'
            {...register('lastName', { required: 'Last Name is required' })}
          />
        </InputContainer>
      </section>

      <InputContainer>
        <InputLabel htmlFor="password">PassWord</InputLabel>
        <InputField id='password' type='password'
          {...register('password', { required: 'Password is required' })}
        />
      </InputContainer>
      <Button className={styles.button}> Create My Account</Button>
      <div className={styles.footerText}>
        <span>
          Already have an account?
        </span>
        <Link to='/login'>Login</Link>
      </div>
    </form>
  )
}