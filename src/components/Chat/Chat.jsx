import styles from "./Chat.module.css";
import Markdown from "react-markdown";
import PropTypes from "prop-types";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! How can i help you?",
};

const Chat = ({ messages }) => {
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div key={index} className={styles.Message} data-role={role}>
          <Markdown>{content}</Markdown>
        </div>
      ))}
    </div>
  );
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Chat;
