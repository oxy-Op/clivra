"use client";

import { FullMessageType } from "@/lib/types";
import ChatItem from "./chat-item";
import { User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { useChatContext } from "./chat-context";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const { isProcessing, tempMessage, setProcessing, setTempMessage } =
    useChatContext();

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

        setProcessing(false);
        setTempMessage(null);

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
  }, [conversationId, setProcessing, setTempMessage, tempMessage]);

  return (
    <div
      role="list"
      className="flex flex-col grow overflow-x-hidden sm:overflow-y-auto overflow-y-scroll dark:background-main"
      aria-live="polite"
    >
      {messages.map((message, i) => (
        <ChatItem
          key={i}
          {...message}
          user={user}
          isLastMessage={i === chat.length - 1}
        />
      ))}
      {isProcessing && (
        <div
          role="listitem"
          className={cn("flex flex-col relative ms-auto lg:me-28")}
        >
          <div className={cn("flex p-2 items-center")}>
            <div className="flex flex-col self-start items-center space-y-2 relative">
              <div className="relative w-9 h-9 inline-block overflow-hidden rounded me-3">
                <Image
                  className="rounded-full object-cover"
                  src={user?.image || "/user_placeholder.png"}
                  alt={"user avatar"}
                  fill
                  sizes="36px"
                  quality={100}
                />
              </div>
              <div className={cn("text-xs me-2")}></div>
            </div>
            <div
              className={cn(
                "relative flex flex-col gap-2 bg-blue-400 dark:bg-[#1d1d1d] min-w-[256px] w-[230px] sm:w-[300px] rounded"
              )}
            >
              <div
                className={cn(
                  "ms-3 text-sm w-fit overflow-hidden",
                  "mt-2 pb-2"
                )}
              >
                <span className="break-word opacity-80 text-white text-md animate-pulse">
                  {tempMessage}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-24" ref={bottomRef}></div>
    </div>
  );
};

export default Chat;
