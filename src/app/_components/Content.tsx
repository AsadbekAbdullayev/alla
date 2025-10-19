"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP ScrollTrigger ni registratsiya qilish
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Content = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";

  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const contents = [
    {
      id: 1,
      title: "Turli hududlarga xos allalar",
      desc: "O'zbekistonning turli hududlariga oid allalar, xalq og'zaki ijodi va qo'shiqlar farzandingiz uchun bir joyda.",
      image: "/assets/images/content1.png",
    },
    {
      id: 2,
      title: "Milliy multfilmlar va animatsion kliplar",
      desc: "Mahalliy studiyalar tomonidan yaratilgan qiziqarli multfilmlar va bolajonlarga mos animatsion kliplar.",
      image: "/assets/images/content2.png",
    },
    {
      id: 3,
      title: "Bolalar uchun badiiy filmlar va seriallar",
      desc: "Yosh tomoshabinlar uchun maxsus tanlab olingan quvnoq va tarbiyaviy badiiy filmlar hamda seriallar.",
      image: "/assets/images/content3.png",
    },
    {
      id: 4,
      title: "Ta'limiy kontentlar va raqamli kutubxona",
      desc: "Bolalarning bilimini oshiradigan interaktiv darsliklar, ertaklar va raqamli kutubxona materiallari.",
      image: "/assets/images/content4.png",
    },
    {
      id: 5,
      title: "Tarjima qilingan xorijiy multfilmlar",
      desc: "Dunyoga mashhur multfilmlar o'zbek tilidagi tarjimalarda, bolalar uchun yanada tushunarli va qiziqarli.",
      image: "/assets/images/content5.png",
    },
    {
      id: 6,
      title: "Qo'shiq va raqslar",
      desc: "Bolalar uchun quvnoq qo'shiqlar va raqslar, oilaviy bayram va dam olish vaqtlarini yanada maroqli qiladi.",
      image: "/assets/images/content6.png",
    },
    {
      id: 7,
      title: "Sog'lom turmush tarzini targ'ib etuvchi loyihalar",
      desc: "Sport, gigiyena va sog'lom odatlar haqida qiziqarli ko'rsatuv va loyihalar.",
      image: "/assets/images/content7.png",
    },
    {
      id: 8,
      title: "Interaktiv o'yinlar va mashqlar",
      desc: "Bolalarning kognitiv qobiliyatlarini rivojlantiruvchi interaktiv o'yinlar va mashqlar.",
      image: "/assets/images/content7.png",
    },
  ];

  useEffect(() => {
    // Sarlavha va tavsif animatsiyasi
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Kartochkalar animatsiyasi
    cardsRef.current.forEach((card: any, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover animatsiyasi
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

    return () => {
      // Cleanup
      cardsRef.current.forEach((card: any) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <div
      className={`relative z-10 pt-[80px] px-[120px] pb-[278px] w-full flex flex-col items-center min-h-[1000px] ${
        isDark ? "" : "bg-gradient-to-b from-[#133CCA] to-[#C6D0F2]"
      }`}
    >
      <div className="max-w-[700px] w-full">
        <h2
          ref={titleRef}
          className="text-white text-[48px] font-[800] text-center"
        >
          📚 Bolajonlar uchun bilim va maroqli kontent
        </h2>
        <p
          ref={descRef}
          className="text-[#FFFFFFCC] text-[20px] font-[500] leading-[28px] text-center pt-[20px]"
        >
          Alla platformasi 7 ta maxsus bo'limdan iborat bo'lib, unda milliy
          allalar, multfilmlar, badiiy filmlar, ta'limiy materiallar, xorijiy
          tarjima multfilmlar, qo'shiqlar va sog'lom turmush tarziga oid
          loyihalar jamlangan.
        </p>
      </div>

      <div className="w-full flex items-center justify-center flex-wrap gap-[20px] pt-[80px] relative z-30">
        {contents?.map((item, index) => (
          <div
            key={item?.id}
            className={`max-w-[285px] w-full h-[434px] rounded-[16px] flex flex-col items-center p-5 transition-all duration-100 cursor-pointer ${
              isDark
                ? "bg-[#436EFF45] hover:bg-[#436EFF65] hover:shadow-2xl hover:shadow-blue-500/20"
                : "bg-white hover:bg-blue-50 hover:shadow-2xl hover:shadow-blue-200/50"
            }`}
            style={{
              transform: "translateY(0)",
              transition: "all 0.3s ease",
            }}
          >
            <span
              className={`text-[48px] font-[400] leading-[68%] pb-[24px] transition-all duration-300 ${
                isDark ? "text-white" : "text-[#505050]"
              }`}
              style={{ fontFamily: "Barcelona" }}
            >
              #0{item?.id}
            </span>

            <img
              src={item.image}
              alt={item.title}
              className="transition-all duration-300 "
            />

            <p
              className={`text-[22px] font-[800] leading-[28px] pt-6 text-center transition-all duration-300 ${
                isDark ? "text-[#FFDBDB]" : "text-[#505050]"
              }`}
            >
              {item?.title}
            </p>

            <p
              className={`text-[14px] font-[600] leading-[20px] pt-4 text-center line-clamp-3 transition-all duration-300 ${
                isDark ? "text-[#FFDBDBE5]" : "text-[#505050CC]"
              }`}
            >
              {item?.desc}
            </p>
          </div>
        ))}
      </div>

      <img
        src="/assets/icons/cloud.svg"
        alt=""
        className="absolute top-1 left-0"
      />
      <img
        src="/assets/icons/questionMark.svg"
        alt=""
        className="absolute right-[200px] top-8"
      />
    </div>
  );
};

export default Content;
