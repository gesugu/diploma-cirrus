import React from "react";
import classes from "./ChatHistory.module.css";
import ReactMarkdown from "react-markdown"; // Для красивого рендеринга Markdown

function ChatHistory({ chatHistory }) {
  return (
    <div className={classes.chatHistory}>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={message.type === "user" ? classes.userMessage : classes.botMessage}
        >
          {message.type === "user" ? (
            <p>{message.message}</p>
          ) : (
            <ReactMarkdown>{message.message}</ReactMarkdown>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;