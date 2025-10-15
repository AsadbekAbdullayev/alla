"use client";

import { useEffect, useRef } from "react";
import { List, Card } from "antd";
import { gsap } from "gsap";
import Navbar from "@/app/_components/navbar";
import Footer from "@/app/_components/footer";

export default function ProfilePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 🟢 Mock data
  const mockVideos = [
    {
      id: 1,
      title: "Yulduzli Tun",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Tabiat Go‘zalligi",
      url: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      title: "Harakatdagi Nur",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

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
    <div className="min-h-screen flex flex-col ">
      <main className="flex-1 pt-28 pb-16 px-6 md:px-16">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-12 text-yellow-400"
        >
          Mening videolarim 🎥
        </h2>

        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {mockVideos.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              className="video-card bg-gray-800 text-white border border-gray-700 rounded-2xl overflow-hidden shadow-lg"
              styles={{
                header: {
                  color: "#FFD700",
                  fontWeight: "bold",
                  background: "#111",
                },
              }}
            >
              <video
                controls
                src={item.url}
                style={{
                  width: "100%",
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              />
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
