import { FC, useEffect, useState, useCallback } from "react";
import styles from "./MessegeItem.module.css";
import { format } from "timeago.js";
import { TMessage, TUser } from "../../utils/types";
import axios from "axios";
interface MessagerProps {
  message: TMessage;
}
const MessegeItem: FC<MessagerProps> = ({ message }) => {
  const [user, setUser] = useState<TUser>();
  const fetchUser = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/user/:${message.sender}`
    );
    setUser(data.data);
  }, [message.sender]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return user ? (
    <div className={`${styles.Container}`}>
      <img
        className={`${styles.Img}`}
        src={`http://localhost:5000/${user.avatar}`}
        alt=""
      />
      <div className={`${styles.Messager}`}>
        <div className={`${styles.MessagerTop}`}>
          <p
            className={`${styles.FullName}`}
          >{`${user.name} ${user.secondName}`}</p>
          <div className={`${styles.CreatedAt}`}>
            {format(message.createdAt)}
          </div>
        </div>
        <p className={`${styles.Text}`}>{message.text}</p>
      </div>
    </div>
  ) : null;
};
export default MessegeItem;
