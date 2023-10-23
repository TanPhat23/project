"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const link = [{
    label: "Conversation",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    href: "/image",
  },
  {
    label: "Video Generation",
    href: "/video",
  },
  {
    label: "Music Generation",
    href: "/music",
  }]
const Navbar = () => {
  return (
    <div className="flex w-full p-4  font-bold">
      <div className="flex justify-evenly w-40 ">
        <Link href="/" className="flex justify-between w-32">
          <Image src="/logo2.png" alt="LOGO" width={40} height={40} />
          <h1>HUTECH</h1>
        </Link>
      </div>
      <div className="flex justify-evenly w-1/3">
        <Link href="/" className="hover:opacity-10">
          Contact
        </Link>
        <Link href="/" className="hover:opacity-10">
          Info
        </Link>
        <Link href="/" className="hover:opacity-10">
          Course
        </Link>
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar