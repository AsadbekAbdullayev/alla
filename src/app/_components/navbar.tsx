"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { Button, Switch } from "antd";
import Link from "next/link";
import gsap from "gsap";

gsap.registerPlugin(Physics2DPlugin);

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { phoneNumber } = useSelector((e: RootState) => e.generel.userDetails);
  const themeParam = searchParams.get("theme") || "light";
  const isDark = themeParam === "dark";
  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("theme", checked ? "dark" : "light");

    router.replace(`?${params.toString()}`);
  };

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
    <nav className="py-3 px-[64px] flex items-center justify-between border-b border-[#D1DBFF1F] h-fit relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-[72px] h-[55px]">
          <img
            src="/assets/icons/logoLight.svg"
            alt=""
            onClick={() => router.push("/")}
          />
        </div>
        <Switch checked={isDark} onChange={handleToggle} />
      </div>
      <div>
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
      <Link href={phoneNumber ? "/profile" : "./login"}>
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
          {buttonItem1}
          {buttonItem2}
        </Button>
      </Link>
    </nav>
  );
}
