"use client";

import AsideBar from "@/components/aside/aside-sidebar";
import GlobalChat from "@/components/aside/ui/global-channel";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <AsideBar>
        <GlobalChat isActive={pathname === "/chat/global"} />
        <Separator className="mt-1" />
        <p className="text-xs me-auto mt-2 ms-1 text-zinc-400 font-semibold">
          Conversations
        </p>
        <p className="text-center text-xs  my-auto text-zinc-400">
          Conversations started with people will appear here
        </p>
      </AsideBar>
      {children}
    </>
  );
}
