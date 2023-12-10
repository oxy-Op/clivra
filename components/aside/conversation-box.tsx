"use client";

import { FullConversationType, UserMenuProps } from "@/lib/types";
import { useParams } from "next/navigation";
import UserMenu from "./ui/user-channel";
import { useCallback, useMemo } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

const ConversationBox = ({
  data,
  currentUser,
  conversationId,
  status,
}: UserMenuProps & { conversationId: string } & {
  data: FullConversationType;
} & { currentUser: User | null }) => {
  const params = useParams();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/chat/${conversationId}`);
  }, [conversationId, router]);

  const otherUser = data.users.filter(
    (user) => user.email !== currentUser?.email
  )[0];

  const isActive = params?.conversationId === conversationId;

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1] || [];
  }, [data.messages]);

  const lastMessageContent = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    if (data.isGroup) {
      return `Created Group`;
    }

    return "Started a conversation";
  }, [lastMessage, data.isGroup]);

  return (
    <UserMenu
      key={conversationId}
      id={conversationId}
      icon={data.image || otherUser.image}
      onClick={handleClick}
      label={data.isGroup ? data.name : otherUser.name}
      status={status}
      isGroup={data.isGroup}
      status_text={lastMessageContent}
      className="dark:hover:bg-[#2c2c2c] hover:bg-[#bbbbbb]"
      isActive={isActive}
    />
  );
};

export default ConversationBox;
