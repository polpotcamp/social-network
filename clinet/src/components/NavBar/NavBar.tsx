import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAppSelector } from "../../hooks/redux";
function NavBar() {
  const id = useAppSelector((store) => store.userReducer.userId);
  return (
    <div className={`${styles.NavBar}`}>
      <Link className={`${styles.Link}`} to={`/user/${id}`}>Моя страница </Link>
      <Link className={`${styles.Link}`} to={"/"}>Новости</Link>
      <Link className={`${styles.Link}`} to={"/conversations"}>Сообщения</Link>
      <Link className={`${styles.Link}`} to={"/users"}>Пользователи</Link>
      <Link className={`${styles.Link}`} to={"/friends"}>Друзья</Link>
    </div>
  );
}
export default NavBar;
