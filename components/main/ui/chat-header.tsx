import UserMenu from "@/components/navigation/ui/user-channel";
import { UserMenuProps } from "@/lib/types";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const ChatHeader = ({ icon, label, status }: UserMenuProps) => {
  return (
    <header className="flex items-center border w-full p-2">
      <UserMenu
        icon={icon}
        label={label}
        status={status}
        className="p-0 pb-1 dark:hover:bg-transparent hover:bg-transparent"
      />
      <div className="ms-auto me-2">
        <Popover>
          <PopoverTrigger>
            <MoreVertical className="rounded-full hover:bg-[#e6e5d8] dark:hover:bg-[#2c2c2c]" />
          </PopoverTrigger>
          <PopoverContent className="w-[140px]">
            <Button variant="outline" className="">
              Clear chat
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default ChatHeader;
