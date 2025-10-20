import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { Button } from "antd";
import Navbar from "./navbar";
import Link from "next/link";
import gsap from "gsap";

const Header = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "light"; // light theme uchun SVG'lar ko'rsatiladi

  // Reflar
  const kidsImageRef = useRef(null);
  const yojikImageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const headerBgRef = useRef(null);
  const cloudRef = useRef(null);
  const saturnRef = useRef(null);
  const sunRef = useRef(null);
  const rabbit1Ref = useRef(null);
  const rabbit2Ref = useRef(null);
  const { phoneNumber } = useSelector((e: RootState) => e.generel.userDetails);

  useEffect(() => {
    const tl = gsap.timeline();

    // Asosiy elementlar animatsiyasi
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

    // Kids SVG animatsiyasi
    if (kidsImageRef.current) {
      gsap.to(kidsImageRef.current, {
        rotation: 5,
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Yojik rasm animatsiyasi
    if (yojikImageRef.current && isDark) {
      gsap.fromTo(
        yojikImageRef.current,
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

      gsap.to(yojikImageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Background image animatsiya
    if (headerBgRef.current && isDark) {
      gsap.fromTo(
        headerBgRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );
    }

    // SVG animatsiyalari - faqat light theme uchun
    if (isDark) {
      // Cloud animatsiya
      if (cloudRef.current) {
        gsap.to(cloudRef.current, {
          x: 30,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Saturn animatsiya
      if (saturnRef.current) {
        gsap.to(saturnRef.current, {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
        });
      }

      // Sun animatsiya
      if (sunRef.current) {
        gsap.to(sunRef.current, {
          rotation: 180,
          duration: 20,
          repeat: -1,
          ease: "none",
          y: -10,
          yoyo: true,
        });
      }

      // Rabbit 1 animatsiya
      if (rabbit1Ref.current) {
        gsap.to(rabbit1Ref.current, {
          y: -25,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Rabbit 2 animatsiya
      if (rabbit2Ref.current) {
        gsap.to(rabbit2Ref.current, {
          y: -15,
          x: 10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }
    }

    return () => {
      tl.kill();
    };
  }, [isDark]);

  const buttonItem1 = (
    <svg
      className="absolute top-2 left-1"
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M5.27622 1.57058C6.08565 1.03066 7.73702 0.919873 8.49941 1.66585C9.19856 2.61847 7.59389 3.2691 6.86364 4.74547C6.13339 6.22184 3.65716 6.26946 3.54604 4.55497C3.43492 2.84047 4.46679 2.11049 5.27622 1.57058Z"
          fill="url(#paint0_linear_781_3787)"
        />
        <path
          d="M2.60363 10.0202C1.7784 10.0996 1.01587 9.54393 1 8.36919C1.11055 6.71819 2.98494 6.65469 3.54057 7.67069C4.09619 8.68669 3.42887 9.94081 2.60363 10.0202Z"
          fill="url(#paint1_linear_781_3787)"
        />
        <path
          d="M5.27622 1.57058C6.08565 1.03066 7.73702 0.919873 8.49941 1.66585C9.19856 2.61847 7.59389 3.2691 6.86364 4.74547C6.13339 6.22184 3.65716 6.26946 3.54604 4.55497C3.43492 2.84047 4.46679 2.11049 5.27622 1.57058Z"
          stroke="url(#paint2_linear_781_3787)"
        />
        <path
          d="M5.27622 1.57058C6.08565 1.03066 7.73702 0.919873 8.49941 1.66585C9.19856 2.61847 7.59389 3.2691 6.86364 4.74547C6.13339 6.22184 3.65716 6.26946 3.54604 4.55497C3.43492 2.84047 4.46679 2.11049 5.27622 1.57058Z"
          stroke="url(#paint3_linear_781_3787)"
        />
        <path
          d="M2.60363 10.0202C1.7784 10.0996 1.01587 9.54393 1 8.36919C1.11055 6.71819 2.98494 6.65469 3.54057 7.67069C4.09619 8.68669 3.42887 9.94081 2.60363 10.0202Z"
          stroke="url(#paint4_linear_781_3787)"
        />
        <path
          d="M2.60363 10.0202C1.7784 10.0996 1.01587 9.54393 1 8.36919C1.11055 6.71819 2.98494 6.65469 3.54057 7.67069C4.09619 8.68669 3.42887 9.94081 2.60363 10.0202Z"
          stroke="url(#paint5_linear_781_3787)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_781_3787"
          x1="1"
          y1="5.58181"
          x2="8.67188"
          y2="5.58181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8768E5" />
          <stop offset="1" stopColor="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_781_3787"
          x1="1"
          y1="5.58181"
          x2="8.67188"
          y2="5.58181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8768E5" />
          <stop offset="1" stopColor="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_781_3787"
          x1="1"
          y1="5.58181"
          x2="8.67188"
          y2="5.58181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8768E5" />
          <stop offset="1" stopColor="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_781_3787"
          x1="4.91627"
          y1="1.13599"
          x2="4.91627"
          y2="10.0276"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#253575" />
          <stop offset="1" stopColor="#162561" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_781_3787"
          x1="1"
          y1="5.58181"
          x2="8.67188"
          y2="5.58181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8768E5" />
          <stop offset="1" stopColor="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_781_3787"
          x1="4.91627"
          y1="1.13599"
          x2="4.91627"
          y2="10.0276"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#253575" />
          <stop offset="1" stopColor="#162561" />
        </linearGradient>
      </defs>
    </svg>
  );

  const buttonItem2 = (
    <svg
      className="absolute top-[3px] right-1"
      width="28"
      height="17"
      viewBox="0 0 28 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.49">
        <path
          d="M10.121 2.7269C17.622 2.13599 24.123 9.13599 25.1227 14.1362M4.1211 2.72691L2.19811 2.72691"
          stroke="url(#paint0_linear_781_3786)"
          strokeOpacity="0.5"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_781_3786"
          x1="14.7524"
          y1="3.13725"
          x2="13.314"
          y2="12.2779"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#253575" />
          <stop offset="1" stopColor="#162561" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div
      className={`w-full relative min-h-screen h-full flex flex-col justify-start overflow-hidden`}
      style={{
        background: "linear-gradient(180deg, #133CCA 0%, #4767d6 63.33%)",
      }}
    >
      <Navbar />

      {/* Dark Theme Background */}
      {!isDark && (
        <img
          ref={headerBgRef}
          src="/assets/images/headerBg.png"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
        />
      )}

      <div className="py-[120px] px-[120px] flex w-full h-full items-center justify-between relative z-10">
        {/* Text Content - Left Side */}
        <div className="max-w-[50%]">
          <h2
            ref={titleRef}
            className="text-white text-[64px] font-[900] flex flex-col items-start max-w-[922px] leading-[80px]"
          >
            <span className="flex items-end gap-4">
              Bolalar uchun
              <img
                ref={kidsImageRef}
                src="/assets/icons/kids.svg"
                alt="Bolalar"
                className="w-[184px] h-[122px]"
              />
            </span>
            <span className="flex items-end">xavfsiz internet makoni</span>
            <span>– Alla platformasi</span>
          </h2>
          <p
            ref={descriptionRef}
            className="text-white text-[22px] font-[500] max-w-[666px] pt-6"
          >
            Bu yerda faqat ta'limiy va tarbiyaviy kontent: multfilmlar,
            qo'shiqlar, kitoblar va interaktiv mashqlar.
          </p>
          <Link href={phoneNumber ? "/profile" : "./login"}>
            <Button
              ref={buttonRef}
              className="relative !bg-white p-4 mt-12 rounded-full text-[#162561] text-[17px] font-[800] max-w-[201px] w-full h-[50px] overflow-visible"
              style={{
                boxShadow:
                  "-1px -4px 0px 0px #0000001C inset, 1px 1px 1px 0px #FF8A8C4D inset",
              }}
            >
              Hoziroq boshlash
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.43 6.59668L20.5 12.6667L14.43 18.7367M3.5 12.6667H20.33"
                  stroke="url(#paint0_linear_781_3776)"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.43 6.59668L20.5 12.6667L14.43 18.7367M3.5 12.6667H20.33"
                  stroke="url(#paint1_linear_781_3776)"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_781_3776"
                    x1="3.5"
                    y1="12.6667"
                    x2="20.5"
                    y2="12.6667"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#A580E9" />
                    <stop offset="1" stopColor="#E07FAF" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_781_3776"
                    x1="12.178"
                    y1="6.59668"
                    x2="12.178"
                    y2="18.7367"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#253575" />
                    <stop offset="1" stopColor="#162561" />
                  </linearGradient>
                </defs>
              </svg>
              {buttonItem1}
              {buttonItem2}
            </Button>
          </Link>
        </div>

        {/* Image - Right Side */}
        {isDark && (
          <div className="flex justify-end max-w-[50%]">
            <img
              ref={yojikImageRef}
              src="/assets/images/yojik.png"
              alt="Yojik"
              className="w-[500px] h-[500px] object-contain"
            />
          </div>
        )}
      </div>

      {/* SVG Elements - Faqat Light Theme uchun */}
      {isDark && (
        <>
          <img
            ref={cloudRef}
            src="/assets/icons/headerCloud.svg"
            alt="Cloud"
            className="absolute opacity-90 top-[191px] right-[108px] w-[200px] h-auto z-20"
          />
          {/* <img
            ref={saturnRef}
            src="/assets/icons/headerSaturn.svg"
            alt="Saturn"
            className="absolute opacity-30 top-[271px] right-[171px] w-[150px] h-auto z-20"
          /> */}
          <img
            ref={sunRef}
            src="/assets/icons/headerSun.svg"
            alt="Sun"
            className="absolute opacity-30 top-[39px] left-0 w-[180px] h-auto z-20"
          />
          <img
            ref={rabbit1Ref}
            src="/assets/icons/headerRabbit.svg"
            alt="Rabbit"
            className="absolute opacity-30 left-[343px] bottom-[204px] w-[120px] h-auto z-20"
          />
          <img
            ref={rabbit2Ref}
            src="/assets/icons/headerRabbit2.svg"
            alt="Rabbit"
            className="absolute opacity-30 left-0 bottom-0 w-[150px] h-auto z-20"
          />
          {/* === */}
          <img
            ref={saturnRef}
            src="/assets/icons/headerSaturn.svg"
            alt="Saturn"
            className="absolute opacity-30 top-[771px] right-[471px] w-[150px] h-auto z-20"
          />

          <img
            ref={rabbit1Ref}
            src="/assets/icons/headerVector.svg"
            alt="Rabbit"
            className="absolute opacity-30 right-[743px] top-[184px] w-[120px] h-auto z-20"
          />
        </>
      )}
    </div>
  );
};

export default Header;
