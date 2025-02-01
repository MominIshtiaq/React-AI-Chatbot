import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";
import styles from "./App.module.css";

const google_ai = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_AI_API_KEY
);
const gemini = google_ai.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = gemini.startChat({ history: [] });
let result = await chat.sendMessage("I have 2 dogs in my house.");
console.log(result.response.text());

function App() {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((pervMessages) => [...pervMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      const result = await chat.sendMessage(content);
      addMessage({ content: result.response.text(), role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request, Please try again!",
        role: "system",
      });
      console.error(error);
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" alt="chatbot_img" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
