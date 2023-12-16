"use client";

import Empty from "@/components/empty-area";
import { useEffect } from "react";

const ChatArea = () => {
  useEffect(() => {
    localStorage.setItem("theme", "dark");
  }, []);

  return <Empty mobile />;
};

export default ChatArea;
