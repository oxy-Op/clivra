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
    <div
      className={cn(
        "flex items-center cursor-pointer w-full p-3 bg-[#a3a3a3] dark:bg-[#141414] hover:bg-[#dcdcdc] dark:hover:bg-[#2c2c2c] transition rounded-[12px] mb-2 ",
        isActive && "bg-[#dcdcdc] dark:bg-[#2c2c2c]"
      )}
      onClick={handleClick}
    >
      <div className="rounded-full ">
        <Globe className="w-6 h-6" />
      </div>
      <div className="ms-3">
        <span>Global</span>
      </div>
    </div>
  );
};

export default GlobalChat;
