import { cn } from "@/lib/utils";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

const Empty = ({ mobile, text }: { mobile?: boolean; text?: string }) => {
  return (
    <div
      className={cn(
        "flex-grow bg-[#f4f4f4] dark:bg-[#141414]/40 h-full",
        mobile ? "hidden lg:flex" : "flex"
      )}
    >
      <Link
        className="md:hidden absolute top-4 left-4"
        href={`/chat`}
        aria-label="Back"
      >
        <ArrowLeft />
      </Link>
      <div className="w-full flex flex-col gap-y-6 items-center justify-center">
        <Zap className="w-24 h-24 border rounded-full p-4" />
        <h3 className="opacity-70">{text || "Start an conversation"}</h3>
      </div>
    </div>
  );
};

export default Empty;
