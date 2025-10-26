"use client";

import { useEffect, useRef, useState } from "react";
import SkeletonCards from "@/app/_components/shared/SkeletonCard";
import { useRouter } from "next/navigation";
import Card from "@/app/_components/shared/Card";
import { useGetBooks } from "@/entities/Books/api";
import { gsap } from "gsap";

export default function ProfilePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetBooks({ page: 0, size: 100 });
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

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
          {data?.data?.content?.map((item: any, i: number) => {
            const poster = item?.coverImageUrl?.split("/")?.pop();
            return (
              <Card
                key={i}
                title={item.title}
                poster={`https://api.alla.itic.uz/api/stream/image/${
                  poster || ""
                }`}
                isAudioBook={item?.audioUrl}
                isBook={item?.pdfUrl}
                duration={item?.duration || "120"}
                bgColor={"bg-[#FF8B2D]"}
                onClick={() => {
                  router.push(`/profile/books/${item.id}`);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
