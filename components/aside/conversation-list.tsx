"use client";

import { FullConversationType } from "@/lib/types";
import ConversationBox from "./conversation-box";
import { User } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ConversationList({
  items,
  currentUser,
}: {
  items: FullConversationType[];
} & { currentUser: User | null }) {
  const [conv, setConv] = useState(items);
  const params = useParams();
  const router = useRouter();

  const pusherKey = useMemo(() => {
    return currentUser?.email;
  }, [currentUser?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const handler = (conversation: FullConversationType) => {
      setConv((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setConv((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setConv((current) =>
        current.filter((currentConversation) => {
          return currentConversation.id !== conversation.id;
        })
      );

      if (conversation.id === params?.conversationId) {
        router.push("/chat");
      }
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", handler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", handler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, params?.conversationId, router]);

  return (
    <div className="w-full">
      {conv.length === 0 && (
        <div className="flex flex-col justify-center items-center h-full w-full space-y-5">
          <p className="text-center text-xs mt-12 text-zinc-400">
            Conversations started with people will appear here
          </p>
          <Button
            onClick={() => router.push("/search")}
            type="button"
            variant={"default"}
          >
            Start chatting
          </Button>
        </div>
      )}
      {conv.map((conversation) => (
        <ConversationBox
          key={conversation.id}
          currentUser={currentUser}
          data={conversation}
          conversationId={conversation.id}
          status="active"
        />
      ))}
    </div>
  );
}
