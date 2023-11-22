"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { problems } from "@/lib/problems";
import { Problem } from "@/lib/problems/types";
import { usePathname, useRouter } from "next/navigation";

const links = [
  {
    label: "Course",
    href: "/course",
  },
  {
    label: "ChatGPT",
    href: "/ChatGPT",
  },
];
type TopbarProps = {
  problemPage?: boolean;
};

const Navbar = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[id as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <div className="flex p-4 font-bold bg-dark-layer-1 text-white w-full">
      <div className="flex justify-evenly w-40 ">
        <Link href="/" className="flex justify-between w-32">
          <Image src="/logo2.png" alt="LOGO" width={35} height={40} />
          <h1 className="hover:opacity-10">IT-LEARN</h1>
        </Link>
      </div>
      <div className="flex justify-evenly w-1/2">
        {links.map((link) => (
          <Link className="hover:opacity-10" key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex space-x-3 w-full justify-center">
        <div
          className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
          onClick={() => handleProblemChange(false)}
        >
          <ChevronLeft />
        </div>
        <div>Change Problem</div>
        <div
          className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
          onClick={() => handleProblemChange(true)}
        >
          <ChevronRight />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
