"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import Image from "next/image";

const Profile = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "profile";
  const { label, icon, createdAt, isGroup } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="md:min-h-[400px] h-[500px] bg-[#f4f4f4] dark:bg-[#141414]">
        <DialogHeader>
          <DialogTitle className="border-b-2 pb-2">
            {isGroup ? "Group" : "Profile"}
          </DialogTitle>
          <div className="mt-2">
            <div className="relative inline-block w-28 h-28">
              <Image
                className="rounded-full ring-2 object-cover"
                src={icon || "/user_placeholder.png"}
                alt={`${label} profile picture`}
                loading="eager"
                fill
                sizes="112px"
                quality={100}
              />
              {/* <span
                className={cn(
                  "absolute bottom-2 right-2 rounded-full w-4 h-4 ring-4 ring-[#f3f2e9] dark:ring-[#141414]",
                  status === "active" ? "bg-green-500/80" : "bg-red-500/80"
                )}
              ></span> */}
            </div>
          </div>
          <div className="h-full bg-background rounded-md mt-4">
            <h3 className="p-3 ms-2 text-xl opacity-80">{label}</h3>
            <div className="md:w-[80%] md:ms-4 ms-0 w-full bg-border h-[2px] "></div>
            <div className="w-full ms-4 mt-4">
              <span className="text-md">
                Joined on{" "}
                <span className="font-bold text-base">
                  {new Date(createdAt || 0).toDateString()}
                </span>
              </span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
