import NavSideBar from "@/components/navigation/nav-sidebar";
import MobileNavBar from "@/components/navigation/mobile-navbar";
import getCurrentUser from "@/hooks/getCurrentUser";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const me = await getCurrentUser();

  return (
    <div className="h-full min-w-[150px]">
      {/* <Header /> */}
      <div className="flex flex-col md:flex-row h-full md:space-x-2 ">
        <NavSideBar me={me} />
        {children}
        <MobileNavBar />
      </div>
    </div>
  );
};

export default Layout;
