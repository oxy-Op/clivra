export type UserMenuProps = {
  icon?: string;
  label?: string;
  status: "active" | "offline";
  className?: string;
};

export type ChatItemProps = {
  id: string;
  icon: string;
  label: string;
  content: string;
  time: string;
  status: "active" | "offline";
}

export type User = {
  id: string
  imageUrl?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
};