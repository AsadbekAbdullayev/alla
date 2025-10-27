"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { Button, Drawer, Switch } from "antd";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useState } from "react";

gsap.registerPlugin(Physics2DPlugin);

export default function Navbar() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const { phoneNumber } = useSelector((e: RootState) => e.generel.userDetails);
  const themeParam = searchParams.get("theme") || "light";
  const isDark = themeParam === "dark";

  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("theme", checked ? "dark" : "light");
    router.replace(`?${params.toString()}`);
  };

  return (
    <nav className="py-3 px-[64px] flex items-center justify-between border-b border-[#D1DBFF1F] relative z-10 max-sm:px-4">
      {/* Left logo and theme toggle */}
      <div className="flex items-center gap-2 max-lg:hidden">
        <div
          className="w-[72px] h-[55px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/assets/icons/logoLight.svg"
            alt="Logo"
            width={82}
            height={55}
            priority
          />
        </div>
      </div>

      {/* Center nav links */}
      <div className="max-lg:hidden">
        <ul className="flex items-center">
          <li className="py-2 px-4 cursor-pointer text-[18px] font-[700] text-white">
            Imkoniyatlar
          </li>
          <li className="py-2 px-4 cursor-pointer text-[18px] font-[700] text-white">
            Xavfsizlik
          </li>
          <li className="py-2 px-4 cursor-pointer text-[18px] font-[700] text-white">
            Biz haqimizda
          </li>
        </ul>
      </div>

      {/* Burger button for mobile */}
      <Button
        type="text"
        className="hidden max-lg:flex relative z-50"
        onClick={() => setDrawerOpen(true)}
      >
        <Image
          src="/assets/icons/burgerMenu.svg"
          alt="Menu"
          width={32}
          height={32}
        />
      </Button>

      {/* Profile button */}
      <Link href={phoneNumber ? "/profile" : "/login"}>
        <Button
          className="relative p-4 !bg-white rounded-full text-[#162561] text-[17px] font-[800] max-w-[174px] w-full h-[50px]"
          style={{
            boxShadow:
              "-1px -4px 0px 0px #004CFF1C inset, 1px 1px 1px 0px #004CFF4D inset",
          }}
        >
          Profilga kirish
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 min-w-5"
          >
            <path
              d="M11.68 14.756L14.24 12.196L11.68 9.63599M4 12.196H14.17M12 4.13599C16.42 4.13599 20 7.13599 20 12.136C20 17.136 16.42 20.136 12 20.136"
              stroke="url(#paint0_linear_781_3788)"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_781_3788"
                x1="12.1675"
                y1="4.13599"
                x2="12.1675"
                y2="20.136"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#253575" />
                <stop offset="1" stopColor="#162561" />
              </linearGradient>
            </defs>
          </svg>
        </Button>
      </Link>

      {/* Drawer for mobile menu */}
      <Drawer
        placement="left"
        closable
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={"100%"}
        className="relative z-50"
      >
        <div className="flex flex-col h-full">
          <ul className="flex-1 px-6 py-4 space-y-2">
            <li>
              <Link
                href="#"
                className="block py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100"
                onClick={() => setDrawerOpen(false)}
              >
                Imkoniyatlar
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100"
                onClick={() => setDrawerOpen(false)}
              >
                Xavfsizlik
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100"
                onClick={() => setDrawerOpen(false)}
              >
                Biz haqimizda
              </Link>
            </li>
          </ul>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-gray-700 font-medium">
              {isDark ? "Kunduzgi rejim" : "Tungi rejim"}
            </span>
            <Switch checked={isDark} onChange={handleToggle} />
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
