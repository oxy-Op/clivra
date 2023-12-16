"use client";

import { useModal } from "@/hooks/use-modal";
import { User } from "@prisma/client";
import { Users } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const ConversationLabel = ({ users }: { users: User[] }) => {
  const { onOpen } = useModal();

  return (
    <div className="flex w-full p-2">
      <div>
        <p className="text-xs me-auto uppercase mt-2 ms-1 text-zinc-400 font-bold">
          Conversations
        </p>
      </div>
      <div className="flex ms-auto space-x-2">
        <div className="md:hidden inset-0">
          <ModeToggle />
        </div>
        <button
          onClick={() =>
            onOpen("groupModal", {
              users,
              apiUrl: "/api/conversations",
            })
          }
        >
          <span className="sr-only">Create group</span>
          <Users />
        </button>
      </div>
    </div>
  );
};

export default ConversationLabel;
