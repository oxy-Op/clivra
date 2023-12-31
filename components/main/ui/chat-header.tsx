"use client";

import UserMenu from "@/components/aside/ui/user-channel";
import { UserMenuProps } from "@/lib/types";
import { ArrowLeft, Globe, MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import Link from "next/link";
import { TooltipShow } from "@/components/providers/tooltip-provider";

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
  createdAt,
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
    <header className="flex z-10 items-center border w-full h-20 min-h-[70px] p-2">
      <Link className="lg:hidden pe-2" href={`/chat`} aria-label="Back">
        <ArrowLeft />
      </Link>
      {type === "user" && (
        <>
          <UserMenu
            id={id}
            icon={icon}
            isGroup={isGroup}
            onClick={
              !isGroup
                ? () => {
                    onOpen("profile", {
                      label,
                      icon,
                      status,
                      isGroup,
                      createdAt,
                    });
                  }
                : () =>
                    onOpen("editGroup", {
                      label,
                      icon,
                      createdAt,
                      conversationId: id,
                      users: members,
                      me: me,
                    })
            }
            label={label}
            status={status}
            status_text={isGroup ? `${totalMembers} members` : ""}
            className="md:w-[30%]  p-0 pb-1 dark:hover:bg-transparent hover:bg-transparent"
          />
          <div className="ms-auto me-4 p-2 rounded-full hover:bg-[#e6e5d8] dark:hover:bg-[#2c2c2c]">
            <Popover>
              <PopoverTrigger aria-label="More Button">
                <TooltipShow text="More">
                  <MoreVertical className="h-6 w-6" />
                </TooltipShow>
                <span className="sr-only">More Button</span>
              </PopoverTrigger>
              <PopoverContent>
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
