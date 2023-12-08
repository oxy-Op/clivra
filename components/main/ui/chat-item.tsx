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

  return (
    <div className={cn("flex flex-col p-2", isMe && "ms-auto lg:me-28")}>
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
          className={cn(
            "relative flex flex-col gap-2 bg-[#e0dfdd] dark:bg-[#1d1d1d] border min-w-[256px] w-[300px] rounded",
            image && "h-64"
          )}
        >
          {image && (
            <Image
              className="object-cover"
              onClick={() => onOpen("imageModal", { image: image })}
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
                <div className="text-xs text-gray-500">
                  {format(new Date(createdAt), "p")}
                </div>
              </div>
              <div className="ms-3 text-sm w-fit overflow-hidden">
                <span className="break-all pr-2 ">{body}</span>
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
