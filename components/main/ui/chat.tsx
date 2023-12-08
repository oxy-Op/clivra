"use client";

import { FullMessageType } from "@/lib/types";
import ChatItem from "./chat-item";
import { User } from "@prisma/client";
import { useEffect, useRef } from "react";
import axios from "axios";

const Chat = ({
  chat,
  user,
  conversationId,
}: {
  chat: FullMessageType[] | [];
  user?: User;
  conversationId: string;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({});
  }, []);

  return (
    <div className="flex flex-col grow overflow-x-hidden overflow-y-auto">
      {chat.map((message, i) => (
        <ChatItem
          key={i}
          {...message}
          user={user}
          isLastMessage={i === chat.length - 1}
        />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Chat;
