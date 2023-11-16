import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserMenuProps } from "@/lib/types";

const UserMenu = ({ icon, label, status, className }: UserMenuProps) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center mt-2 rounded-[12px] p-2 hover:bg-[#e6e5d8] dark:hover:bg-[#1d1d1d]",
        className
      )}
    >
      <div className="relative">
        <Image
          className="rounded-full"
          src={icon || "/user_placeholder.png"}
          alt={label || "user"}
          width={32}
          height={32}
          quality={100}
        />
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full w-2 h-2",
            status === "active" ? "bg-green-500/80" : "bg-red-500/80"
          )}
        ></span>
      </div>
      <div className="ms-3">
        <span>{label}</span>
      </div>
    </div>
  );
};

export default UserMenu;
