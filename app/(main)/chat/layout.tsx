import AsideBar from "@/components/aside/aside-sidebar";
import ConversationList from "@/components/aside/conversation-list";
import GlobalChat from "@/components/aside/ui/global-channel";
import ConversationLabel from "@/components/conv-group-add";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import getConversations from "@/hooks/getConversations";
import getCurrentUser from "@/hooks/getCurrentUser";
import getUsers from "@/hooks/getUsers";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  return (
    <>
      <AsideBar>
        <GlobalChat />
        <Separator className="mt-1" />
        <ConversationLabel users={users} />
        <Separator className="mt-1" />
        <ScrollArea className="h-full w-full overflow-auto">
          <ConversationList currentUser={currentUser} items={conversations} />
        </ScrollArea>
      </AsideBar>
      {children}
    </>
  );
}
