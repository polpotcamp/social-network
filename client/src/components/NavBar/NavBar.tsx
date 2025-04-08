import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAppSelector } from "../../hooks/redux";
import burger from "../../Images/burger.png";
import { useState } from "react";
function NavBar() {
  const id = useAppSelector((store) => store.userReducer.userId);
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className={`${styles.NavBar}`}>
      <div className={active ? `${styles.Links}` : `${styles.LinksNone}`}>
        <Link className={`${styles.Link}`} to={`/user/${id}`}>
          Моя страница
        </Link>
        <Link className={`${styles.Link}`} to={"/"}>
          Новости
        </Link>
        <Link className={`${styles.Link}`} to={"/conversations"}>
          Сообщения
        </Link>
        <Link className={`${styles.Link}`} to={"/users"}>
          Пользователи
        </Link>
        <Link className={`${styles.Link}`} to={"/friends"}>
          Друзья
        </Link>
      </div>
      <div className={`${styles.Burger}`} onClick={() => setActive(!active)}>
        <img src={burger} alt="" className={`${styles.Img}`} />
      </div>
    </div>
  );
}
export default NavBar;
