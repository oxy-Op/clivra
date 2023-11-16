"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import GlobalChat from "./ui/global-channel";
import { Separator } from "../ui/separator";
import UserMenu from "./ui/user-channel";
import SearchBar from "./ui/search-bar";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";

const NavBar = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const users: User[] = res.data;
      setUsers(users);
    });
  }, []);

  return (
    <nav className="flex flex-col items-center min-w-[200px] border rounded p-2 h-full">
      <GlobalChat />
      <ScrollArea className="w-full">
        <Separator />
        {users.map((user) => (
          <UserMenu
            key={user.username}
            icon={user.imageUrl}
            label={user.username || user.firstName + " " + user.lastName}
            status="active"
          />
        ))}
      </ScrollArea>
      <Separator className="mt-1" />
      <SearchBar users={users as unknown as string[]} />
    </nav>
  );
};

export default NavBar;
