import Header from "@/components/header/Header";
import NavBar from "@/components/navigation/nav-menu";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Header />
      <div className="md:flex p-2 md:ps-16 lg:ps-36 space-x-4 h-[calc(100%-65.6px)] min-h-[200px]">
        <>
          <NavBar />
          {children}
        </>
      </div>
    </div>
  );
}
