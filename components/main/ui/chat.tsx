import { FullMessageType } from "@/lib/types";
import ChatItem from "./chat-item";

type ChatProps = {
  id: string;
  icon: string;
  label: string;
  content: string;
  time: string;
};

const Chat = ({ chat }: { chat: FullMessageType[] }) => {
  return (
    <div className="flex flex-col grow overflow-x-hidden overflow-y-auto">
      {chat.map((message) => (
        <ChatItem key={message.id} {...message} />
      ))}
    </div>
  );
};

export default Chat;
