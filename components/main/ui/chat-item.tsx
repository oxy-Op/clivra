import { useModal } from "@/hooks/use-modal";
import { FullMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";

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
      className={cn("flex flex-col p-2", isMe && "ms-auto lg:me-28")}
    >
      <div className="flex gap-3">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-9 h-9 inline-block overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={sender.image || "/user_placeholder.png"}
              alt={"user avatar"}
              fill
              sizes="36px"
              quality={100}
            />
          </div>
          {image && (
            <div className="text-xs z-20">
              {format(new Date(createdAt), "p")}
            </div>
          )}
        </div>
        <div
          tabIndex={image ? 0 : -1}
          onKeyDown={(event) => image && keyDown(event, image)}
          className={cn(
            "relative flex flex-col gap-2 bg-[#e0dfdd] dark:bg-[#1d1d1d] border min-w-[256px] w-[300px] rounded",
            image &&
              "h-64 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500"
          )}
        >
          {image && (
            <Image
              className="object-cover"
              onClick={() => handleImageClick(image)}
              src={image}
              fill
              sizes="300px"
              alt="image"
              quality={100}
            />
          )}
          {!image && (
            <>
              <div className="flex items-center gap-2">
                <div className="ms-2 text-sm font-semibold">{sender.name}</div>
                <div className="text-xs text-neutral-300">
                  {format(new Date(createdAt), "p")}
                </div>
              </div>
              <div className="ms-3 text-sm w-fit overflow-hidden">
                <span className="break-all pr-2 text-md">{body}</span>
              </div>
            </>
          )}
        </div>
      </div>
      {isLastMessage && isMe && seenList.length > 0 && (
        <div className="ms-auto text-xs font-base text-gray-500">
          {`Seen by ${seenList}`}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
