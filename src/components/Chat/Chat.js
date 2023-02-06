import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import io from "socket.io-client";

import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;
let timeout;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [nameIsTyping, setNameIsTyping] = useState("");
  const ENDPOINT = "https://chat-app-server-8k72.onrender.com:10000";
  const navigate = useNavigate();

  useEffect(() => {
    const { name, room } = Object.fromEntries([...searchParams]);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error);
        navigate("/", { replace: true, state: { error } });
      }
    });

    return () => {
      socket.disconnect();

      socket.off();
    };
  }, [ENDPOINT, searchParams, navigate]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", (message) => {
      setUsers(message.users);
    });
  }, [users]);

  useEffect(() => {
    socket.on("isTyping", (name) => {
      console.log(name);
      setNameIsTyping(name);
    });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setNameIsTyping("");
    }, 2000);
  }, [nameIsTyping]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Backspace") socket.emit("typing");
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} nameIsTyping={nameIsTyping} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
