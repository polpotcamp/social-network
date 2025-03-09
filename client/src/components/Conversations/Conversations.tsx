import { FC, useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "./Conversation.module.css";
import ConversationItem from "../ConversationItem/ConversationItem";
import { useAppSelector } from "../../hooks/redux";
import { TConversation } from "../../utils/types";

const Conversations: FC = () => {
  const userId = useAppSelector((store) => store.userReducer.userId);
  const [conversations, setConversations] = useState<Array<TConversation>>();
  const fetchConversations = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/conversations/:${userId}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token") as string),
        },
      }
    );
    setConversations(data);
  }, []);
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);
  console.log(conversations)
  return (
    <div className={`${styles.Container}`}>
      {conversations?.map((conv, idx) => (
        <ConversationItem key={idx} conv={conv} />
      ))}
    </div>
  );
};
export default Conversations;
