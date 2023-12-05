import { Zap } from "lucide-react";

const Empty = () => {
  return (
    <div className="hidden lg:flex flex-grow bg-[#f4f4f4] dark:bg-[#141414]/40 h-full">
      <div className="w-full flex flex-col gap-y-6 items-center justify-center">
        <Zap className="w-24 h-24 border rounded-full p-4" />
        <h3 className="opacity-70">Start an conversation</h3>
      </div>
    </div>
  );
};

export default Empty;
