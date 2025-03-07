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
export const UserItem: FC<UserItemProps> = ({ userId, type }) => {
  const [user, setUsers] = useState<TUser>();
  const myId = useAppSelector((store) => store.userReducer.userId);
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
    window.location.reload()
  };
  const fetchUser = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:5000/user/:${userId}`);
    setUsers(data.data);
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return user ? (
    <div className={`${styles.Container}`}>
      <Link to={`/user/${user._id}`}>
        <img
          src={`http://localhost:5000/${user.avatar}`}
          className={`${styles.Image}`}
          alt=""
        />
      </Link>
      <Link to={`/user/${user._id}`}>
        <p>{`${user.name} ${user.secondName}`}</p>
      </Link>
      {type === "follower" ? (
        <button className={`${styles.Button}`} onClick={addToFriends}>
          Добавить в друзья
        </button>
      ) : null}
    </div>
  ) : null;
};
