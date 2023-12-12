import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "@/components/aside/ui/search-bar";
import { Separator } from "@/components/ui/separator";
import AsideBar from "@/components/aside/aside-sidebar";
import Empty from "@/components/empty-area";
import getUsers from "@/hooks/getUsers";
import UserList from "@/components/aside/search-list";

const SearchNav = async () => {
  const users = await getUsers();

  return (
    <>
      <AsideBar>
        <SearchBar users={users} />
        <span className="text-xs me-auto mt-2 ms-1 text-zinc-400 font-semibold">
          People
        </span>
        <Separator className="mt-1" />
        <ScrollArea className="w-full h-full" role="list">
          <UserList users={users} />
        </ScrollArea>
      </AsideBar>
      <Empty />
    </>
  );
};

export default SearchNav;
