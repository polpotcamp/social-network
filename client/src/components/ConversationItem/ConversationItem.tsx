import { FC, useEffect, useState, useCallback } from "react";
import styles from "./ConversationItem.module.css";
import { TConversation, TUser } from "../../utils/types";
import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import axios from "axios";
interface ConversationItemProps {
  conv: TConversation;
}
const ConversationItem: FC<ConversationItemProps> = ({ conv }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const userId = useAppSelector((store) => store.userReducer.userId);
  useEffect(() => {
    const secUserId = conv.members.filter((item: string) => item !== userId);

    const fetchUser = async (userID: string) => {
      try {
        const { data } = await axios.get(`http://localhost:5000/user/${userID}`);
        setUser(data.data);
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error);

      }
    };

    fetchUser(secUserId[0]);
  }, [userId, conv]);
  return user ? (
    <div className={`${styles.Container}`}>
      <Link to={`/messenger/:${conv._id}`} className={`${styles.Link}`}>
        <img
          src={`http://localhost:5000/${user.avatar}`}
          alt=""
          className={`${styles.Img}`}
        />
        <div className={`${styles.Info}`}>
          <p
            className={`${styles.Name}`}
          >{`${user.name} ${user.secondName}`}</p>
        </div>
      </Link>{" "}
    </div>
  ) : null;
};
export default ConversationItem;
