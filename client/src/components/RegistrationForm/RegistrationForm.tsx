import React, { FormEvent } from "react";
import styles from "./RegistrationForm.module.css";
import { registration } from "../../services/async/Registration";
import { useAppDispatch } from "../../hooks/redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState("");
  const [nameDirty, setNameDirty] = React.useState<boolean>(false);
  const [nameError, setNameError] = React.useState<string>(
    "Имя не должено быть пустым"
  );
  const [password, setPassword] = React.useState("");
  const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<string>(
    "Пароль не должен быть пустым"
  );
  const [email, setEmail] = React.useState("");
  const [emailDirty, setEmailDirty] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>(
    "email не должен быть пустым"
  );
  const [secondName, setSecondName] = React.useState("");
  const [secondNameDirty, setSecondNameDirty] = React.useState<boolean>(false);
  const [secondNameError, setSecondNameError] = React.useState<string>(
    "фамилия не должена быть пустой"
  );
  const [image, setImage] = React.useState<null | File>(null);
  const [about, setAbout] = React.useState("");
  const [aboutDirty, setAboutDirty] = React.useState<boolean>(false);
  const [aboutError, setAboutError] = React.useState<string>(
    "описание не должено быть пустым"
  );
  const [formValid, setFormValid] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setNameError("Имя не должено быть пустым");
    } else {
      setNameError("");
    }
  };
  const secondNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setSecondNameError("фамилия не должена быть пустой");
    } else {
      setSecondNameError("");
    }
  };
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
  const aboutHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setAboutError("Описание не должено быть пустым");
    } else {
      setAboutError("");
    }
  };
  const blurHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "secondName":
        setSecondNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "about":
        setAboutDirty(true);
    }
  };
  const registrationUser = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("secondName", secondName);
    formData.append("about", about);
    if (image) {
      formData.append("avatar", image);
    }
    dispatch(registration(formData));
    navigate("/login");
  };
  React.useEffect(() => {
    if (
      nameError ||
      secondNameError ||
      passwordError ||
      emailError ||
      aboutError ||
      image === null
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    nameError,
    secondNameError,
    passwordError,
    emailError,
    aboutError,
    image,
  ]);
  return (
    <div className={`${styles.Container}`}>
      <h2 className={`${styles.text}`}>Зарегистрироваться</h2>
      <form className={`${styles.form}`} onSubmit={registrationUser}>
        {emailDirty && emailError && (
          <p className={styles.Error}>{emailError}</p>
        )}
        <input
          onBlur={blurHandler}
          name="email"
          type="email"
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
          type="password"
          placeholder="введите пароль"
          onChange={(e) => passwordHandler(e)}
          className={`${styles.input}`}
        />
        {nameDirty && nameError && <p className={styles.Error}>{nameError}</p>}
        <input
          onBlur={blurHandler}
          name="name"
          type="text"
          onChange={(e) => nameHandler(e)}
          placeholder="введите ваше имя"
          className={`${styles.input}`}
        />
        {secondNameDirty && secondNameError && (
          <p className={styles.Error}>{secondNameError}</p>
        )}
        <input
          onBlur={blurHandler}
          name="secondName"
          type="text"
          onChange={(e) => secondNameHandler(e)}
          placeholder="введите вашу фамилию"
          className={`${styles.input}`}
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            } else {
              setImage(null);
            }
          }}
          placeholder="загрузите фото"
          className={`${styles.input}`}
          accept="image/png, image/gif, image/jpeg"
        />
        <>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className={`${styles.Image}`}
            />
          )}
        </>
        {aboutDirty && aboutError && (
          <p className={styles.Error}>{aboutError}</p>
        )}
        <input
          onBlur={blurHandler}
          name="about"
          type="text"
          onChange={(e) => aboutHandler(e)}
          placeholder="введите информацию о себе"
          className={`${styles.input}`}
        />
        <button
          type="submit"
          className={`${styles.Button} ${
            !formValid ? styles.ButtonDisable : ""
          }`}
          disabled={!formValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className={`${styles.Links}`}>
        <h2 className={`${styles.text}`}>Уже зарегистрированы?</h2>
        <Link to={"/login"} className={`${styles.Link}`}>
          Войти
        </Link>
      </div>
    </div>
  );
};
export default RegistrationForm;
