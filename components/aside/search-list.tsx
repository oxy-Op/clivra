"use client";

import { User } from "@prisma/client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { useModal } from "@/hooks/use-modal";
import UserMenu from "./ui/user-channel";

const UserList = ({ users }: { users: User[] }) => {
  const { onOpen } = useModal();

  return users?.map((user) => (
    <ContextMenu key={user.id}>
      <ContextMenuTrigger>
        <UserMenu
          id={user.id}
          aria-haspopup="true"
          aria-label="Open Context Menu"
          key={user.id}
          icon={user.image}
          label={user.name}
          // status={"active"}
          className="hover:bg-[#c7c7c7] dark:hover:bg-[#1d1d1d]"
        />
      </ContextMenuTrigger>
      <ContextMenuContent className="w-[200px]">
        <ContextMenuSeparator />
        <ContextMenuItem
          className="cursor-pointer"
          onClick={() =>
            onOpen("profile", {
              label: user.name,
              icon: user.image,
              createdAt: user.createdAt,
            })
          }
        >
          Profile
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ));
};

export default UserList;
