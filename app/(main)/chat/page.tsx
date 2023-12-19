"use client";

import Empty from "@/components/empty-area";
import { useEffect } from "react";

const ChatArea = () => {
  useEffect(() => {
    if (
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme") === undefined
    ) {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return <Empty mobile />;
};

export default ChatArea;
