"use client";

import { useEffect, useState } from "react";
import Profile from "../modals/profile";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Profile />
    </>
  );
};
