"use client";
import courses from "./course";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Course() {
  return (
    <div className="flex w-screen h-screen relative">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-2 gap-16">
          {courses.map((course) => (
            <Link key={course.href} href={`/course${course.href}`}>
              <div className="space-x-2 p-7 ml-32 text-sm bg-gray-700 flex text-white rounded-lg hover:opacity-25 hover:text-bold">
                <course.icon />
                <p>{course.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
