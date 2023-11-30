import { Conversation, Message, User } from "@prisma/client";

export type UserMenuProps = {
  id?: string;
  icon?: string | null;
  label?: string | null;
  isActive?: boolean;
  status?: "active" | "offline";
  status_text?: string;
  className?: string;
};

export type ChatItemProps = {
  id: string;
  icon: string;
  label: string;
  content: string;
  time: string;
};

export type UserProps = {
  id: string;
  image?: string;
  name?: string;
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
