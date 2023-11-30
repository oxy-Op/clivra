import AsideBar from "@/components/aside/aside-sidebar";
import ConversationList from "@/components/aside/conversation-list";
import GlobalChat from "@/components/aside/ui/global-channel";
import UserMenu from "@/components/aside/ui/user-channel";
import { Separator } from "@/components/ui/separator";
import getConversations from "@/hooks/getConversations";
import getCurrentUser from "@/hooks/getCurrentUser";

export const revalidate = 0;

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <>
      <AsideBar>
        <GlobalChat />
        <Separator className="mt-1" />
        <p className="text-xs me-auto mt-2 ms-1 text-zinc-400 font-semibold">
          Conversations
        </p>
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
