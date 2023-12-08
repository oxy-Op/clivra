"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "imageModal";
  const [loading, setLoading] = useState(true);
  const { image } = data;

  useEffect(() => {
    setLoading(true);
  }, [image]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="relative w-full h-full">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Loader2 className="animate-spin w-32 h-32 motion-reduce:disabled:animate-none" />
            </div>
          )}
          <Image
            className="object-cover"
            src={image || "/user_placeholder.png"}
            alt="image"
            onLoad={() => setLoading(false)}
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
