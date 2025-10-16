"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Card from "@/app/_components/shared/Card";
import { useCategories } from "@/entities/Categories/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { data: categories, isLoading } = useCategories();
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen flex-1 p-6 md:px-16">
      {isLoading ? (
        "Loading"
      ) : (
        <div ref={listRef} className="flex flex-wrap gap-4">
          User detail
        </div>
      )}
    </div>
  );
}
