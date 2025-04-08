import { FC, useState, useCallback, useEffect } from "react";
import { TUser } from "../../utils/types";
import styles from "./UserItem.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import axios from "axios";
interface UserItemProps {
  userId: string;
  type?: string;
}
export const UserItem: FC<UserItemProps> = ({ userId }) => {
  const [user, setUser] = useState<TUser>();
  const myId = useAppSelector((store) => store.userReducer.userId);
  const myFollowers =useAppSelector((store)=> store.userReducer.userFollowers)
  const addToFriends = async () => {
    await axios.post(
      `http://localhost:5000/user/addToFriend`,
      {
        person: myId,
        follower: user?._id,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token") as string),
        },
      }
    );
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/user/:${userId}`
        );
        setUser(data.data); 
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error);

      }
    };

    fetchUser();
  }, [userId]);
  return user ? (
    <Link to={`/user/${user._id}`} className={`${styles.Container}`}>
      <img
        src={`http://localhost:5000/${user.avatar}`}
        className={`${styles.Image}`}
        alt=""
      />
      <p className={`${styles.Name}`}>{`${user.name} ${user.secondName}`}</p>
      {myFollowers.includes(user._id) ? (
        <button className={`${styles.Button}`} onClick={addToFriends}>
          Добавить в друзья
        </button>
      ) : null}
    </Link>
  ) : null;
};
