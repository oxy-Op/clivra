import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full p-3 flex border">
      <div className="ms-4">
        <h1 className="text-3xl opacity-90">
          <Link href="/">Clivra</Link>
        </h1>
      </div>
      <div className="flex ms-auto ">
        <div className="me-2">
          <ModeToggle />
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Header;
