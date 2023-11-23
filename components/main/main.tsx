const Channel = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="hidden md:flex flex-col border w-[800px] 2xl:w-[1600px] relative">
      {children}
    </main>
  );
};

export default Channel;
