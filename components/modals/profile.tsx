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
import { cn } from "@/lib/utils";

const Profile = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "profile";
  const { label, icon, status } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="md:min-h-[400px] min-h-[200px] bg-[#f4f4f4] dark:bg-[#141414]">
        <DialogHeader>
          <DialogTitle className="border-b-2 pb-2">Profile</DialogTitle>
          <div className="mt-2">
            <div className="relative inline-block">
              <Image
                className="rounded-full ring-2"
                src={icon || "/user_placeholder.png"}
                alt={label || "user"}
                loading="eager"
                width={100}
                height={100}
                quality={100}
              />
              <span
                className={cn(
                  "absolute bottom-2 right-2 rounded-full w-4 h-4 ring-4 ring-[#f3f2e9] dark:ring-[#141414]",
                  status === "active" ? "bg-green-500/80" : "bg-red-500/80"
                )}
              ></span>
            </div>
          </div>
          <div className="h-full bg-background rounded-md mt-4">
            <h3 className="p-3 ms-2 text-xl opacity-80">{label}</h3>
            <div className="w-[80%] bg-border h-[2px] ms-4"></div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
