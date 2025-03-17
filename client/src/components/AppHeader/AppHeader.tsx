import { FC, useEffect } from "react";
import styles from "./AppHeader.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/async/Logout";
const AppHeader: FC = () => {
  const avatar = useAppSelector((state) => state.userReducer.userAvatar);
  const id = useAppSelector((store) => store.userReducer.userId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const LogoutButton = () => {
    dispatch(logout())
    navigate("/login");
  };
  useEffect(() => {}, [avatar]);
  return (
    <header className={`${styles.Header}`}>
      <div className={`${styles.Container}`}>
        <div className={`${styles.Text}`}>Social Network</div>
        {!id ? (
          <div className={`${styles.Choise}`}>
            <Link to={"/registration"} className={`${styles.Link}`}>
              Регистрация
            </Link>
            <Link to={"/login"} className={`${styles.Link}`}>
              Войти
            </Link>
          </div>
        ) : (
          <div className={`${styles.Nav}`}>
            <Link to={"/createPost"} className={`${styles.Link}`}>
              Создать пост
            </Link>
            <Link to={`user/:${id}`}>
              <img
                src={`http://localhost:5000/${avatar}`}
                alt="img"
                className={`${styles.Img}`}
              />
            </Link>
            <button className={`${styles.LogOut}`} onClick={LogoutButton}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
export default AppHeader;
