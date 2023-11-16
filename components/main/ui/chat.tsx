import ChatItem from "./chat-item";

const Chat = () => {
  return (
    <div className="flex flex-col grow">
      <ChatItem
        id="1"
        icon="/mikasa.png"
        label="Mikasa"
        content="hi"
        time="10:00"
        status="active"
      />
    </div>
  );
};

export default Chat;
