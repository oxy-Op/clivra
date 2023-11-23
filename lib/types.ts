export type UserMenuProps = {
  icon?: string;
  label?: string;
  isActive?: boolean;
  status?: "active" | "offline";
  className?: string;
};

export type ChatItemProps = {
  id: string;
  icon: string;
  label: string;
  content: string;
  time: string;
}

export type User = {
  id: string
  imageUrl?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
};