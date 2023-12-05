"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import Image from "next/image";

const ImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "imageModal";
  const { image } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="relative w-full h-full">
          <Image
            className="object-cover"
            src={image || "/user_placeholder.png"}
            alt="image"
            sizes="100%"
            width={1920}
            height={1080}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
