import Channel from "@/components/main/main";
import ChatHeader from "@/components/main/ui/chat-header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const Loading = () => {
  return (
    <Channel>
      <ChatHeader type="loading" />
      <div className="flex flex-col grow overflow-x-hidden overflow-y-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3 p-2 items-center",
              [1, 3, 5].includes(index) && "ms-auto lg:me-28"
            )}
          >
            <Skeleton className="h-9 w-9 rounded-full" />
            {[2].includes(index) ? (
              <Skeleton className="w-64 h-64" />
            ) : (
              <Skeleton className="w-[256px] h-12" />
            )}
          </div>
        ))}
      </div>
    </Channel>
  );
};

export default Loading;
