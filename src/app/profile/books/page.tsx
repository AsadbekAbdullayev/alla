"use client";

import { useEffect, useRef, useState } from "react";
import SkeletonCards from "@/app/_components/shared/SkeletonCard";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Card from "@/app/_components/shared/Card";

// Static categories ma'lumotlari URL bilan
const staticCategories = [
  {
    name: "Ta'limiy kontentlar va raqamli kutubxona",
    poster: "/assets/images/peter.png", // URL bilan
  },
  {
    name: "Aladdin va sehrli chiroq",
    poster: "/assets/images/aladin.png", // URL bilan
  },
  {
    name: "Garri Potter va hikmatlar toshi",
    poster: "/assets/images/harry.png", // URL bilan
  },
];

export default function ProfilePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Loading state - static ma'lumotlar uchun qisqa loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Qisqa loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      // Cards animation
      const cards = listRef.current?.querySelectorAll(".video-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.4,
          }
        );
      }
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen flex-1 p-6 md:px-16">
      {/* Sarlavha qo'shildi */}
      <div className="mb-8">
        <h1
          ref={titleRef}
          className="text-3xl font-bold text-white text-center"
        >
          Kitoblar
        </h1>
        <p className="text-gray-300 text-center mt-2">
          Audio va elektron kitoblar
        </p>
      </div>

      {isLoading ? (
        <SkeletonCards />
      ) : (
        <div ref={listRef} className="flex flex-wrap gap-6 justify-start">
          {staticCategories.map(({ name, poster }, i) => (
            <Card
              key={i}
              title={name}
              poster={poster}
              isAudioBook
              isBook
              duration={"120"}
              bgColor={"bg-[#FF8B2D]"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
