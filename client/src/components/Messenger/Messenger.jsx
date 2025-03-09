import {  useEffect, useState, useCallback, useRef } from "react";
import styles from "./Messenger.module.css";
import MessegeItem from "../MessegeItem/MessegeItem";
import { TConversation, TMessage } from "../../utils/types";
import { useAppSelector } from "../../hooks/redux";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
const Messager= () => {
  const ChatId = useParams().id?.slice(1)
  const [currentChat, setCurrentChat] = useState(null);
  const userId = useAppSelector((store) => store.userReducer.userId)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const fetchConversation = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/conversations/find/:${ChatId}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("Token")),
        },
      }
    );
    setCurrentChat(data);
  }, []);
  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);
  useEffect(() => {
    const getMessages = async () => {
      if(currentChat)
      try {
        const res = await axios.get("http://localhost:5000/messages/:" + currentChat?._id,{
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Token")),
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", userId);
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userId
    );
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:5000/messages", message,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Token")),
          },
        });
      setMessages([...messages, res.data]);
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
        {messages.map((m) => (
          <div key={m._id} ref={scrollRef}>
            <MessegeItem message={m}  />
          </div>
        ))}
      </div>
      <div className={`${styles.Message}`}>
        <textarea
          className={`${styles.MessageText}`}
          placeholder="Напиши сообщение бро)"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
        <button className={`${styles.MessageSendButton}`} onClick={handleSubmit}>
          Отправить
        </button>
      </div>
    </div>
  );
};
export default Messager;
