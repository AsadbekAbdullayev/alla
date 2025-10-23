"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Button } from "antd";
import Navbar from "./navbar";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";

const Header = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isLight = theme === "light";

  const refs = {
    kids: useRef<HTMLImageElement | null>(null),
    yojik: useRef<HTMLImageElement | null>(null),
    title: useRef<HTMLHeadingElement | null>(null),
    desc: useRef<HTMLParagraphElement | null>(null),
    button: useRef<HTMLButtonElement | null>(null),
    bg: useRef<HTMLImageElement | null>(null),
    cloud: useRef<HTMLImageElement | null>(null),
    saturn: useRef<HTMLImageElement | null>(null),
    sun: useRef<HTMLImageElement | null>(null),
    rabbit1: useRef<HTMLImageElement | null>(null),
    rabbit2: useRef<HTMLImageElement | null>(null),
  };

  const { phoneNumber } = useSelector((e: RootState) => e.generel.userDetails);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      refs.title.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        refs.desc.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        refs.button.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

    if (refs.kids.current)
      gsap.to(refs.kids.current, {
        rotation: 5,
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    if (refs.yojik.current && isLight) {
      gsap.fromTo(
        refs.yojik.current,
        { opacity: 0, x: 100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5,
        }
      );
      gsap.to(refs.yojik.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (isLight) {
      const floaters = [refs.cloud, refs.rabbit1, refs.rabbit2];
      floaters.forEach((r, i) => {
        if (r.current)
          gsap.to(r.current, {
            y: -15 - i * 5,
            x: i * 10,
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i,
          });
      });
      if (refs.saturn.current)
        gsap.to(refs.saturn.current, {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
        });
      if (refs.sun.current)
        gsap.to(refs.sun.current, {
          rotation: 180,
          duration: 20,
          repeat: -1,
          ease: "none",
          yoyo: true,
        });
    }

    // ✅ cleanup function qaytariladi
    return () => {
      tl.kill();
    };
  }, [isLight]);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-start overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #133CCA 0%, #4767d6 63.33%)",
      }}
    >
      <Navbar />

      {!isLight && (
        <Image
          ref={refs.bg}
          src="/assets/images/headerBg.jpg"
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
      )}

      <div className="py-[120px] px-[120px] flex justify-between items-center h-full relative z-10 max-lg:px-10 max-sm:px-4">
        <div className="max-w-[50%] max-lg:max-w-full">
          <h2
            ref={refs.title}
            className="text-white text-[64px] font-extrabold leading-[80px] max-sm:text-[28px] max-sm:leading-[30px]"
          >
            <span className="flex items-end gap-4">
              Bolalar uchun
              <Image
                ref={refs.kids}
                src="/assets/icons/kids.svg"
                alt="Bolalar"
                width={184}
                height={122}
                className="max-sm:hidden"
              />
            </span>
            <span>xavfsiz internet makoni</span>
            <span>– Alla platformasi</span>
          </h2>

          <p
            ref={refs.desc}
            className="text-white text-[22px] font-medium pt-6 max-w-[666px]"
          >
            Bu yerda faqat ta’limiy va tarbiyaviy kontent: multfilmlar,
            qo‘shiqlar, kitoblar va interaktiv mashqlar.
          </p>

          <Link href={phoneNumber ? "/profile" : "/login"}>
            <Button
              ref={refs.button}
              className="relative !bg-white mt-12 rounded-full text-[#162561] font-extrabold text-[17px] w-[201px] h-[50px]"
            >
              Hoziroq boshlash →
            </Button>
          </Link>
        </div>

        {isLight && (
          <div className="flex justify-end max-w-[50%]">
            <Image
              ref={refs.yojik}
              src="/assets/images/yojik.png"
              alt="Yojik"
              width={500}
              height={500}
              className="object-contain max-sm:hidden"
              priority
            />
          </div>
        )}
      </div>

      {isLight && (
        <>
          <img
            ref={refs.cloud}
            src="/assets/icons/headerCloud.svg"
            className="absolute top-[191px] right-[108px] w-[200px]"
            alt="Cloud"
          />
          <img
            ref={refs.sun}
            src="/assets/icons/headerSun.svg"
            className="absolute top-[39px] left-0 w-[180px] opacity-30"
            alt="Sun"
          />
          <img
            ref={refs.rabbit1}
            src="/assets/icons/headerRabbit.svg"
            className="absolute left-[343px] bottom-[204px] w-[120px] opacity-30"
            alt="Rabbit"
          />
          <img
            ref={refs.rabbit2}
            src="/assets/icons/headerRabbit2.svg"
            className="absolute left-0 bottom-0 w-[150px] opacity-30"
            alt="Rabbit"
          />
          <img
            ref={refs.saturn}
            src="/assets/icons/headerSaturn.svg"
            className="absolute right-[471px] top-[771px] w-[150px] opacity-30"
            alt="Saturn"
          />
        </>
      )}
    </div>
  );
};

export default Header;
