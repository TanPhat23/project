"use client";
import { Button } from "@/components/ui/button";
import courses from "./course";
import { UserButton } from "@clerk/nextjs";

export default function Course() {
  return (
    <div className="flex w-screen h-screen relative">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-2 gap-16">
          {courses.map((course) => (
            <Button key={course.href} className="space-x-2 p-8 ml-48 text-xl">
              <course.icon />
              <p>{course.label}</p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
