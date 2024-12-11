import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";
import MyLoader2 from "../components/UI/loader2/MyLoader2";
import classes from "../components/ChatPage.module.css";

function ChatPage() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Инициализация Google Generative AI
  const genAI = new GoogleGenerativeAI("AIzaSyDfExGHYv4q-QZ06-rZNUYboj2a2lKWV1M");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `you are a highly specialized specialist consultant on technology and other electronic goods. 
you help users tell and choose the ideal equipment for them, providing detailed, structured, and professional advice. 
Your task includes:
1. Analyzing the user's preferences, price limit, and purpose of purchase.
2. Recommending suitable electronic device and giving them a device that is on the lists of havings.
3. Explaining why this device is suitable for the user.

Please respond professionally and visually format the output in Markdown for a better user experience.`,
  });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Генерация ответа от модели
      const result = await model.generateContent(userInput);
      const response = await result.response;

      // Обновление истории чата
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setChatHistory([
        ...chatHistory,
        { type: "bot", message: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <h1 className={classes.title}>CareerPath AI</h1>
        <div className={classes.chatBox}>
  {isLoading ? (
    <MyLoader2 />
  ) : (
    <ChatHistory chatHistory={chatHistory} />
  )}
</div>
        <div className={classes.inputSection}>
          <input
            className={classes.inputField}
            type="text"
            placeholder="Ask for advice..."
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyPress}
          />
          <div className={classes.buttonContainer}>
            <button className={classes.sendButton} onClick={sendMessage} disabled={isLoading}>
              Send
            </button>
            <button className={classes.clearButton} onClick={clearChat}>
              Clear
            </button>
            <button className={classes.btnLink}>
              <Link className={classes.BtnLinkP} to="/">Go Back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;