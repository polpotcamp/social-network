import React, { FormEvent } from "react";
import styles from "./RegistrationForm.module.css";
import { registration } from "../../services/async/Registration";
import { useAppDispatch } from "../../hooks/redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [secondName, setSecondName] = React.useState("");
  const [image, setImage] = React.useState<null | File>(null);
  const [about, setAbout] = React.useState("");
  const navigate = useNavigate();
  const registrationUser = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("secondName", secondName);
    formData.append("about", about);
    if(image){
    formData.append("avatar", image);
    }
  
    dispatch(registration(formData));
    navigate("/login");
  };
  return (
    <div className={`${styles.Container}`}>
      <h2 className={`${styles.text}`}>Зарегистрироваться</h2>
      <form className={`${styles.form}`} onSubmit={registrationUser}>
        <input
          type="email"
          placeholder="введите email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input}`}
        />
        <input
          type="password"
          placeholder="введите пароль"
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input}`}
        />
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="введите ваше имя"
          className={`${styles.input}`}
        />
        <input
          type="text"
          onChange={(e) => setSecondName(e.target.value)}
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
        <input
          type="text"
          onChange={(e) => setAbout(e.target.value)}
          placeholder="введите информацию о себе"
          className={`${styles.input}`}
        />
        <button type="submit">Зарегистрироваться</button>
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
