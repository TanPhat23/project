"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Book, Brain, Home } from "lucide-react";
import { usePathname } from "next/navigation";
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Course",
    href: "/course",
    icon: Book,
  },
  {
    label: "ChatGPT",
    href: "/ChatGPT",
    icon: Brain,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo2.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            IT-LEARN
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={("h-5 w-5 mr-3 ")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
