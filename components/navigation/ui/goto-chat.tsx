"use client";

import { TooltipShow } from "@/components/providers/tooltip-provider";
import { cn } from "@/lib/utils";
import { MessagesSquare } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const GotoChat = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <TooltipShow text="Go to Conversations" side="right">
      <button
        onClick={() => {
          router.push("/chat");
        }}
        className={cn(
          "p-2 text-[#282828] dark:text-[#d2d2d2] rounded-md hover:bg-[#d2d2d2] hover:dark:bg-[#272727] hover:text-[#272727] hover:dark:text-[#dadada] transition ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500",
          pathname.startsWith("/chat")
            ? "bg-[#d2d2d2] dark:bg-[#262626] text-[#272727] dark:text-[#dadada] border-b-2 border-[#262626] dark:border-[#d2d2d2]"
            : ""
        )}
      >
        <MessagesSquare className="w-8 h-8" />
        <span className="sr-only">Go to Conversations </span>
      </button>
    </TooltipShow>
  );
};

export default GotoChat;
