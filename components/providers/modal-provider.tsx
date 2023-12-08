"use client";

import { useEffect, useState } from "react";
import Profile from "../modals/profile";
import { MessageFileModal } from "../modals/attachments";
import ImageModal from "../modals/image-modal";
import EditProfile from "../modals/edit-profile";
import { EditImage } from "../modals/edit-image";
import { GroupAddModal } from "../modals/group-add";

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
      <MessageFileModal />
      <ImageModal />
      <EditProfile />
      <EditImage />
      <GroupAddModal />
    </>
  );
};
