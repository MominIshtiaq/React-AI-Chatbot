import { useState } from "react";
import Chat from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";
import styles from "./App.module.css";
import { Assistant } from "./assistants/googleai";
import Loader from "./components/Loader/Loader";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const assistant = new Assistant();

  function addMessage(message) {
    setMessages((pervMessages) => [...pervMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chat(content);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request, Please try again!",
        role: "system",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" alt="chatbot_img" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls isDisabled={isLoading} onSend={handleContentSend} />
    </div>
  );
}

export default App;
