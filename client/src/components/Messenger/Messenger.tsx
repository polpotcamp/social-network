import { useEffect, useState, useRef } from "react";
import styles from "./Messenger.module.css";
import MessegeItem from "../MessegeItem/MessegeItem";
import { TConversation, TMessage } from "../../utils/types";
import { useAppSelector } from "../../hooks/redux";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DefaultEventsMap } from "socket.io";
import rightArrow from "../../Images/right-arrow.svg";
const Messager = () => {
  const ChatId = useParams().id?.slice(1);
  const [currentChat, setCurrentChat] = useState<TConversation | null>(null);
  const userId = useAppSelector((store) => store.userReducer.userId);
  const [messages, setMessages] = useState<TMessage[] | []>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<TMessage | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const avatar = useAppSelector((state) => state.userReducer.userAvatar);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>(
    io("ws://localhost:8900")
  );
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };
  useEffect(() => {
    const fetchConversation = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/conversations/find/:${ChatId}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Token") as string),
          },
        }
      );
      setCurrentChat(data);
    };

    fetchConversation();
  }, [ChatId]);
  useEffect(() => {
    const getMessages = async () => {
      if (currentChat)
        try {
          const res = await axios.get(
            "http://localhost:5000/messages/:" + currentChat?._id,
            {
              headers: {
                Authorization: JSON.parse(
                  localStorage.getItem("Token") as string
                ),
              },
            }
          );
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
    };
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    //  socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data: TMessage) => {
      setArrivalMessage({
        _id: data._id,
        sender: data.sender,
        text: data.text,
        createdAt: data.createdAt,
        conversationId: data.conversationId,
      });
    });
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", userId);
  }, [userId]);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const handleSubmit = async () => {
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    try {
      const res = await axios.post("http://localhost:5000/messages", message, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token") as string),
        },
      });
      setMessages([...messages, res.data]);
      const receiverId = currentChat?.members.find(
        (member) => member !== userId
      );
      socket.current.emit("sendMessage", {
        sender: userId,
        receiverId,
        text: newMessage,
        _id: res.data._id,
      });
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className={`${styles.Container}`}>
      <div className={`${styles.Messages}`}>
        {messages.map((m, index) => (
          <div
            key={m._id}
            ref={index === messages.length - 1 ? scrollRef : null}
          >
            <MessegeItem message={m} />
          </div>
        ))}
      </div>
      <div className={`${styles.Message}`}>
        <div className={`${styles.UserAvatarContainer}`}>
          <img
            src={`http://localhost:5000/${avatar}`}
            alt=""
            className={`${styles.UserAvatar}`}
          />
        </div>
        <textarea
          ref={textareaRef}
          maxLength={480}
          onInput={handleInput}
          className={`${styles.MessageText}`}
          placeholder="Напиши сообщение бро)"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
        <div className={`${styles.ButtonMessegeContainer}`}>
          <button className={`${styles.ButtonMessege}`} onClick={handleSubmit}>
            <img src={rightArrow} alt="" className={`${styles.CommentImg}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Messager;
