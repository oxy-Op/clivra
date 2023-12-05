import { create } from "zustand";

export type ModalType = "profile" | "messageFile" | "imageModal";

type ModalData = {
  label?: string | null;
  icon?: string | null;
  status?: "active" | "offline";
  apiUrl?: string;
  image?: string;
  query?: Record<string, any>;
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
