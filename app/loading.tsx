import AsideBar from "@/components/aside/aside-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <AsideBar>
      <Loader2 className="h-12 w-12 animate-spin my-auto" />
    </AsideBar>
  );
};

export default Loading;
