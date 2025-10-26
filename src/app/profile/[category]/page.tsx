"use client";

import { useEffect, useRef } from "react";
import SkeletonCards from "@/app/_components/shared/SkeletonCard";
import { useVideosByCategory } from "@/entities/Videos/api";
import { useRouter, useParams } from "next/navigation";
import Card from "@/app/_components/shared/Card";
import { useDispatch } from "react-redux";
import { setBreadcrumb, BreadcrumbItem } from "@/redux/slices/generelSlice";
import { gsap } from "gsap";

export default function ProfilePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { category } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: videos, isLoading: videosLoading } = useVideosByCategory(
    category as string
  );

  useEffect(() => {
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

  useEffect(() => {
    const lowerStr = String(category)?.toLowerCase();
    const newBreadcrumb: BreadcrumbItem[] = [
      { title: "Bosh sahifa", href: "/profile" },
      { title: lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1), href: "" },
    ];

    dispatch(setBreadcrumb(newBreadcrumb));
  }, [category]);

  return (
    <div className="min-h-screen flex-1 p-6 md:px-16">
      {videosLoading ? (
        <SkeletonCards />
      ) : (
        <div ref={listRef} className="flex flex-wrap gap-4">
          {!videos?.content?.length ? (
            <div className="w-full h-full flex justify-center pt-24 items-center ">
              <h3 className="text-lg font-semibold truncate">
                Malumotlar topilmadi 🙁
              </h3>
            </div>
          ) : (
            videos?.content?.map(
              ({ title, duration, thumbnailUrl, id }: any) => {
                const poster = thumbnailUrl?.split("/")?.pop();

                return (
                  <Card
                    key={id}
                    title={title}
                    canPerformance
                    duration={duration}
                    bgColor={"bg-[#FF8B2D]"}
                    poster={`https://api.alla.itic.uz/api/stream/image/${
                      poster || ""
                    }`}
                    onClick={() => {
                      router.push(`/profile/${category}/${id}`);
                    }}
                  />
                );
              }
            )
          )}
        </div>
      )}
    </div>
  );
}
