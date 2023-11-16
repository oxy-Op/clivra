import { ChatItemProps } from "@/lib/types";
import Image from "next/image";

const ChatItem = ({
  id,
  icon,
  label,
  content,
  time,
  status,
}: ChatItemProps) => {
  return (
    <div className="flex items-center  p-2 ">
      <Image
        className="rounded-full"
        src={icon}
        alt={label}
        width={42}
        height={54}
        quality={100}
      />
      <div className="ms-2 bg-[#e6e5d8] dark:bg-[#1d1d1d] border min-w-[256px] rounded h-full">
        <span className="ms-2 mt-2">{content}</span>
      </div>
    </div>
  );
};

export default ChatItem;
