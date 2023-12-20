import React, { createContext, useContext, useState } from "react";

interface ChatContextProps {
  isProcessing: boolean;
  tempMessage: string | null;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setTempMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isProcessing, setProcessing] = useState(false);
  const [tempMessage, setTempMessage] = useState<string | null>(null);

  return (
    <ChatContext.Provider
      value={{ isProcessing, tempMessage, setProcessing, setTempMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  return context;
};
