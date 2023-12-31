import Empty from "@/components/empty-area";
import Channel from "@/components/main/main";
import Chat from "@/components/main/ui/chat";
import ChatHeader from "@/components/main/ui/chat-header";
import ChatInput from "@/components/main/ui/chat-input";
import getConversationById from "@/hooks/getConversation";
import getCurrentUser from "@/hooks/getCurrentUser";
import getMessages from "@/hooks/getMessages";

const Conversation = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversationId = params?.conversationId;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  const me = await getCurrentUser();

  const otherUser = conversation?.users.filter(
    (user) => user?.email !== me?.email
  )[0];

  if (!conversation) {
    return <Empty />;
  }

  return (
    <Channel>
      {conversation.isGroup ? (
        <ChatHeader
          isGroup
          createdAt={conversation.createdAt}
          type="user"
          conversationId={conversationId}
          members={conversation.users}
          totalMembers={conversation.users.length.toString()}
          id={conversation.id}
          icon={conversation.image || otherUser?.image}
          label={conversation.name}
          me={me}
        />
      ) : (
        <ChatHeader
          type="user"
          createdAt={otherUser?.createdAt}
          id={otherUser?.id}
          conversationId={conversationId}
          icon={otherUser?.image}
          label={otherUser?.name}
        />
      )}
      <Chat
        chat={messages || []}
        user={me || otherUser}
        conversationId={conversationId}
      />
      <ChatInput conversationId={conversationId} />
    </Channel>
  );
};

export default Conversation;
