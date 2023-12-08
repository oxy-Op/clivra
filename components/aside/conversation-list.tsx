import { FullConversationType } from "@/lib/types";
import UserMenu from "./ui/user-channel";
import getCurrentUser from "@/hooks/getCurrentUser";
import ConversationBox from "./conversation-box";

export default async function ConversationList({
  items,
}: {
  items: FullConversationType[];
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full">
      {items.map((conversation) =>
        conversation.users.map(
          (user) =>
            currentUser?.id !== user.id && (
              <ConversationBox
                currentUser={currentUser}
                data={conversation}
                conversationId={conversation.id}
                key={user.id}
                id={user.id}
                icon={user.image || ""}
                label={user.name || ""}
                status="active"
              />
            )
        )
      )}
    </div>
  );
}
