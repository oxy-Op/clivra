"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import GotoChat from "./ui/goto-chat";
import GoToSearch from "./ui/goto-search";

const MobileNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (pathname === path) {
      return true;
    }
  };
  return (
    <div className="lg:hidden flex space-x-6 justify-around items-center p-2 w-full border">
      <GotoChat
        isActive={isActive("/chat")}
        handleClick={() => router.push("/chat")}
      />
      <GoToSearch
        isActive={isActive("/search")}
        handleClick={() => router.push("/search")}
      />
    </div>
  );
};

export default MobileNavBar;
