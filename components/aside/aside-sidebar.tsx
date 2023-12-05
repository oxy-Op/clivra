"use client";

export default function AsideBar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="flex flex-col w-full flex-grow-0 items-center md:w-[250px] border rounded p-2 h-full">
      {children}
    </aside>
  );
}
