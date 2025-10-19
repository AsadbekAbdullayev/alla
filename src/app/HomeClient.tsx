"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Footer from "@/app/_components/footer";
import Header from "./_components/Header";
import CartoonSlides from "./_components/CartoonSlides";
import Content from "./_components/Content";
import Opportunitites from "./_components/Opportunities";
import ChildSecurity from "./_components/ChildSecurity";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// ⭐ Shooting star interface
interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

// ✨ Firefly interface
interface Firefly {
  x: number;
  y: number;
  radius: number;
  glow: number;
  dx: number;
  dy: number;
}

export default function HomeClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [mode, setMode] = useState("light");

  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let stars: ShootingStar[] = [];
    let fireflies: Firefly[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // 🪩 Create glowing fireflies
    const createFireflies = (count = 25) => {
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          glow: Math.random() * 0.8 + 0.4,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
        });
      }
    };
    createFireflies();

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 🎨 Dark night background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🪩 Draw fireflies
      fireflies.forEach((f) => {
        ctx.beginPath();
        const glowGradient = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          f.radius * 8
        );
        glowGradient.addColorStop(0, `rgba(255,215,0,${f.glow})`);
        glowGradient.addColorStop(1, "rgba(255,215,0,0)");
        ctx.fillStyle = glowGradient;
        ctx.arc(f.x, f.y, f.radius * 8, 0, Math.PI * 2);
        ctx.fill();

        // move slowly
        f.x += f.dx;
        f.y += f.dy;
        if (f.x < 0) f.x = canvas.width;
        if (f.x > canvas.width) f.x = 0;
        if (f.y < 0) f.y = canvas.height;
        if (f.y > canvas.height) f.y = 0;
      });

      // 🌠 Draw shooting stars (top → bottom)
      stars.forEach((s, i) => {
        const xEnd = s.x;
        const yEnd = s.y + s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, xEnd, yEnd);
        grad.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();

        s.y += s.speed;
        s.opacity -= 0.008;

        if (s.y > canvas.height || s.opacity <= 0) {
          stars.splice(i, 1);
        }
      });
    };

    const loop = () => {
      drawScene();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // useEffect(() => {
  //   const urlMode = params.get("mode");

  //   if (urlMode === "dark" || urlMode === "light") {
  //     setMode(urlMode);
  //     localStorage.setItem("mode", urlMode);
  //   } else {
  //     // If no param, check localStorage or default to light
  //     const saved = localStorage.getItem("mode") || "light";
  //     setMode(saved);
  //     const search = new URLSearchParams(params);
  //     search.set("mode", saved);
  //     router.replace(`${pathname}?${search.toString()}`);
  //   }
  // }, [params, pathname, router]);

  // GSAP title animation
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-[#001145]" : ""
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <Header />
      <CartoonSlides />
      <Content />
      <Opportunitites />
      <ChildSecurity />
      <Footer />
    </div>
  );
}
