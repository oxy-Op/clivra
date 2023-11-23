"use client";

import { usePathname, useRouter } from "next/navigation";
import GotoChat from "./ui/goto-chat";
import GoToSearch from "./ui/goto-search";

const NavSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (pathname === path) {
      return true;
    }
  };

  return (
    <nav className="hidden lg:flex flex-col items-center w-[72px] h-full border p-4 space-y-4">
      <GotoChat
        isActive={isActive("/chat")}
        handleClick={() => router.push("/chat")}
      />
      <GoToSearch
        isActive={isActive("/search")}
        handleClick={() => router.push("/search")}
      />
    </nav>
  );
};

export default NavSideBar;
