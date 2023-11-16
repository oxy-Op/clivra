import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import UserMenu from "./user-channel";
import { User, UserMenuProps } from "@/lib/types";

const SearchBar = ({ users }: { users: string[] }) => {
  return (
    <div className="mt-auto w-full">
      <Command>
        <CommandInput placeholder="Search User" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Users">
            {users.map((user: any) => (
              <>
                <CommandItem>
                  <UserMenu
                    key={user.username}
                    icon={user.imageUrl}
                    label={
                      user.username || user.firstName + " " + user.lastName
                    }
                    status="active"
                    className="p-0 mt-0"
                  />
                </CommandItem>
              </>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchBar;
