import AsideBar from "@/components/aside/aside-sidebar";
import ConversationList from "@/components/aside/conversation-list";
import GlobalChat from "@/components/aside/ui/global-channel";
import ConversationLabel from "@/components/conv-group-add";
import { Separator } from "@/components/ui/separator";
import getConversations from "@/hooks/getConversations";
import getUsers from "@/hooks/getUsers";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <>
      <AsideBar>
        <GlobalChat />
        <Separator className="mt-1" />
        <ConversationLabel users={users} />
        <Separator className="mt-1" />
        {conversations.length === 0 && (
          <p className="text-center text-xs  my-auto text-zinc-400">
            Conversations started with people will appear here
          </p>
        )}
        <ConversationList items={conversations} />
      </AsideBar>
      {children}
    </>
  );
}
