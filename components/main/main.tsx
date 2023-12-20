"use client";

import { ChatProvider } from "./ui/chat-context";

const Channel = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex dark:background-main flex-col h-full flex-1 border relative">
      <ChatProvider>{children}</ChatProvider>
    </main>
  );
};

export default Channel;
