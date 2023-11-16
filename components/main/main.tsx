import Chat from "./ui/chat";
import ChatHeader from "./ui/chat-header";
import ChatInput from "./ui/chat-input";

const Main = () => {
  return (
    <main className="hidden md:flex flex-col border w-[800px] 2xl:w-[1600px] relative">
      <ChatHeader icon="/mikasa.png" label="Mikasa" status="active" />
      <Chat />
      <ChatInput />
    </main>
  );
};

export default Main;
