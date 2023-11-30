"use client";

import { UserButton } from "@clerk/nextjs";
import GotoChat from "./ui/goto-chat";
import GoToSearch from "./ui/goto-search";
import { ModeToggle } from "../mode-toggle";

const NavSideBar = () => {
  return (
    <nav className="hidden md:flex flex-col items-center w-[72px] h-full border p-4">
      <div className="flex flex-col space-y-4">
        <GotoChat />
        <GoToSearch />
      </div>
      <div className="mt-auto flex flex-col space-y-4  mb-2 ">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default NavSideBar;
