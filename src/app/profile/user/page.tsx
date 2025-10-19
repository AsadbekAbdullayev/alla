"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProfilePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
      <div ref={listRef} className="flex flex-wrap gap-4">
        User detail
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
