"use client";

import { useModal } from "@/hooks/use-modal";
import { User } from "@prisma/client";
import { Users } from "lucide-react";

const ConversationLabel = ({ users }: { users: User[] }) => {
  const { onOpen } = useModal();

  return (
    <div className="flex w-full p-2">
      <div>
        <p className="text-xs me-auto uppercase mt-2 ms-1 text-zinc-400 font-bold">
          Conversations
        </p>
      </div>
      <button
        className="ms-auto"
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
  );
};

export default ConversationLabel;
