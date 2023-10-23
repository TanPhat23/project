"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="flex justify-between items-center h-full w-full">
      <p className="m-32">HUTECH</p>
      <div
        className={`${
          !isVisible
            ? "flex ease-out transition-all inset-10 opacity-0"
            : "h-full w-64right-duration-40000 ease-out transition-all translate-x-0"
        }`}
      >
        <Image src="/school.png" alt="School Image" width={600} height={600} />
      </div>
    </div>
  );
}
