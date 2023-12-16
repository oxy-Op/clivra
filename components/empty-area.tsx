import { cn } from "@/lib/utils";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

const Empty = ({ mobile }: { mobile?: boolean }) => {
  return (
    <div
      className={cn(
        "flex-grow bg-[#f4f4f4] dark:bg-[#141414]/40 h-full",
        mobile ? "hidden lg:flex" : "flex"
      )}
    >
      <button className="md:hidden absolute top-4 left-4">
        <Link href={`/chat`}>
          <ArrowLeft />
        </Link>
      </button>
      <div className="w-full flex flex-col gap-y-6 items-center justify-center">
        <Zap className="w-24 h-24 border rounded-full p-4" />
        <h3 className="opacity-70">Start an conversation</h3>
      </div>
    </div>
  );
};

export default Empty;
