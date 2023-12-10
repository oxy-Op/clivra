import Channel from "@/components/main/main";
import Chat from "@/components/main/ui/chat";
import ChatHeader from "@/components/main/ui/chat-header";
import ChatInput from "@/components/main/ui/chat-input";

const Global = () => {
  return (
    <Channel>
      <ChatHeader type="global" />
      {/* <Chat
        chat={[
          {
            id: "1",
            icon: "/mikasa.png",
            label: "John Doe",
            content: "Hello, how are you?",
            time: "10:00",
          },
        ]}
      />
      <ChatInput /> */}
    </Channel>
  );
};

export default Global;
