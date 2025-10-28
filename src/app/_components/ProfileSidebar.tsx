"use client";

import React, { useState, useRef, useEffect } from "react";
import LetterLogo from "@/app/_components/shared/LetterLogo";
import { HomeOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useGetUser } from "@/entities/Profile/api";
import { useParams } from "next/navigation";
import { Menu } from "antd";
import gsap from "gsap";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { category: categoryName } = useParams();
  const pathname = usePathname();
  const [current, setCurrent] = useState("");
  const titleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data } = useGetUser();

  // Current item ni pathname bo'yicha aniqlash
  useEffect(() => {
    if (pathname) {
      // Pathni analiz qilish
      if (pathname === "/profile" || pathname === "/profile/") {
        setCurrent("");
      } else if (pathname.includes("/profile/books")) {
        setCurrent("/books");
      } else if (pathname.includes("/profile/user")) {
        setCurrent("/user");
      } else {
        // Boshqa categorylar uchun
        const pathSegments = pathname.split("/");
        const lastSegment = pathSegments[pathSegments.length - 1];
        setCurrent(lastSegment);
      }
    }
  }, [pathname, categoryName]);

  const categoryItems = [
    {
      key: "",
      icon: <HomeOutlined />,
      label: "Bosh sahifa",
    },
    {
      key: "/books",
      icon: <BookOutlined />,
      label: "Kitoblar",
    },
    {
      key: "/user",
      icon: <UserOutlined />,
      label: "Profil",
    },
  ];

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [collapsed]);

  // Menu item bosilganda
  const handleMenuClick = (info: { key: string }) => {
    setCurrent(info.key);

    // Routing - key bo'yicha URL yaratish
    if (info.key === "") {
      router.push("/profile");
    } else {
      router.push(`/profile${info.key}`);
    }
  };

  return (
    <div
      className={`h-full flex z-10 pt-2 bg-[#1c1c1e] relative flex-col transition-all rounded-[24px] duration-300 ${
        collapsed ? "w-20" : "w-60"
      } bg-[#1a1a1a]`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute top-7 -right-4 cursor-pointer ${
          collapsed ? "rotate-180" : ""
        }`}
        onClick={() => setCollapsed(!collapsed)}
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
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
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
            <stop stop-color="#A580E9" />
            <stop offset="1" stop-color="#E07FAF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="p-4 h-[60px] z-10 relative flex items-center justify-between rounded-[24px]">
        {
          <div className="w-full flex items-center gap-3">
            <LetterLogo
              letter={data?.data?.firstName?.charAt(0)?.toUpperCase() || "U"}
            />
            {!collapsed && (
              <div className="flex flex-col gap-1 ml-1">
                <p
                  className="text-white truncate text-[14px] italic font-bold leading-normal tracking-[0.14px] font-nunito"
                  style={{ textShadow: "0 0 1px #FFF" }}
                >
                  {data?.data?.firstName || "Foydalanuvchi"}
                </p>
                <p className="text-[#979797] truncate  text-[10px] italic font-bold leading-normal tracking-[0.14px] font-nunito">
                  {data?.data?.phoneNumber
                    ?.replace(/\D/g, "")
                    .replace(
                      /^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/,
                      "+$1 $2 $3 $4 $5"
                    ) || "+998 XX XXX XX XX"}
                </p>
              </div>
            )}
          </div>
        }
        {/* ... SVG toggle buttons o'zgarmadi ... */}
      </div>

      <>
        <div className="w-full h-px my-3 min-h-[1px] bg-gradient-to-r from-transparent via-[#A580E9] to-transparent" />

        {!collapsed && (
          <div className="px-4 mb-1 uppercase text-[#979797] text-[10px] italic font-bold leading-[14px] tracking-[0.1px]">
            Asosiy
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          onClick={handleMenuClick}
          items={categoryItems}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "#FFFFFF",
            fontSize: collapsed ? 12 : 14,
            fontWeight: 700,
            fontStyle: "italic",
          }}
          inlineCollapsed={collapsed}
          className="!bg-transparent z-10 select-none !border-none !text-[#979797] !text-[12px] md:!text-[14px]"
        />
      </>
      {!collapsed && (
        <div className="w-full px-3 pb-5">
          <div className="relative inline-block p-[1px] rounded-2xl animate-border-spin  shadow-[0_64px_64px_-32px_rgba(102,37,0,0.65)]">
            {/* Ichki Konteyner (Kontent) - O'zgarishsiz */}
            <div className="relative flex overflow-hidden text-center flex-col items-start gap-1 self-stretch p-6 pt-4 pb-4 w-full h-[400px] rounded-[15px] bg-[#2e1719]">
              <h3 className="text-[14px] font-bold truncate">
                Ilovani hozir yuklab oling!
              </h3>

              <span className="block text-[11px] font-normal opacity-80 ">
                Barcha imkoniyatlardan hoziroq foydalaning.
              </span>

              <Image
                src="/assets/imgs/bg1.png"
                fill
                unoptimized
                alt="rasm1"
                className="absolute !top-[100px] z-30 !left-6 w-16 h-16 rotate-[9.23deg]"
              />

              <Image
                src="/assets/imgs/coverphone2.png"
                fill
                unoptimized
                alt="rasm1"
                className="absolute !top-[112px] z-20 !-left-10 w-16 h-16 rotate-[9.23deg]"
              />

              <Link
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/icons/download_button.svg"
                  fill
                  unoptimized
                  alt="Download button"
                  className="!w-[230px] !h-[80px] !absolute !top-[300px] !z-40 hover:scale-[1.05] duration-300 cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
