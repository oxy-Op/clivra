const Channel = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-full flex-1 border relative">
      {children}
    </main>
  );
};

export default Channel;
