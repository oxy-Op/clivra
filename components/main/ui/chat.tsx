"use client";

import { FullMessageType } from "@/lib/types";
import ChatItem from "./chat-item";
import { User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

const Chat = ({
  chat,
  user,
  conversationId,
}: {
  chat: FullMessageType[] | [];
  user?: User;
  conversationId: string;
}) => {
  const [messages, setMessages] = useState(chat);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex flex-col grow overflow-x-hidden overflow-y-auto">
      {messages.map((message, i) => (
        <ChatItem
          key={i}
          {...message}
          user={user}
          isLastMessage={i === chat.length - 1}
        />
      ))}
      <div className="mt-24" ref={bottomRef}></div>
    </div>
  );
};

export default Chat;
