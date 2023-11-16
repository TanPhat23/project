const PageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="h-screen  bg-gradient-to-r from-purple-500 to-blue-400 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
