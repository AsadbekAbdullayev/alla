"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// GSAP ScrollTrigger ni registratsiya qilish
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ChildSecurity = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const securityCardsRef = useRef([]);
  const treeRef = useRef(null);
  const knightRef = useRef(null);

  const security = [
    {
      id: 1,
      title: "Faol nazorat",
      desc: "Platformada har bir kontent mutaxassislar tomonidan tekshiriladi. Zararli, bolalarga yaramaydigan materiallarga qat'iy yo'l qo'yilmaydi.",
      icon: isDark
        ? "/assets/icons/security.svg"
        : "/assets/icons/securityLight.svg",
    },
    {
      id: 2,
      title: "Yoshga mos filtrlash",
      desc: "Farzandingizning yoshi bo'yicha moslangan maxsus filtrlar yordamida unga faqat tarbiyaviy va qiziqarli kontent ko'rsatiladi.",
      icon: isDark
        ? "/assets/icons/security2.svg"
        : "/assets/icons/securityLight2.svg",
    },
    {
      id: 3,
      title: "Ota-onalar boshqaruvi",
      desc: "Ota-onalar bolalarning ko'rish vaqtini nazorat qilishlari, istalgan vaqtda cheklovlar qo'yishlari mumkin.",
      icon: isDark
        ? "/assets/icons/security3.svg"
        : "/assets/icons/securityLight3.svg",
    },
    {
      id: 4,
      title: "Xavfsiz media muhiti",
      desc: "Alla – bu reklamalarsiz, zo'ravonlik va nomaqbul obrazlarsiz maxsus bolajonlar maydoni.",
      icon: isDark
        ? "/assets/icons/security4.svg"
        : "/assets/icons/securityLight4.svg",
    },
    {
      id: 5,
      title: "Ishonchli kontent",
      desc: "Har bir multfilm, qo'shiq yoki o'quv materiali bolaning rivojlanishiga ijobiy ta'sir ko'rsatishga qaratilgan.",
      icon: isDark
        ? "/assets/icons/security5.svg"
        : "/assets/icons/securityLight5.svg",
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
    securityCardsRef.current.forEach((card: any, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            rotation:
              index === 0 ? -10 : index === 1 ? 5 : index === 2 ? -5 : 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotation: index === 0 ? -4 : 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.15,
            ease: "back.out(1.4)",
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
            y: -10,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: isDark
              ? "0 20px 40px rgba(67, 110, 255, 0.3)"
              : "0 20px 40px rgba(0, 0, 0, 0.1)",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "none",
          });
        });
      }
    });

    // Dekorativ elementlar animatsiyasi
    if (treeRef.current) {
      gsap.fromTo(
        treeRef.current,
        { opacity: 0, x: 100, y: -50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: treeRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (knightRef.current) {
      gsap.fromTo(
        knightRef.current,
        { opacity: 0, x: -100, y: 50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: knightRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Knight uchun doimiy kichik harakat
      gsap.to(knightRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      // Cleanup
      securityCardsRef.current.forEach((card: any) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, [isDark]);

  return (
    <div
      id="childSecurity"
      className={`p-[120px] w-full flex flex-col items-center relative max-sm:px-5 max-lg:px-10 ${
        isDark ? "" : "bg-gradient-to-b from-[#F2F6F5] to-[#C2D9C6]"
      }`}
    >
      <div className="relative z-10">
        <h2
          ref={titleRef}
          className="text-white text-[48px] font-[800] leading-[56px] text-center"
        >
          Bolalar xavfsizligi
        </h2>
        <p
          ref={descRef}
          className="text-[#FFFFFFCC] text-[20px] leading-[28px] font-[500] text-center max-w-[700px] pt-[20px]"
        >
          Alla platformasida farzandingiz faqat xavfsiz, foydali va yoshiga mos
          kontentni ko'radi – zararli materiallarga bu yerda joy yo'q.
        </p>
      </div>

      <div>
        {/* Birinchi qator - 3 ta kartochka */}
        <div className="flex flex-wrap max-sm:justify-center gap-[24px] pt-[80px] justify-end pb-[24px] relative z-10">
          {security.slice(0, 3).map((item, index) => (
            <div
              key={item.id}
              className={`p-6 transition-all duration-300 cursor-pointer ${
                isDark
                  ? "bg-[#436EFF45] hover:bg-[#436EFF65]"
                  : "bg-white hover:bg-blue-50"
              } max-w-[309px] w-full min-h-[262px] rounded-lg max-sm:max-w-full max-xl:max-w-full ${
                item?.id === 1
                  ? "-rotate-[4deg] hover:rotate-0 max-sm:rotate-0 max-xl:rotate-0"
                  : "hover:rotate-1"
              }`}
              style={{
                transform: item?.id === 1 ? (window.innerWidth < 1200 ? "rotate(0)" : "rotate(-4deg)") : "none",
                transition: "all 0.3s ease",
              }}
            >
              <Image
                src={item.icon}
                alt=""
                width={64}
                loading="lazy"
                height={64}
                className={`transition-transform duration-300 hover:scale-110 ${
                  item?.id === 1 ? "rotate-[4deg] hover:rotate-0" : ""
                }`}
              />

              <h2
                className={`text-[24px] font-[700] leading-[28px] pt-[24px] transition-colors duration-300 ${
                  isDark ? "text-white" : "text-[#505050]"
                }`}
              >
                {item.title}
              </h2>
              <p
                className={`text-[16px] font-[500] pt-[10px] leading-[100%] transition-colors duration-300 ${
                  isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Ikkinchi qator - 2 ta kartochka */}
        <div className="flex flex-wrap gap-[24px] pt-[24px]">
          {security.slice(3, 5).map((item, index) => (
            <div
              key={item.id}
              className={`p-6 transition-all duration-300 cursor-pointer ${
                isDark
                  ? "bg-[#436EFF45] hover:bg-[#436EFF65]"
                  : "bg-white hover:bg-blue-50"
              } max-w-[484px] w-full min-h-[262px] max-xl:max-w-full rounded-lg hover:-translate-y-2`}
              style={{
                transition: "all 0.3s ease",
              }}
            >
              <Image
                src={item.icon}
                alt=""
                width={64}
                loading="lazy"
                height={64}
                className="transition-transform duration-300 hover:scale-110"
              />
              <h2
                className={`text-[24px] font-[700] leading-[28px] pt-[24px] transition-colors duration-300 ${
                  isDark ? "text-white" : "text-[#505050]"
                }`}
              >
                {item.title}
              </h2>
              <p
                className={`text-[16px] font-[500] pt-[24px] leading-[130%] transition-colors duration-300 ${
                  isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dekorativ elementlar */}
      <Image
        ref={treeRef}
        src={isDark ? "/assets/icons/tree.svg" : "/assets/icons/treeLight.svg"}
        alt=""
        width={200}
        loading="lazy"
        height={200}
        className="absolute top-0 right-0 transition-all duration-300"
      />

      <Image
        ref={knightRef}
        src="/assets/icons/knight.svg"
        alt=""
        width={200}
        loading="lazy"
        height={200}
        className="absolute top-[89px] left-[81px] transition-all duration-300 max-sm:top-0 max-sm:left-0 max-sm:w-[150px]"
      />
    </div>
  );
};

export default ChildSecurity;
