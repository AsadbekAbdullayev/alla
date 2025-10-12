"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

export default function Navbar() {
  const router = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleStarClick = () => {
    if (!bgRef.current || !iconRef.current) return;

    const stars: SVGSVGElement[] = [];
    for (let i = 0; i < 30; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 512.001 512.001");
      svg.classList.add("star");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M511.266,197.258c-1.764-5.432-6.458-9.389-12.108-10.209l-158.722-23.066L269.452,20.156 c-2.527-5.121-7.741-8.361-13.451-8.361c-5.709,0-10.924,3.24-13.451,8.361l-70.988,143.826L12.843,187.049 c-5.649,0.82-10.345,4.777-12.108,10.207c-1.765,5.432-0.293,11.393,3.795,15.377l114.848,111.955L92.27,482.67 c-0.965,5.629,1.349,11.315,5.968,14.672c4.619,3.355,10.741,3.799,15.797,1.141L256,423.845l141.961,74.637 c2.195,1.154,4.591,1.723,6.979,1.723c3.11,0,6.206-0.965,8.818-2.863c4.619-3.357,6.933-9.045,5.968-14.672L392.61,324.588 l114.86-111.955C511.559,208.648,513.031,202.687,511.266,197.258z"
      );
      svg.appendChild(path);
      bgRef.current.appendChild(svg);
      stars.push(svg);
    }

    gsap.set(stars, {
      x: 90,
      y: 0,
      scale: "random(0.3, 1)",
      fill: "#FFD700",
    });

    gsap.to(stars, {
      duration: 2,
      physics2D: {
        velocity: "random(250, 380)",
        angle: "random(240, 300)", // yulduzlar yon tomonga otiladi
        gravity: 400,
      },
      rotation: 190,
      onComplete: () => {
        stars.forEach((star) => star.remove());
        router.push("/profile");
      },
    });
  };

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
        onClick={handleStarClick}
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
