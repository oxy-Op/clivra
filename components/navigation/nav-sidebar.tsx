"use client";

import GotoChat from "./ui/goto-chat";
import GoToSearch from "./ui/goto-search";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { SignOutButton } from "@clerk/nextjs";
import { useModal } from "@/hooks/use-modal";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Loader2 } from "lucide-react";
import { TooltipShow } from "../providers/tooltip-provider";

const NavSideBar = ({ me }: { me: User }) => {
  const [user, setUser] = useState(me);
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (data: User) => {
      setUser(data);
      console.log("handler executed");
    };

    pusherClient.subscribe(me.id);
    pusherClient.bind("user:update", handler);

    return () => {
      pusherClient.unsubscribe(me.id);
      pusherClient.unbind("user:update", handler);
    };
  }, [me.id]);

  return (
    <nav className="hidden dark:bg-[#1d1f1f]/80 relative md:flex flex-col items-center w-[72px] h-full border p-4">
      <div className="flex flex-col space-y-4">
        <TooltipShow text="Go to Conversations" side="right">
          <GotoChat />
        </TooltipShow>
        <TooltipShow text="Search People" side="right">
          <GoToSearch />
        </TooltipShow>
      </div>
      <div className="mt-auto flex flex-col space-y-4  mb-2 ">
        {/* <ModeToggle /> */}
        <Popover>
          <PopoverTrigger>
            <TooltipShow text="Profile" side="top">
              <div
                className="relative h-8 w-8 ring-2 rounded-full"
                tabIndex={0}
              >
                <Image
                  className="rounded-full object-cover"
                  src={user.image || "/user_placeholder.png"}
                  alt="user"
                  fill
                  sizes="500px"
                  quality={100}
                />
              </div>
            </TooltipShow>
          </PopoverTrigger>
          <PopoverContent className="flex-col space-y-2 w-[300px] h-[200px] ml-4">
            <div className="flex items-center gap-x-4 border-b-2 pb-2">
              <div className="relative h-8 w-8" tabIndex={0}>
                <Image
                  className="rounded-full object-cover"
                  src={user.image || "/user_placeholder.png"}
                  alt="user"
                  fill
                  quality={100}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center space-y-2">
              <Button
                onClick={() => {
                  onOpen("settings", {
                    label: user.name,
                    icon: user.image,
                    createdAt: user.createdAt,
                  });
                }}
                variant={"outline"}
                className="w-full"
              >
                Settings
              </Button>
              <SignOutButton>
                <Button
                  onClick={() => setLoading(true)}
                  variant={"outline"}
                  className="w-full"
                >
                  Log out
                  {loading && (
                    <span className="ms-2">
                      <Loader2 className="animate-spin w-4 h-4 motion-reduce:disabled:animate-none" />
                    </span>
                  )}
                </Button>
              </SignOutButton>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default NavSideBar;
