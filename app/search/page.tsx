"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/lib/types";
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
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import SearchBar from "@/components/aside/ui/search-bar";
import { Separator } from "@/components/ui/separator";
import UserMenu from "@/components/aside/ui/user-channel";
import AsideBar from "@/components/aside/aside-sidebar";
import Empty from "@/components/empty-area";
import { useCallback } from "react";

const SearchNav = () => {
  const router = useRouter();

  const { onOpen } = useModal();

  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      const users: User[] = res.data.users;
      return users;
    },
  });

  return (
    <>
      <AsideBar>
        <SearchBar users={data as unknown as string[]} />
        <span className="text-xs me-auto mt-2 ms-1 text-zinc-400 font-semibold">
          People
        </span>
        <Separator className="mt-1" />
        <ScrollArea className="w-full h-full" role="list">
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <Loading key={index} />
            ))}
          {!isLoading &&
            !error &&
            data?.map((user) => (
              <ContextMenu key={user.id}>
                <ContextMenuTrigger>
                  <UserMenu
                    id={user.id}
                    aria-haspopup="true"
                    aria-label="Open Context Menu"
                    key={user.id}
                    icon={user.image}
                    label={user.name}
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
                        label: user.name,
                        icon: user.image,
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
      </AsideBar>
      <Empty />
    </>
  );
};

export default SearchNav;
