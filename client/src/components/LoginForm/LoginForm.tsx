import React, { FC, FormEvent, useRef } from "react";
import styles from "./LoginForm.module.css";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../services/async/Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LoginFrom: FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const loginUser = async (evt: FormEvent) => {
    evt.preventDefault();
    const dataUser = {
      email: email,
      password: password,
    };
     await dispatch(login(dataUser));
    navigate('/')
    window.location.reload()
  };
  return (
    <div className={`${styles.Container}`}>
      <p className={`${styles.text}`}>Войти</p>
      <form className={`${styles.form}`} onSubmit={loginUser}>
        <input
          type="email"
          placeholder="введите email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input}`}
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="введите пароль"
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input}`}
          ref={passwordRef}
        />
        <button type="submit">войти </button>
      </form>
      <div className={`${styles.Links}`}>
        <p className={`${styles.text}`}>нет акаунта?</p>
        <Link to={'/'}>Зарегистрироваться</Link>
      </div>
    </div>
  );
};
export default LoginFrom;
