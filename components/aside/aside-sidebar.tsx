"use client";

import { useConversation } from "@/hooks/isConversationOpen";
import { cn } from "@/lib/utils";

export default function AsideBar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useConversation();

  return (
    <aside
      className={cn(
        "flex flex-col w-full flex-grow-0 items-center lg:w-[300px] border rounded p-2 h-full",
        isOpen ? "hidden lg:flex" : ""
      )}
    >
      {children}
    </aside>
  );
}
