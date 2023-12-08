"use client";

import { FullConversationType, UserMenuProps } from "@/lib/types";
import { useParams } from "next/navigation";
import UserMenu from "./ui/user-channel";
import { useMemo } from "react";
import { User } from "@prisma/client";

const ConversationBox = ({
  data,
  id,
  conversationId,
  icon,
  label,
  status,
}: UserMenuProps & { conversationId: string } & {
  data: FullConversationType;
} & { currentUser: User | null }) => {
  const params = useParams();

  const isActive = params?.conversationId === conversationId;

  const lastMessage = useMemo(() => {
    return data.messages[data.messages.length - 1] || [];
  }, [data.messages]);

  const lastMessageContent = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return data.isGroup ? (
    <UserMenu key={id} id={id} icon={icon} label={data.name} />
  ) : (
    <UserMenu
      key={id}
      id={id}
      icon={icon}
      label={label}
      status={status}
      status_text={lastMessageContent}
      className="dark:hover:bg-[#2c2c2c] hover:bg-[#bbbbbb]"
      isActive={isActive}
    />
  );
};

export default ConversationBox;
