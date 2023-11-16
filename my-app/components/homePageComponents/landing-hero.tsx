"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const langLogos = [
  {
    value: "/C++.png",
    label: "cpp",
  },
  {
    value: "/Python.png",
    label: "python",
  },
  {
    value: "/JavaScript.png",
    label: "javascript",
  },
];

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>A place to learn coding</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800">
          <TypewriterComponent
            options={{
              strings: ["Chatbot.", "Coding."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-20 w-full">
        {langLogos.map((logo) => (
          <Image
            key={logo.label}
            src={logo.value}
            width= {50}
            height={50}
            alt=""
            className="lang hover:scale-125 hover:opacity-50"
          />
        ))}
      </div>
      <div>
        <Link href={isSignedIn ? "/course" : "/sign-up"}>
          <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold mt-2">
            Start Coding for your future
          </Button>
        </Link>
      </div>
    </div>
  );
};
