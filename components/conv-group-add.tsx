"use client";

import { useModal } from "@/hooks/use-modal";
import { User } from "@prisma/client";
import { Users } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { TooltipShow } from "./providers/tooltip-provider";

const ConversationLabel = ({ users }: { users: User[] }) => {
  const { onOpen } = useModal();

  return (
    <div className="flex w-full p-2">
      <div>
        <p className="text-xs me-auto uppercase mt-2 ms-1 text-zinc-600 font-bold dark:text-neutral-100">
          Conversations
        </p>
      </div>
      <div className="flex ms-auto space-x-2">
        <div className="md:hidden inset-0">{/* <ModeToggle /> */}</div>
        <TooltipShow text="Create group" side="right">
          <button
            className="hover:bg-[#d2d2d2] dark:hover:bg-[#262626] p-2 rounded"
            onClick={() =>
              onOpen("groupModal", {
                users,
                apiUrl: "/api/conversations",
              })
            }
          >
            <span className="sr-only">Create group</span>
            <Users className="w-4 h-4" />
          </button>
        </TooltipShow>
      </div>
    </div>
  );
};

export default ConversationLabel;
