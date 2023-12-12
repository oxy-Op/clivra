import AsideBar from "@/components/aside/aside-sidebar";
import Loading from "@/components/waiting";

const LoadingStatus = () => {
  return (
    <AsideBar>
      {Array.from({ length: 10 }).map((_, index) => (
        <Loading key={index} />
      ))}
    </AsideBar>
  );
};

export default LoadingStatus;
