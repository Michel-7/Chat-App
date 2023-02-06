import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";

import Message from "../Message/Message";

const Messages = ({ messages, name, nameIsTyping }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
    {nameIsTyping && <div className="typing">{nameIsTyping} is typing...</div>}
  </ScrollToBottom>
);

export default Messages;
