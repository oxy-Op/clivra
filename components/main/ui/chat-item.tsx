import { FullMessageType } from "@/lib/types";
import Image from "next/image";

const ChatItem = ({ id, image, body, createdAt, sender }: FullMessageType) => {
  return (
    <div className="flex w-[500px]  gap-3 p-2 ">
      <div className="relative w-9 h-9 inline-block overflow-hidden">
        <Image
          className="rounded-full"
          src={sender.image || "/user_placeholder.png"}
          alt={"user avatar"}
          fill
          sizes="36px"
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-2 bg-[#e0dfdd] dark:bg-[#1d1d1d] border min-w-[256px] w-[300px] rounded">
        <div className="flex items-center gap-2">
          <div className="ms-2 text-sm font-semibold">{sender.name}</div>
          <div className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </div>
        </div>
        <div className="ms-3 text-sm w-fit overflow-hidden">
          <span className="break-all pb-3 pr-2">{body}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
