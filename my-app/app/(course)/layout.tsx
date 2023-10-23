const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="h-screen overflow-hidden bg-gradient-to-r from-purple-400 to-blue-400">
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;