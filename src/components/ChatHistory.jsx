import React from "react";
import classes from "./ChatHistory.module.css";
import ReactMarkdown from "react-markdown"
import cirrus from "../icons/cirrus.jpg"

function ChatHistory({ chatHistory }) {
  const welcomeMessage = {
    type: "bot",
    logo: cirrus,
    message: "Здравствуйте! Я — ИИ-ассистент. Я готов помочь вам с вашими вопросами. Просто напишите мне, и я постараюсь ответить!",
  };

  const displayChatHistory = chatHistory.length === 0 ? [welcomeMessage, ...chatHistory] : chatHistory;
  return (
    <div className={classes.chatHistory}>
        {displayChatHistory.map((message, index) => (
          <div>
          <div
            key={index}
            className={message.type === "user" ? classes.userMessage : classes.botMessage}
          >
            {message.type === "user" ? (
              <p>{message.message}</p>
            ) : (
              <div className={classes.chatHistoryImgD}>
              <img src={cirrus} className={message.type === "bot" ? classes.chatHistoryImg : classes.chatHistoryImg} />
              <ReactMarkdown>{message.message}</ReactMarkdown>
              </div>
            )}
          </div>
          </div>
        ))}
    </div>
  );
}

export default ChatHistory;