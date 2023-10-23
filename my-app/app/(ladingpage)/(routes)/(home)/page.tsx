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
    delay: 0.02,
    duration: 0.5,
  });
  gsap.from(".logo", { duration: 1.5, opacity: 0.8, scale: 1.3, ease: "back" });
  return (
    <div
      className="flex justify-between h-screen overflow-hidden
     w-screen "
    >
      <h1
        className="m-32 text-5xl flex justify-center"
        id="text"
      >
        HO CHI MINH UNIVERSITY TECHNOLOGY
      </h1>
      <div
        className={`${
          !isVisible
            ? ""
            : "duration-10000 ease-out transition-all translate-x-0  absolute bottom-0 right-0 "
        }`}
      >
        <div className="bg-orange-300 rounded-tl-full">
          <Image
            className="logo"
            src="/school.png"
            width={700}
            height={800}
            alt="school"
          />
        </div>
      </div>
    </div>
  );
}
