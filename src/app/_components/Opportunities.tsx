"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP ScrollTrigger ni registratsiya qilish
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Opportunitites = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const rectangle1Ref = useRef(null);
  const rectangle2Ref = useRef(null);
  const kidsRef = useRef(null);
  const treeRef = useRef(null);
  const pupilRef = useRef(null);

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

    // Birinchi rectangle animatsiyasi
    gsap.fromTo(
      rectangle1Ref.current,
      {
        opacity: 0,
        x: -100,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rectangle1Ref.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Ikkinchi rectangle animatsiyasi
    gsap.fromTo(
      rectangle2Ref.current,
      {
        opacity: 0,
        x: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rectangle2Ref.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Dekorativ elementlar animatsiyasi
    if (kidsRef.current) {
      gsap.fromTo(
        kidsRef.current,
        { opacity: 0, x: -50, y: -50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: kidsRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (treeRef.current) {
      gsap.fromTo(
        treeRef.current,
        { opacity: 0, x: 50, y: -50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.7,
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

    if (pupilRef.current) {
      gsap.fromTo(
        pupilRef.current,
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: pupilRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Doimiy kichik aylanish animatsiyasi
      gsap.to(pupilRef.current, {
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Rectangle hover animatsiyalari
    const rectangles = [rectangle1Ref.current, rectangle2Ref.current];
    rectangles.forEach((rect: any) => {
      if (rect) {
        rect.addEventListener("mouseenter", () => {
          gsap.to(rect, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        rect.addEventListener("mouseleave", () => {
          gsap.to(rect, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

    return () => {
      // Cleanup
      rectangles.forEach((rect: any) => {
        if (rect) {
          rect.removeEventListener("mouseenter", () => {});
          rect.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <div
      className={`p-[120px] w-full flex flex-col items-center relative ${
        isDark ? "" : "bg-gradient-to-b from-[#C6D0F2] to-[#F2F6F5]"
      }`}
    >
      <div>
        <h2
          ref={titleRef}
          className="text-white text-[48px] font-[800] leading-[56px] text-center"
        >
          Platforma imkoniyatlari
        </h2>
        <p
          ref={descRef}
          className="text-[#FFFFFFCC] text-[20px] leading-[28px] font-[500] text-center max-w-[700px] pt-[20px]"
        >
          Alla – bolalar uchun yaratilgan xavfsiz va quvnoq media platforma
          bo'lib, unda ota-onalar uchun qulayliklar, bolalar uchun esa bilim va
          maroqli vaqt o'tkazish imkoniyatlari mavjud.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-[-35px] mt-[80px]">
        {/* Birinchi rectangle */}
        <div
          ref={rectangle1Ref}
          className="max-w-[1200px] w-full h-[282px] flex items-start gap-[30px] px-9 transition-all duration-300 cursor-pointer"
          style={{
            background: isDark
              ? `url(${"/assets/icons/rectangle1.svg"})`
              : `url(${"/assets/icons/rectagle1Light.svg"})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2
            className={`${
              isDark ? "text-white" : "text-[#3D3D3D]"
            } text-[48px] font-[900] leading-[60px] max-w-[251px] w-full mt-[64px] transition-colors duration-300`}
          >
            <span className={isDark ? "" : "text-[#89C423]"}>Ota-onalar</span>{" "}
            nazorati
          </h2>
          <div className="max-w-[270px] mt-[74px] h-[118px]">
            <p
              className={`${
                isDark ? "text-white" : "text-[#505050]"
              } text-[24px] font-[800] leading-[36px] transition-colors duration-300`}
            >
              Yoshga mos tavsiyalar
            </p>
            <p
              className={`${
                isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
              } text-[16px] font-[600] pt-3 transition-colors duration-300`}
            >
              Farzandingiz ko'radigan kontentni siz belgilaysiz. Yoshga mos
              filtrlar yordamida faqat foydali va xavfsiz materiallarni tanlash
              mumkin.
            </p>
          </div>
          <div className="max-w-[270px] mt-[35px]">
            <p
              className={`${
                isDark ? "text-white" : "text-[#505050]"
              } text-[24px] font-[800] leading-[36px] transition-colors duration-300`}
            >
              Xavfsiz kontent muhiti
            </p>
            <p
              className={`${
                isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
              } text-[16px] font-[600] pt-3 transition-colors duration-300`}
            >
              Platformada zararli yoki nomaqbul materiallar yo'q. Bolalar
              bemalol ko'rishi mumkin bo'lgan kontent ehtiyotkorlik bilan tanlab
              qo'yilgan.
            </p>
          </div>
          <div className="max-w-[270px] mt-[74px] mr-[-20px]">
            <p
              className={`${
                isDark ? "text-white" : "text-[#505050]"
              } text-[24px] font-[800] leading-[36px] transition-colors duration-300`}
            >
              Xavsizlik
            </p>
            <p
              className={`${
                isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
              } text-[16px] font-[600] pt-3 transition-colors duration-300`}
            >
              Farzandingiz ko'radigan kontentni siz belgilaysiz. Yoshga mos
              filtrlar yordamida faqat foydali va xavfsiz materiallarni tanlash
              mumkin.
            </p>
          </div>
        </div>

        {/* Ikkinchi rectangle */}
        <div
          ref={rectangle2Ref}
          className="max-w-[1200px] w-full h-[282px] flex items-start gap-[30px] px-9 transition-all duration-300 cursor-pointer"
          style={{
            background: isDark
              ? `url(${"/assets/icons/rectangle2.svg"})`
              : `url(${"/assets/icons/rectangle2Light.svg"})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2
            className={`${
              isDark ? "text-white" : "text-[#3D3D3D]"
            } text-[48px] font-[900] leading-[60px] max-w-[251px] w-full mt-[94px] transition-colors duration-300`}
          >
            <span className={isDark ? "" : "text-[#89C423]"}>Raqamli</span>{" "}
            kutubxona
          </h2>
          <div className="max-w-[270px] mt-[104px] h-[118px]">
            <p
              className={`${
                isDark ? "text-white" : "text-[#505050]"
              } text-[24px] font-[800] leading-[36px] transition-colors duration-300`}
            >
              Interaktiv tavsiyalar
            </p>
            <p
              className={`${
                isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
              } text-[16px] font-[600] pt-3 transition-colors duration-300`}
            >
              Interaktiv ertaklar, darsliklar va ta'limiy videolar orqali
              farzandingiz bilimini oshiradi va qiziqishlarini kengaytiradi.
            </p>
          </div>
          <div className="max-w-[270px] mt-[65px] ml-[20px]">
            <p
              className={`${
                isDark ? "text-white" : "text-[#505050]"
              } text-[24px] font-[800] leading-[36px] transition-colors duration-300`}
            >
              Ko'p turdagi media
            </p>
            <p
              className={`${
                isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
              } text-[16px] font-[600] pt-3 transition-colors duration-300`}
            >
              Allalar, qo'shiqlar, raqslar, milliy va xorijiy multfilmlar,
              badiiy filmlar – barchasi bir joyda jamlangan.
            </p>
          </div>
          <div className="max-w-[270px] mt-[104px] mr-[-20px]">
            <p
              className={`${
                isDark ? "text-white" : "text-[#505050]"
              } text-[24px] font-[800] leading-[36px] transition-colors duration-300`}
            >
              Milliy qadriyatlar targ'iboti
            </p>
            <p
              className={`${
                isDark ? "text-[#FFFFFFCC]" : "text-[#505050CC]"
              } text-[16px] font-[600] pt-3 transition-colors duration-300`}
            >
              Alla bolalarga milliy qadriyatlarni singdiruvchi, tarbiyaviy va
              foydali kontentlarni taqdim etadi.
            </p>
          </div>
        </div>
      </div>

      {/* Dekorativ elementlar */}
      <img
        ref={kidsRef}
        src="/assets/icons/kids2.svg"
        alt=""
        className="absolute top-0 left-0 transition-all duration-300"
      />

      <svg
        className="absolute top-[97px] left-[250px] transition-all duration-300"
        width="112"
        height="108"
        viewBox="0 0 112 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M81.0492 4.9385C92.1202 9.8915 101.324 19.2735 106.47 30.2175C111.396 40.6945 112.483 52.7375 109.829 63.9895C107.186 75.1765 101.548 85.4155 92.9672 93.1415C87.4452 98.1155 80.9832 101.945 74.0442 104.401C73.3742 104.664 72.7072 104.911 72.0292 105.122C61.1972 108.643 49.4652 108.663 38.6672 105.042C27.0192 101.13 16.7592 93.1325 9.83523 83.0155C2.86323 72.8305 -1.02478 60.5155 0.235223 48.1545C1.35922 37.1425 6.27723 26.4895 13.7412 18.3435C30.2192 0.341503 58.8602 -4.9915 81.0492 4.9385ZM100.306 24.0525C100.187 24.2105 100.024 24.3285 99.8322 24.3645C97.8722 24.6965 95.8442 24.4655 93.8532 24.5725C92.0162 24.6705 90.1702 24.8765 88.3512 25.1795C84.4932 25.8275 80.7092 26.9615 77.0982 28.4795C70.7332 31.1475 64.8552 35.1405 60.1492 40.1965C55.1622 45.5715 51.7792 52.1235 47.9162 58.2915C43.9232 64.6845 39.2412 70.4225 32.5392 74.1195C25.9692 77.7365 18.4882 79.5615 11.0532 80.1325C12.9582 83.0865 15.1132 85.8605 17.4722 88.4145C20.8732 92.1125 24.7732 95.2915 29.0092 97.9235C30.6982 91.1195 35.2192 85.0165 40.7382 80.7875C46.5092 76.3625 53.4652 74.6375 60.3112 72.5985C67.6142 70.4055 74.9102 67.8395 81.5832 64.1205C93.4112 57.5105 103.285 46.7445 104.881 32.8455C104.9 32.7295 104.939 32.6435 104.979 32.5565C103.693 29.5945 102.126 26.7465 100.306 24.0525ZM99.3913 22.7595C97.1853 19.7315 94.6422 17.0035 91.8412 14.6055C91.6442 14.7765 91.3722 14.8845 91.0462 14.8565C82.8612 14.2625 74.5412 16.3575 67.4492 20.4645C61.1622 24.1105 55.7282 29.3705 52.2242 35.7755C50.1692 39.5385 48.7252 43.6045 46.7702 47.4255C45.1772 50.5355 43.2132 53.4325 40.8602 56.0115C32.2292 65.4905 18.3662 71.3955 5.52422 69.0825C6.86422 72.7485 8.61523 76.2785 10.6972 79.5995C19.5852 77.9705 28.6102 75.8645 35.8722 70.1935C42.0722 65.3725 45.9842 58.4415 49.9292 51.8205C53.5492 45.7395 57.4332 39.9635 62.7842 35.2585C67.8682 30.7885 73.8892 27.3195 80.3052 25.1675C83.4502 24.1155 86.7002 23.3515 89.9902 22.9075C92.9432 22.5175 96.4243 22.0535 99.3913 22.7595ZM108.241 42.9485C107.797 40.6905 107.171 38.4625 106.418 36.2815C105.091 42.1705 102.179 47.6985 98.3913 52.3715C92.3653 59.8035 84.3772 64.9925 75.7302 68.7775C71.2332 70.7435 66.5532 72.3325 61.8762 73.6415C54.7442 75.6675 47.4982 77.2515 41.4832 81.8235C35.8902 86.0915 32.2382 91.9045 29.8072 98.4265C32.6852 100.143 35.7152 101.604 38.8622 102.762C40.8972 96.5825 44.1632 90.8575 48.7422 86.2125C56.3772 78.4675 66.4532 74.3405 76.2972 70.0735C78.6042 69.0705 80.8942 68.0645 83.1432 67.0015C93.6252 62.0425 104.016 54.8505 107.922 43.3965C107.99 43.1865 108.114 43.0545 108.241 42.9485ZM89.4002 12.6475C84.1642 8.7255 78.1622 5.8635 71.7122 4.2415C68.7102 3.4875 65.6492 2.9955 62.5502 2.7345C61.9422 8.5715 60.0212 14.1595 56.9032 19.1375C54.0902 23.6485 50.3432 27.6085 45.9622 30.6265C40.9502 34.0835 35.1852 35.9855 29.4392 37.7725C23.7282 39.5485 17.9372 41.3535 12.9072 44.6635C10.6472 46.1565 8.54122 47.9045 6.81722 50.0015C5.04022 52.1665 3.91623 54.5315 2.88323 57.1235C2.85823 57.1705 2.83022 57.1905 2.79122 57.2185C3.15622 61.0465 4.00422 64.8185 5.27322 68.4475C13.0022 68.9325 20.7122 67.6705 27.6812 64.2035C34.0132 61.0645 39.5602 56.2465 43.3742 50.2735C45.6372 46.7395 47.1252 42.7735 48.8332 38.9545C50.3592 35.5285 52.1562 32.2575 54.4522 29.2965C62.7272 18.6335 75.9442 12.3355 89.4002 12.6475ZM109.091 55.9765C109.319 52.8725 109.219 49.7565 108.842 46.6795C106.623 51.5505 103.068 55.6775 98.8863 59.0325C89.0033 66.9515 76.9222 70.6575 65.6482 76.0545C59.4192 79.0325 53.4942 82.7385 48.7572 87.8325C44.7062 92.2005 41.5462 97.3825 39.6002 103.018C42.0742 103.888 44.6282 104.586 47.2242 105.077C48.4392 105.311 49.6722 105.487 50.9112 105.63C56.8602 104.104 62.9562 102.662 68.3452 99.5895C72.7822 97.0545 76.0542 93.4655 78.6492 89.0965C80.8842 85.3205 82.7082 81.3175 85.1042 77.6445C89.8212 70.3965 97.9522 65.1625 106.888 66.9635C106.977 66.9865 107.038 67.0305 107.118 67.0605C108.154 63.4625 108.82 59.7515 109.091 55.9765ZM61.0112 2.6175C58.5592 2.4875 56.0932 2.4995 53.6352 2.6645C53.7192 2.8225 53.7682 2.9915 53.7142 3.2195C52.7772 7.4445 50.8612 11.3405 48.1762 14.7115C43.2952 20.8405 36.2482 25.1925 28.8802 27.6795C24.1402 29.2675 19.2192 30.2575 14.6042 32.2205C10.5712 33.9405 7.32724 36.3735 4.57024 39.6665C3.06824 44.7055 2.37224 49.9945 2.63024 55.2535C3.92624 50.4355 8.01422 46.4625 11.9802 43.7585C21.9132 36.9825 34.6132 36.2225 44.5872 29.5045C53.5912 23.4395 59.6582 13.3715 61.0112 2.6175ZM103.917 75.3875C104.96 73.2545 105.844 71.0615 106.575 68.8185C101.304 68.1675 95.9612 69.1995 91.7332 72.5725C84.8262 78.0905 82.5282 87.3265 77.1472 94.0765C71.2012 101.538 62.0172 104.153 53.0102 105.838C54.5992 105.962 56.1892 106.028 57.7822 106.017C59.9172 105.34 62.1022 104.818 64.2222 104.081C66.4872 103.283 68.6862 102.312 70.8202 101.23C75.2762 98.9445 79.4852 95.9915 83.0282 92.4555C86.6312 88.8615 89.3522 84.5465 92.8712 80.8965C95.8892 77.7665 99.4433 75.2995 103.917 75.3875ZM51.9662 2.9335C51.9842 2.8775 52.0152 2.8395 52.0232 2.7905C35.7582 4.3215 20.1072 12.4575 10.8832 26.2345C8.67123 29.5565 6.84625 33.1535 5.48425 36.9275C7.59825 34.5635 10.4812 32.7825 13.2552 31.4575C17.5622 29.4095 22.2382 28.2605 26.7572 26.7305C30.7212 25.3805 34.5452 23.6935 38.0632 21.3985C44.6902 17.0715 50.2262 10.8215 51.9662 2.9335ZM103.853 75.5205C98.8482 76.6585 94.9092 80.2905 91.7732 84.1895C88.7252 87.9675 85.8242 91.6685 82.1422 94.8685C78.6262 97.9345 74.7022 100.537 70.5002 102.568C68.7002 103.425 66.7752 104.271 64.7982 104.964C65.8882 104.718 66.9812 104.457 68.0662 104.144C79.5292 100.853 89.8732 94.6685 97.5042 85.3985C100.019 82.3375 102.136 79.0255 103.853 75.5205Z"
          fill="white"
          fillOpacity="0.08"
        />
      </svg>

      <img
        ref={treeRef}
        src="/assets/icons/tree.svg"
        alt=""
        className="absolute top-0 right-0 transition-all duration-300"
      />

      <img
        ref={pupilRef}
        src="/assets/icons/pupil.svg"
        alt=""
        className="absolute top-[226px] right-[160px] transition-all duration-300"
      />
    </div>
  );
};

export default Opportunitites;
