"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import UserMenu from "./user-channel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { User } from "@prisma/client";

const SearchBar = ({ users }: { users: User[] }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full">
      <Button
        className="w-full mt-2 gap-x-2 relative"
        variant={"outline"}
        onClick={() => setOpen((open) => !open)}
      >
        <div className="me-auto ms-2 flex justify-center items-center gap-x-2">
          <Search className="w-4 h-4" />
          <span>Search People</span>
        </div>
        <span className="hidden lg:block text-xs absolute top-2 right-2">
          <kbd className="text-xs ms-auto"> CTRL + K </kbd>
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search People" />
        <CommandList className="w-full">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="People">
            {users?.map((user, _) => (
              <CommandItem className="dark:hover:bg-amber-600" key={_}>
                <UserMenu
                  id={user.id}
                  key={user.id}
                  icon={user.image}
                  label={user.name + "#" + Math.floor(Math.random() * 100)}
                  className="mt-0 p-0"
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
