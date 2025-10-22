"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loader: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(circleRef.current, {
      scale: 1.3,
      opacity: 0.6,
      duration: 1,
      ease: "power2.inOut",
    }).to(circleRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(textRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 4,
      ease: "linear",
    });
  }, []);

  return (
    <div className="w-full h-screen bg-[#0e0e10] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Yorqin doira */}
      <div
        ref={circleRef}
        className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 blur-lg"
      ></div>

      {/* Aylanuvchi text */}
      <div
        ref={textRef}
        className="absolute text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-2xl font-semibold mt-2"
      ></div>
    </div>
  );
};

export default Loader;
