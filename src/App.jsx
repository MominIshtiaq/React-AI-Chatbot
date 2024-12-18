import { useState } from "react"
import Chat from "./components/Chat/Chat"
import Controls from "./components/Controls/Controls"
import styles from "./App.module.css"

function App() {
  const [messages, setMessages] = useState([])

  function handleContentSend(content) {
    setMessages((pervMessages) => [...pervMessages, { content, role: "user" }])
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" alt="chatbot_img" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages}/>
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  )
}

export default App
