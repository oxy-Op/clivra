"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const GotoChat = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/chat");
      }}
      tabIndex={0}
      role="button"
      className={cn(
        "p-2 text-[#282828] dark:text-[#d2d2d2] rounded-md hover:bg-[#d2d2d2] hover:dark:bg-[#262626] hover:text-[#272727] hover:dark:text-[#dadada] transition ease-in-out",
        pathname.startsWith("/chat")
          ? "bg-[#d2d2d2] dark:bg-[#262626] text-[#272727] dark:text-[#dadada] border-b-2 border-[#262626] dark:border-[#d2d2d2]"
          : ""
      )}
    >
      <MessageCircle className="w-8 h-8" />
      <span className="sr-only">Go to Conversations </span>
    </div>
  );
};

export default GotoChat;
