"use client";

import { FullMessageType } from "@/lib/types";
import ChatItem from "./chat-item";
import { User } from "@prisma/client";
import { useEffect, useRef } from "react";

const Chat = ({ chat, user }: { chat: FullMessageType[]; user?: User }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({});
  }, []);

  return (
    <div className="flex flex-col grow overflow-x-hidden overflow-y-auto">
      {chat.map((message) => (
        <ChatItem key={message.id} {...message} user={user} />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Chat;
