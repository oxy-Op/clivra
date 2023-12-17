"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserMenuProps } from "@/lib/types";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const UserMenu = ({
  id,
  icon,
  label,
  status,
  isActive,
  className,
  status_text,
  isGroup,
  isLoading,
  isCurrentUser,
  onClick,
}: UserMenuProps & { onClick?: () => void } & {
  seen?: boolean;
  isCurrentUser?: boolean;
  isLoading?: boolean;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(isLoading || false);

  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", {
        userId: id,
      })
      .then((data) => {
        router.push(`/chat/${data.data.id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, id]);

  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Trigger the click action
      if (!isCurrentUser && onClick) {
        onClick();
      } else if (!isCurrentUser) {
        handleClick();
      }
    }
  };

  return (
    <div
      role="button"
      aria-pressed={isActive}
      onClick={isCurrentUser ? undefined : !!onClick ? onClick : handleClick}
      onKeyDown={keyDown}
      className={cn(
        "flex cursor-pointer w-full items-center  py-1 ps-2 mt-1 p-2",
        className,
        isActive && "bg-[#c8c8c5] dark:bg-[#2c2c2c]",
        loading && "pointer-events-none"
      )}
      tabIndex={0}
    >
      <div className="relative min-w-[32px] w-[34px] h-[34px]">
        <Image
          className="rounded-full object-cover"
          src={icon || "/user_placeholder.png"}
          alt={`Profile picture of ${label}`}
          fill
          sizes="32px"
          quality={100}
        />
        {!isGroup && status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full w-2 h-2 ring-2 ring-[#f3f2e9] dark:ring-[#141414]",
              status === "active" ? "bg-green-500/80" : "bg-red-500/80"
            )}
          ></span>
        )}
      </div>
      <div className="flex flex-col ms-3">
        <div className="flex items-center space-x-2">
          <span aria-label={label!} className={cn(loading && "animate-pulse")}>
            {label}
          </span>
          <span>
            {loading && (
              <Loader2 className="animate-spin w-4 h-4 motion-reduce:disabled:animate-none" />
            )}
          </span>
        </div>
        {status_text && (
          <span className="text-xs text-zinc-800 dark:text-neutral-300 font-semibold truncate">
            {status_text}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
