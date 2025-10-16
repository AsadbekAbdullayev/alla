"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <nav className="w-full bg-[#0f0f0f] shadow-md p-4 flex justify-between items-center relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/favicon.png" alt="logo" className="w-7 h-7" />
        <h1 className="font-semibold text-lg">Alla</h1>
      </div>

      <div
        ref={bgRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      ></div>

      <button
        onClick={() => router.push("/profile")}
        className="relative bg-[#1d243a] text-white px-5 py-2 rounded-md font-mono hover:bg-[#181e30] transition"
      >
        <div ref={iconRef} className="inline-block mr-2">
          ⭐
        </div>
        Profile
      </button>
    </nav>
  );
}
