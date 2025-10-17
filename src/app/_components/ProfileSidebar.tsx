"use client";

import React, { useState, useRef, useEffect } from "react";
import LetterLogo from "@/app/_components/shared/LetterLogo";
import Coverphone1 from "../../../public/assets/imgs/bg1.png";
import Coverphone2 from "../../../public/assets/imgs/coverphone2.png";
import DownloadButton from "../../../public/assets/icons/download_button.svg";
import {
  PlayCircleOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useParams } from "next/navigation";
import { Menu } from "antd";
import gsap from "gsap";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { category: categoryName } = useParams();
  const [current, setCurrent] = useState(categoryName);
  const titleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const categoryItems = [
    {
      key: "",
      icon: <HomeOutlined />,
      label: "Bosh sahifa",
    },
    {
      key: "/download",
      icon: <PlayCircleOutlined />,
      label: "Yuklanganlar",
    },
    {
      key: "/user",
      icon: <UserOutlined />,
      label: "Profil",
    },
  ];

  // Animate "Alla Dashboard" title
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [collapsed]);

  return (
    <div
      className={`h-full flex z-10 pt-2 bg-[#1c1c1e] relative flex-col transition-all rounded-[24px] duration-300 ${
        collapsed ? "w-20" : "w-60"
      } bg-[#1a1a1a]`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="222"
        height="207"
        viewBox="0 0 222 207"
        fill="none"
        className="absolute z-[1] top-[-20px]"
        style={{
          fill: "radial-gradient(50% 50% at 50% 50%, #A580E9 0%, rgba(224, 127, 175, 0.00) 100%)",
          filter: "blur(30px)",
        }}
      >
        <g filter="url(#filter0_f_862_3405)">
          <circle cx="42" cy="27" r="80" fill="url(#paint0_radial_862_3405)" />
        </g>
        <defs>
          <filter
            id="filter0_f_862_3405"
            x="-138"
            y="-153"
            width="360"
            height="360"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_862_3405"
            />
          </filter>
          <radialGradient
            id="paint0_radial_862_3405"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(42 27) rotate(90) scale(80)"
          >
            <stop stopColor="#A580E9" />
            <stop offset="1" stopColor="#E07FAF" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div className="p-4 h-[60px] z-10 relative flex items-center justify-between rounded-[24px]">
        {
          <div className="w-full flex items-center gap-3">
            <LetterLogo />
            {!collapsed && (
              <div className="flex flex-col gap-1 ml-1">
                <p
                  className="text-white truncate text-[14px] italic font-bold leading-normal tracking-[0.14px] font-nunito"
                  style={{ textShadow: "0 0 1px #FFF" }}
                >
                  Asadbek
                </p>
                <p className="text-[#979797] truncate  text-[10px] italic font-bold leading-normal tracking-[0.14px] font-nunito">
                  +998 90 123 45 67
                </p>
              </div>
            )}
          </div>
        }
        {collapsed ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute rotate-180 right-[-10px] cursor-pointer hover:shadow-xl"
            onClick={() => setCollapsed(false)}
          >
            <rect
              width="24"
              height="24"
              rx="12"
              fill="url(#paint0_linear_862_3449)"
            />
            <path
              d="M14 17.28L9.65333 12.9333C9.13999 12.42 9.13999 11.58 9.65333 11.0666L14 6.71997"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_862_3449"
                x1="0"
                y1="12"
                x2="24"
                y2="12"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A580E9" />
                <stop offset="1" stopColor="#E07FAF" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-[-10px] cursor-pointer hover:shadow-xl"
            onClick={() => setCollapsed(true)}
          >
            <rect
              width="24"
              height="24"
              rx="12"
              fill="url(#paint0_linear_862_3449)"
            />
            <path
              d="M14 17.28L9.65333 12.9333C9.13999 12.42 9.13999 11.58 9.65333 11.0666L14 6.71997"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_862_3449"
                x1="0"
                y1="12"
                x2="24"
                y2="12"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A580E9" />
                <stop offset="1" stopColor="#E07FAF" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      <>
        <div className="w-full h-px my-3 min-h-[1px] bg-gradient-to-r from-transparent via-[#A580E9] to-transparent" />

        {!collapsed && (
          <div className="px-4 mt-1 uppercase text-[#979797] text-[10px] italic font-bold leading-[14px] tracking-[0.1px]">
            Asosiy
          </div>
        )}

        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={typeof current === "string" ? [current] : []}
          onClick={(info) => {
            setCurrent(info.key);
            router.push(`/profile/${info.key}`);
          }}
          items={categoryItems}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "#979797",
            fontSize: collapsed ? 12 : 14,
          }}
          inlineCollapsed={collapsed}
          className="!bg-transparent z-10 select-none  !border-none !text-[#979797] !text-[12px] md:!text-[14px]"
        />
      </>
      <div className="w-full px-3 pb-5">
        <div className="relative flex overflow-hidden text-center flex-col items-start gap-1 self-stretch p-6 pt-4 pb-4 w-full h-[400px] rounded-2xl border  border-[#A580E9] bg-gradient-to-r from-[rgba(165,128,233,0.10)] to-[rgba(224,127,175,0.10)] shadow-[0_64px_64px_-32px_rgba(102,37,0,0.65)]">
          <h3 className="text-[14px] font-bold truncate">
            Ilovani hozir yuklab oling!
          </h3>

          <span className="block text-[11px] font-normal opacity-80 ">
            Barcha imkoniyatlardan hoziroq foydalaning.
          </span>

          <Image
            src={Coverphone1}
            fill
            unoptimized
            alt="rasm1"
            className="absolute !top-[100px] z-30 !left-6 w-16 h-16 rotate-[9.23deg]"
          />

          <Image
            src={Coverphone2}
            fill
            unoptimized
            alt="rasm1"
            className="absolute !top-[112px] z-20 !-left-10 w-16 h-16 rotate-[9.23deg]"
          />

          <Image
            src={DownloadButton}
            fill
            unoptimized
            alt="rasm1"
            className="!w-[230px] !h-[80px] !absolute !top-[300px] !z-40 hover:scale-[1.05] duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
