import AsideBar from "@/components/aside/aside-sidebar";
import Loading from "@/components/waiting";
import { Loader2 } from "lucide-react";

const LoadingStatus = () => {
  return (
    <AsideBar>
      <div className="hidden lg:block">
        {Array.from({ length: 10 }).map((_, index) => (
          <Loading key={index} />
        ))}
      </div>
      <div className="flex justify-center items-center h-full lg:hidden">
        <Loader2 className="h-12 w-12 animate-spin my-auto" />
      </div>
    </AsideBar>
  );
};

export default LoadingStatus;
