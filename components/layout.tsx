"use client";

import Header from "@/components/header/Header";
import NavSideBar from "@/components/navigation/nav-sidebar";
import MobileNavBar from "@/components/navigation/mobile-navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-w-[150px]">
      {/* <Header /> */}
      <div className="flex flex-col md:flex-row h-full md:space-x-2 ">
        <NavSideBar />
        {children}
        <MobileNavBar />
      </div>
    </div>
  );
};

export default Layout;
