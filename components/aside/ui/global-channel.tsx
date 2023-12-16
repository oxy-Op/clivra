"use client";

import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const GlobalChat = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === "/chat/global";

  const handleClick = () => {
    router.push("/chat/global");
  };

  return (
    <button
      disabled
      className={cn(
        "relative flex items-center w-full p-3 bg-[#e9e8e8]/80 dark:bg-[#2f2f2f] hover:bg-[#dcdcdc] dark:hover:bg-[#2c2c2c] transition rounded-[12px] mb-2 cursor-not-allowed",
        isActive && "bg-[#dcdcdc] dark:bg-[#2c2c2c] disabled:cursor-not-allowed"
      )}
      onClick={handleClick}
    >
      <div className="absolute right-0 top-0 bg-blue-500 flex items-center justify-center text-white p-1">
        <span className="text-sm font-semibold">Coming soon!</span>
      </div>
      <div className="rounded-full ">
        <Globe className="w-6 h-6" />
      </div>
      <div className="ms-3">
        <span>Global</span>
      </div>
    </button>
  );
};

export default GlobalChat;
