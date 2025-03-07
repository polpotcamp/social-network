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
  const fetchUser = useCallback(async (userID:string) => {
    const { data } = await axios.get(`http://localhost:5000/user/${userID}`);
    setUser(data.data);
  }, []);
  useEffect(() => {
    const secUserId = conv.members.filter((item) => item !== userId);
    fetchUser(secUserId[0]);
  }, [fetchUser]);
  return (
    user?
    <Link to={`/messenger/:${conv._id}`} className={`${styles.Container}`}>
      <img src={`http://localhost:5000/${user.avatar}`} alt="" className={`${styles.Img}`} />
      <div className={`${styles.Info}`} >
        <p className={`${styles.Name}`}>{`${user.name} ${user.secondName}`}</p>
        <p>{user?.about}</p>
      </div>
    </Link>:null
  );
};
export default ConversationItem;
