import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserMenuProps } from "@/lib/types";

const UserMenu = ({
  icon,
  label,
  status,
  isActive,
  className,
}: UserMenuProps) => {
  return (
    <div
      role="button"
      aria-label={`Chat with ${label}`}
      className={cn(
        "flex cursor-pointer w-full items-center  py-1 ps-2 mt-1 p-2",
        className,
        isActive && "bg-[#c8c7b9] dark:bg-[#2c2c2c]"
      )}
      tabIndex={0}
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
            "absolute bottom-0 right-0 rounded-full w-2 h-2 ring-2 ring-[#f3f2e9] dark:ring-[#141414]",
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
