import Sidebar from "@/components/Sidebar";
import { UserButton } from "@clerk/nextjs";
const CourseLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-01q bg-gray-900">
        <Sidebar />
      </div>
      <div className="flex w-full justify-end p-4">
        <UserButton />
      </div>
      <main>{children}</main>
    </div>
  );
};
export default CourseLayout;
