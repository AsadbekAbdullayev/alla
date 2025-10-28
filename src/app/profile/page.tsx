"use client";

import { useEffect, useRef, useState } from "react";
import SkeletonCards from "@/app/_components/shared/SkeletonCard";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Card from "@/app/_components/shared/Card";

// Static categories ma'lumotlari URL bilan
const staticCategories = [
  {
    name: "Allalar",
    description: "Bolalar uchun qiziqarli va ta'limiy allalar",
    key: "ALLALAR",
    poster: "/assets/images/content1.png",
  },
  {
    name: "Milliy Multfilmlar",
    description: "O'zbek milliy multfilmlari",
    key: "NATIONAL_CARTOONS",
    poster: "/assets/images/content2.png",
  },
  {
    name: "Filmlar & Seriallar",
    description: "Bolalar uchun filmlar va seriallar",
    key: "MOVIES_SERIES",
    poster: "/assets/images/content3.png",
  },
  {
    name: "Ta'limiy Kontent",
    description: "Ta'limiy materiallar va raqamli kutubxona",
    key: "EDUCATIONAL_CONTENT",
    poster: "/assets/images/content4.png", // URL bilan
  },
  {
    name: "Xorijiy Multfilmlar",
    description: "Xorijiy multfilmlar",
    key: "FOREIGN_CARTOONS",
    poster: "/assets/images/content5.png",
  },
  {
    name: "Qo'shiqlar & Raqslar",
    description: "Qo'shiqlar va raqslar",
    key: "SONGS_DANCES",
    poster: "/assets/images/content6.png",
  },
  {
    name: "Sog'lom Turmush",
    description: "Sog'lom turmush tarzi haqida",
    key: "HEALTHY_LIFESTYLE",
    poster: "/assets/images/content7.png",
  },
  {
    name: "O'yinlar",
    description: "Ta'limiy o'yinlar",
    key: "GAMES",
    poster: "/assets/images/content1.png", // content8 yo'q, content1 ishlatildi
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
    <div className=" flex-1 p-4">
      {isLoading ? (
        <SkeletonCards />
      ) : (
        <div ref={listRef} className="flex flex-wrap gap-6 justify-start ">
          {staticCategories.map(({ key, name, description, poster }, i) => (
            <Card
              key={i}
              title={name}
              poster={poster}
              desc={description}
              onClick={() => {
                router.push(`/profile/${key}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
