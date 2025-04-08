import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Edit.module.css";
import { useState, useEffect } from "react";
import { ChangeUserData } from "../../services/async/ChangeUserData";
import { useNavigate } from "react-router-dom";
export const Edit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const startImage = useAppSelector((state) => state.userReducer.userAvatar);
  const id = useAppSelector((state) => state.userReducer.userId);
  const startName = useAppSelector((state) => state.userReducer.userName);
  const startSecondName = useAppSelector(
    (state) => state.userReducer.userSecondName
  );
  const startAbout = useAppSelector((state) => state.userReducer.userAbout);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState(startName);
  const [secondName, setSecondName] = useState(startSecondName);
  const [about, setAbout] = useState(startAbout);
  const [formValid, setFormValid] = useState<boolean>(false);
  const changeProfile = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("avatar", image);
    }
    formData.append("id", id);
    formData.append("name", name);
    formData.append("secondName", secondName);
    formData.append("about", about);
    await dispatch(ChangeUserData(formData));
    navigate(`/user/:${id}`);
  };
  useEffect(() => {
    if (
      image ||
      name !== startName ||
      secondName !== startSecondName ||
      about !== startAbout
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [image, name, secondName, about, startAbout, startSecondName, startName]);
  return (
    <div className={`${styles.Container}`}>
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt={image.name}
          className={`${styles.Image}`}
        />
      ) : (
        <img
          src={`http://localhost:5000/${startImage}`}
          alt=""
          className={`${styles.Image}`}
        />
      )}
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
        className={`${styles.Input}`}
        accept="image/png, image/gif, image/jpeg"
      />
      <input
        type="text"
        value={name}
        max={20}
        className={`${styles.Input}`}
        placeholder="новое имя"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        max={20}
        value={secondName}
        className={`${styles.Input}`}
        placeholder="новоя фамилия"
        onChange={(e) => setSecondName(e.target.value)}
      />
      <input
        type="text"
        value={about}
        max={100}
        className={`${styles.Input}`}
        placeholder="новое описание"
        onChange={(e) => setAbout(e.target.value)}
      />
      <button
        disabled={!formValid}
        className={`${styles.Button} ${!formValid ? styles.ButtonDisable : ""}`}
        onClick={changeProfile}
      >
        Сохранить
      </button>
    </div>
  );
};
