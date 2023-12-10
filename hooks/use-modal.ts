import { User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "profile"
  | "messageFile"
  | "imageModal"
  | "editProfile"
  | "editImage"
  | "groupModal"
  | "editGroup"
  | "deleteConversation";

type ModalData = {
  label?: string | null;
  icon?: string | null;
  status?: "active" | "offline";
  apiUrl?: string;
  image?: string;
  query?: Record<string, any>;
  conversationId?: string;
  users?: User[];
  isGroup?: boolean | null;
  me?: User | null;
};

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
