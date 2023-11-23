"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import GlobalChat from "./ui/global-channel";
import { Separator } from "../ui/separator";
import UserMenu from "./ui/user-channel";
import SearchBar from "./ui/search-bar";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { useModal } from "@/hooks/use-modal";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";

export default function NavBar() {
  const [users, setUsers] = useState<User[]>([]);
  const pathname = usePathname();
  const { onOpen } = useModal();

  const active = () => {
    if (pathname === "/") {
      return true;
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      const data: User[] = res.data;
      setUsers(data);
    },
  });

  return (
    <nav className="flex flex-col flex-grow-0 items-center w-[250px] border rounded p-2 h-full">
      <GlobalChat isActive={pathname === "/chat/global"} />
      <Separator className="mt-1" />
      <SearchBar users={users as unknown as string[]} />
      <span className="text-xs me-auto mt-2 ms-1 text-zinc-400 font-semibold">
        People
      </span>
      <Separator className="mt-1" />
      <ScrollArea className="w-full h-full" role="list">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => <Loading key={index} />)}
        {!isLoading &&
          users.map((user) => (
            <ContextMenu key={user.id}>
              <ContextMenuTrigger>
                <UserMenu
                  aria-haspopup="true"
                  aria-label="Open Context Menu"
                  key={user.id}
                  icon={user.imageUrl}
                  isActive={active()}
                  label={user.username || user.firstName + " " + user.lastName}
                  status={"active"}
                  className="hover:bg-[#c7c7c7] dark:hover:bg-[#1d1d1d]"
                />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-[200px]">
                <ContextMenuSeparator />
                <ContextMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    onOpen("profile", {
                      label:
                        user.username || user.firstName + " " + user.lastName,
                      icon: user.imageUrl,
                      status: "active",
                    })
                  }
                >
                  Profile
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
      </ScrollArea>
    </nav>
  );
}
