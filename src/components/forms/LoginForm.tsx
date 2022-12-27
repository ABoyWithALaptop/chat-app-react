import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import { UserCredential } from "../../utils/types/types";
import { postLogging } from "../../utils/api";
import { useState } from "react";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredential>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: UserCredential) => {
    try {
      await postLogging(data);
      navigate("/conversations");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          id="email"
          type="text"
          {...register("email", { required: true })}
        />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">PassWord</InputLabel>
        <InputField
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
      </InputContainer>
      <Button className={styles.button}> Login</Button>
      <div className={styles.footerText}>
        <span>Don't have an account?</span>
        <Link to="/register">Register</Link>
      </div>
    </form>
  );
};
