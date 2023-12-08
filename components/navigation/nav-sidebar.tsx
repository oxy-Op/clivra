"use client";

import GotoChat from "./ui/goto-chat";
import GoToSearch from "./ui/goto-search";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import { SignOutButton } from "@clerk/nextjs";
import { useModal } from "@/hooks/use-modal";

const NavSideBar = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const { onOpen } = useModal();

  useEffect(() => {
    fetch("/api/users/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
          setLoading(false);
        });
      }
    });
  }, []);

  return (
    <nav className="hidden relative md:flex flex-col items-center w-[72px] h-full border p-4">
      <div className="flex flex-col space-y-4">
        <GotoChat />
        <GoToSearch />
      </div>
      <div className="mt-auto flex flex-col space-y-4  mb-2 ">
        <ModeToggle />
        {/* <UserButton afterSignOutUrl="/" /> */}
        <Popover>
          <PopoverTrigger>
            <div className="relative h-8 w-8" tabIndex={0}>
              <Image
                className="rounded-full object-cover"
                src={user?.image || "/user_placeholder.png"}
                alt="user"
                fill
                quality={100}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex-col space-y-2 w-[300px] h-[200px] ml-4">
            <div className="flex items-center gap-x-4 border-b-2 pb-2">
              <div className="relative h-8 w-8" tabIndex={0}>
                <Image
                  className="rounded-full object-cover"
                  src={user?.image || "/user_placeholder.png"}
                  alt="user"
                  fill
                  quality={100}
                />
              </div>
              <div className="flex flex-col">
                {loading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center space-y-2">
              <Button
                onClick={() => {
                  onOpen("editProfile", {
                    label: user?.name,
                    icon: user?.image,
                    status: "active",
                  });
                }}
                variant={"outline"}
                className="w-full"
              >
                Edit Profile
              </Button>
              <SignOutButton>
                <Button variant={"outline"} className="w-full">
                  Log out
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
