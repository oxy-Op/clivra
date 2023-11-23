import ChatItem from "./chat-item";

type ChatProps = {
  id: string;
  icon: string;
  label: string;
  content: string;
  time: string;
};

const Chat = ({ chat }: { chat: ChatProps[] }) => {
  return (
    <div className="flex flex-col grow">
      {chat.map((item: ChatProps) => (
        <ChatItem
          key={item.id}
          id={item.id}
          icon={item.icon}
          label={item.label}
          content={item.content}
          time={item.time}
        />
      ))}
    </div>
  );
};

export default Chat;
