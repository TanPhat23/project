"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SplitType from "split-type";
import gsap from "gsap";


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
  gsap.from(".logo", { duration: 1.5, opacity: 0.7, scale: 0.9, ease: "back" });

  return (
    <div
      className="flex justify-between h-screen overflow-hidden
     w-screen "
    >
      <h1
        className="m-32 text-5xl flex justify-center md:w-32 lg:w-3/4"
        id="text"
      >
        A GOOD PLACE FOR YOU TO PRACTICE CODING
      </h1>
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
              width={550}
              height={600}
              alt="school"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
