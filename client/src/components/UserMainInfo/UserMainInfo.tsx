import { FC, useEffect, useState, useCallback } from "react";
import styles from "./UserMainInfo.module.css";
import axios from "axios";
import { useAppSelector } from "../../hooks/redux";
import { useParams, useNavigate } from "react-router-dom";
import { TConversation, TPost, TUser } from "../../utils/types";
import PostItem from "../PostItem/PostItem";
const UserMainInfo: FC = () => {
  const params = useParams();
  const [user, setUser] = useState<TUser | null>(null);
  const [posts, setPosts] = useState<Array<TPost>>([]);
  const navigate = useNavigate();
  const myId = useAppSelector((state) => state.userReducer.userId);
  const fetchUser = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:5000/user/${params.id}`);
    setUser(data.data);
  }, [params.id]);
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/posts/user/${params.id}`
    );
    setPosts(data);
  }, [params.id]);
  const addUserToFollowers = async () => {
    await axios.post(
      `http://localhost:5000/user/addToFoll`,
      {
        follower: myId,
        person: user?._id,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token") as string),
        },
      }
    );
    fetchUser();
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);
  const status = () => {
    if (user?.followers.includes(myId)) {
      return <p>Вы подписанны</p>;
    } else if (user?.friends.includes(myId)) {
      return <div></div>;
    } else {
      return (
        <button className={`${styles.Button}`} onClick={addUserToFollowers}>
          Добавить в друзья
        </button>
      );
    }
  };
  const toConversation = async () => {
    const data = await axios.get(
      `http://localhost:5000/conversations/find/:${myId}/:${user?._id}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token") as string),
        },
      }
    );
    navigate(`/messenger/:${data.data._id}`);
    console.log(data);
  };
  return user !== null ? (
    <div className={`${styles.Column}`}>
      <div className={`${styles.Container}`}>
        <img
          src={`http://localhost:5000/${user.avatar}`}
          alt=""
          className={`${styles.Image}`}
        />
        <div className={`${styles.Info}`}>
          <p
            className={`${styles.Name}`}
          >{`${user.name} ${user.secondName}`}</p>
          <p className={`${styles.About}`}>О себе: {user.about}</p>
          {user._id !== myId ? (
            <div className={`${styles.Buttons}`}>
              {status()}
              <button className={`${styles.Button}`} onClick={toConversation}>
                Написать сообщение
              </button>
            </div>
          ) : (
            <div>
              <button className={`${styles.Button}`}>Редактировать</button>
            </div>
          )}
        </div>
      </div>
      <h2 className={`${styles.NameColumn}`}>
        {user._id === myId ? "Мои посты" : "Посты пользователя"}
      </h2>
      <div className={`${styles.Posts}`}>
        {posts?.map((post, idx) => (
          <PostItem key={idx} post={post} />
        ))}
      </div>
    </div>
  ) : null;
};
export default UserMainInfo;
