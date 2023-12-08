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

type HeaderProps = {
  type: "user" | "global" | "loading";
};

const ChatHeader = ({
  id,
  icon,
  label,
  status,
  type,
}: UserMenuProps & HeaderProps) => {
  const { onOpen } = useModal();

  return (
    <header className="flex items-center border w-full p-2">
      {type === "user" && (
        <>
          <UserMenu
            id={id}
            icon={icon}
            onClick={() => {
              onOpen("profile", { label, icon, status });
            }}
            label={label}
            status={status}
            className="w-[30%] p-0 pb-1 dark:hover:bg-transparent hover:bg-transparent"
          />
          <div className="ms-auto me-2">
            <Popover>
              <PopoverTrigger>
                <MoreVertical className="rounded-full hover:bg-[#e6e5d8] dark:hover:bg-[#2c2c2c]" />
              </PopoverTrigger>
              <PopoverContent className="w-[140px]">
                <Button variant="outline" className="">
                  Clear chat
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
