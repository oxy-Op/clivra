"use client";

import GotoChat from "./ui/goto-chat";
import GoToSearch from "./ui/goto-search";

const MobileNavBar = () => {
  return (
    <div className="md:hidden flex space-x-6 justify-around items-center p-2 w-full border">
      <GotoChat />
      <GoToSearch />
    </div>
  );
};

export default MobileNavBar;
