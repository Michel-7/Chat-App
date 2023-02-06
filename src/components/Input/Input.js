import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage, handleKeyPress }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message || ""}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) =>
        e.key === "Enter" ? sendMessage(e) : handleKeyPress(e)
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
