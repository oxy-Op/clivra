import { Globe } from "lucide-react";

const GlobalChat = () => {
  return (
    <div
      className="flex items-center cursor-pointer w-full p-3 bg-[#f3f2e9] dark:bg-[#141414]
    hover:bg-[#e6e5d8] dark:hover:bg-[#2c2c2c] transition rounded-[12px] mb-2"
    >
      <div className="rounded-full ">
        <Globe className="w-6 h-6" />
      </div>
      <div className="ms-3">
        <span>Global</span>
      </div>
    </div>
  );
};

export default GlobalChat;
