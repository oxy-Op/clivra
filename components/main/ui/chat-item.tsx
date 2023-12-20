import { useModal } from "@/hooks/use-modal";
import { FullMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import { TooltipShow } from "@/components/providers/tooltip-provider";

const ChatItem = ({
  id,
  image,
  body,
  createdAt,
  sender,
  user,
  seen,
  isLastMessage,
}: FullMessageType & { user?: User; isLastMessage: boolean }) => {
  const isMe = sender.id === user?.id;
  const { onOpen } = useModal();
  const seenList = (seen || [])
    .filter((user) => user.id !== sender.id)
    .map((user) => user.name)
    .join(", ");

  const handleImageClick = (image: string) => {
    onOpen("imageModal", { image: image });
  };

  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>, image: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleImageClick(image);
    }
  };

  return (
    <div
      role="listitem"
      className={cn("flex flex-col relative", isMe && "ms-auto lg:me-28")}
    >
      <div
        className={cn(
          "flex p-2 items-center",
          isMe && !image && " dark:bg-transparent rounded-sm mb-1"
        )}
      >
        <div className="flex flex-col self-start items-center space-y-2 relative">
          <div className="relative w-9 h-9 inline-block overflow-hidden rounded me-3">
            <TooltipShow text={sender.name || "User"}>
              <Image
                className="rounded-full object-cover"
                src={sender.image || "/user_placeholder.png"}
                alt={"user avatar"}
                fill
                sizes="36px"
                quality={100}
              />
            </TooltipShow>
          </div>
          <div
            className={cn(
              "text-xs me-2",
              !isMe && "ms-2",
              isMe && "text-white dark:text-inherit"
            )}
          >
            {format(new Date(createdAt), "p")}
          </div>
        </div>
        <div
          tabIndex={image ? 0 : -1}
          onKeyDown={(event) => image && keyDown(event, image)}
          className={cn(
            "relative flex flex-col gap-2 bg-blue-400 dark:bg-[#1d1d1d] min-w-[256px] w-[230px] sm:w-[300px] rounded",
            image &&
              "h-64 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500 rounded"
          )}
        >
          {image && (
            <Image
              className="object-cover rounded"
              onClick={() => handleImageClick(image)}
              src={image}
              fill
              priority
              sizes="1000px"
              alt="image"
              quality={100}
            />
          )}
          {!image && (
            <>
              {/* <div className="flex items-center gap-2">
                <div className="ms-2 text-sm font-semibold">{sender.name}</div>
                <div className="text-xs  dark:text-neutral-300">
                  {format(new Date(createdAt), "p")}
                </div>
              </div> */}
              <div
                className={cn(
                  "ms-3 text-sm w-fit overflow-hidden",
                  "mt-2 pb-2"
                )}
              >
                <span className="break-word text-white text-md">{body}</span>
              </div>
            </>
          )}
        </div>
      </div>
      {isLastMessage && isMe && seenList.length > 0 && (
        <div
          className={cn("ms-auto text-xs font-base")}
        >{`Seen by ${seenList}`}</div>
      )}
    </div>
  );
};

export default ChatItem;
