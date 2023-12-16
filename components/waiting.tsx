import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading({ mobile }: { mobile?: boolean }) {
  return (
    <div
      className={cn("flex items-center space-x-4 mt-2", mobile && "w-full ")}
    >
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className={cn("space-y-2 flex flex-col", mobile && "w-[80%] ")}>
        <Skeleton className={cn("h-4 w-[150px]", mobile && "w-[80%] h-6")} />
        <Skeleton className={cn("h-4 w-[100px]", mobile && "w-[80%] h-6")} />
      </div>
    </div>
  );
}
