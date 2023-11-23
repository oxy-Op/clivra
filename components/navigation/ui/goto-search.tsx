import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const GoToSearch = ({
  handleClick,
  isActive,
}: {
  handleClick: () => void;
  isActive: boolean | undefined;
}) => {
  return (
    <div
      onClick={handleClick}
      tabIndex={0}
      role="button"
      className={cn(
        "p-2 text-[#282828] dark:text-[#d2d2d2] rounded-md hover:bg-[#d2d2d2] hover:dark:bg-[#262626] hover:text-[#272727] hover:dark:text-[#dadada] transition ease-in-out",
        isActive
          ? "bg-[#d2d2d2] dark:bg-[#262626] text-[#272727] dark:text-[#dadada]"
          : ""
      )}
    >
      <Search className="w-8 h-8" />
      <span className="sr-only">Search People</span>
    </div>
  );
};

export default GoToSearch;
