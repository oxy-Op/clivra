import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export default async function getConversations() {
  const me = await getCurrentUser();

  if (!me?.id) {
    return [];
  }

  const conversations = db.conversation.findMany({
    orderBy: {
      lastMessageAt: "desc",
    },
    where: {
      userIds: {
        has: me?.id,
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          sender: true,
          seen: true,
        },
      },
    },
  });

  return conversations;
}
