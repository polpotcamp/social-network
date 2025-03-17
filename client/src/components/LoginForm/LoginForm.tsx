import React, { FC, FormEvent } from "react";
import styles from "./LoginForm.module.css";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../services/async/Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LoginFrom: FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailDirty, setEmailDirty] = React.useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>(
    "email не должен быть пустым"
  );
  const [passwordError, setPasswordError] = React.useState<string>(
    "Пароль не должен быть пустым"
  );
  const [formValid, setFormValid] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setEmail(value);
    if (value.length === 0) {
      setEmailError("email не должен быть пустым");
    } else if (!re.test(String(value).toLocaleLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length === 0) {
      setPasswordError("Пароль не должен быть пустым");
    } else if (value.length < 3) {
      setPasswordError("Пароль должен быть длиннее 3 символов");
    } else {
      setPasswordError("");
    }
  };
  const blurHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  const loginUser = async (evt: FormEvent) => {
    evt.preventDefault();
    const dataUser = {
      email: email,
      password: password,
    };
    await dispatch(login(dataUser));
    navigate("/");
    window.location.reload();
  };
  React.useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);
  return (
    <div className={`${styles.Container}`}>
      <p className={`${styles.text}`}>Войти</p>
      <form className={`${styles.form}`} onSubmit={loginUser}>
        {emailDirty && emailError && (
          <p className={styles.Error}>{emailError}</p>
        )}
        <input
          onBlur={blurHandler}
          name="email"
          value={email}
          type="email"
          max={50}
          placeholder="введите email"
          onChange={(e) => emailHandler(e)}
          className={`${styles.input}`}
        />
        {passwordDirty && passwordError && (
          <p className={styles.Error}>{passwordError}</p>
        )}
        <input
          onBlur={blurHandler}
          name="password"
          max={30}
          value={password}
          type="password"
          placeholder="введите пароль"
          onChange={(e) => passwordHandler(e)}
          className={`${styles.input}`}
        />
        <button
          className={`${styles.Button} ${!formValid? styles.ButtonDisable: ''}`}
          type="submit"
          disabled={!formValid}
        >
          Войти
        </button>
      </form>
      <div className={`${styles.Links}`}>
        <p className={`${styles.text}`}>Нет акаунта?</p>
        <Link className={`${styles.Link}`} to={"/registration"}>Зарегистрироваться</Link>
      </div>
    </div>
  );
};
export default LoginFrom;
