import styles from "./Chat.module.css"

const Chat = ({ messages }) => {
  return (
    <div className={styles.Chat}>{messages.map(({role, content}, index) => (
        <div key={index} className={styles.Message} data-role={role}>
            {content}
        </div>
    ))}</div>
  )
}

export default Chat