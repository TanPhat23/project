"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SplitType from "split-type";
import gsap from "gsap";

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
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  let text = new SplitType("#text");
  let characters = document.querySelectorAll(".char");
  for (let i = 0; i < characters.length; i++) {
    characters[i].classList.add("translate-y-full");
  }
  gsap.to(".char", {
    y: 0,
    stagger: 0.05,
    delay: 0.05,
    duration: 0.5,
  });
  gsap.from(".logo", { duration: 2, opacity: 0.7, scale: 0.9, ease: "back" });
  gsap.to(".lang", { duration: 1.5, opacity: 0.9, scale: 0.9, ease: "in" });
  return (
    <div
      className="flex justify-between h-screen overflow-hidden
     w-screen "
    >
      <div>
        <h1
          className="m-32 text-5xl flex justify-center md:w-32 lg:w-2/4 font-semibold"
          id="text"
        >
          A GOOD PLACE FOR YOU TO PRACTICE CODING
        </h1>
        <div className="m-32 flex justify-between md:w-32 lg:w-2/4">
          {langLogos.map((logo) => (
            <Image
              key={logo.label}
              src={logo.value}
              width={100}
              height={100}
              alt=""
              className="lang  hover:scale-125"
            />
          ))}
        </div>
      </div>

      <div
        className={`${
          !isVisible
            ? ""
            : "duration-10000 ease-out transition-all translate-x-0  absolute bottom-0 right-0 "
        }`}
      >
        <div className="bg-orange-300 rounded-tl-full ">
          <div className="">
            <Image
              className="logo"
              src="/icon.png"
              width={500}
              height={500}
              alt="school"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
