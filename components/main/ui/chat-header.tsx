"use client";

import UserMenu from "@/components/aside/ui/user-channel";
import { UserMenuProps } from "@/lib/types";
import { Globe, MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";

type HeaderProps = {
  type: "user" | "global" | "loading";
};

const ChatHeader = ({
  id,
  conversationId,
  icon,
  label,
  status,
  isGroup,
  members,
  type,
  me,
  totalMembers,
}: UserMenuProps &
  HeaderProps & {
    totalMembers?: string;
    members?: User[];
    me?: User | null;
    conversationId?: string;
  }) => {
  const { onOpen } = useModal();

  return (
    <header className="flex items-center border w-full p-2">
      {type === "user" && (
        <>
          <UserMenu
            id={id}
            icon={icon}
            isGroup={isGroup}
            onClick={
              !isGroup
                ? () => {
                    onOpen("profile", { label, icon, status, isGroup });
                  }
                : () =>
                    onOpen("editGroup", {
                      label,
                      icon,
                      conversationId: id,
                      users: members,
                      me: me,
                    })
            }
            label={label}
            status={status}
            status_text={isGroup ? `${totalMembers} members` : ""}
            className="w-[30%] p-0 pb-1 dark:hover:bg-transparent hover:bg-transparent"
          />
          <div className="ms-auto me-4">
            <Popover>
              <PopoverTrigger>
                <MoreVertical className="rounded-full hover:bg-[#e6e5d8] dark:hover:bg-[#2c2c2c]" />
              </PopoverTrigger>
              <PopoverContent className="">
                <Button
                  onClick={() => {
                    onOpen("deleteConversation", {
                      conversationId: conversationId,
                      label: label,
                    });
                  }}
                  tabIndex={0}
                  variant="destructive"
                  className="w-full mx-auto"
                >
                  Delete conversation
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
      {type === "global" && (
        <>
          <Globe className="w-6 h-6 ms-2" />
          <h3 className="ms-4">Global Chat</h3>
        </>
      )}
      {type === "loading" && (
        <div className="flex items-center py-1 ps-2 mt-1 p-2">
          <Skeleton className="w-6 h-6 ms-2 rounded-full" />
          <Skeleton className="h-6 w-32 ms-4 " />
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
