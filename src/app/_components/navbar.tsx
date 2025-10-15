"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { Button } from "antd";
// import Logo from '@/assets/icons/logo.svg';


gsap.registerPlugin(Physics2DPlugin);

export default function Navbar() {
  const router = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleStarClick = () => {
    /* if (!bgRef.current || !iconRef.current) return;

    const stars: SVGSVGElement[] = [];
    for (let i = 0; i < 30; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 512.001 512.001");
      svg.classList.add("star");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M511.266,197.258c-1.764-5.432-6.458-9.389-12.108-10.209l-158.722-23.066L269.452,20.156 c-2.527-5.121-7.741-8.361-13.451-8.361c-5.709,0-10.924,3.24-13.451,8.361l-70.988,143.826L12.843,187.049 c-5.649,0.82-10.345,4.777-12.108,10.207c-1.765,5.432-0.293,11.393,3.795,15.377l114.848,111.955L92.27,482.67 c-0.965,5.629,1.349,11.315,5.968,14.672c4.619,3.355,10.741,3.799,15.797,1.141L256,423.845l141.961,74.637 c2.195,1.154,4.591,1.723,6.979,1.723c3.11,0,6.206-0.965,8.818-2.863c4.619-3.357,6.933-9.045,5.968-14.672L392.61,324.588 l114.86-111.955C511.559,208.648,513.031,202.687,511.266,197.258z"
      );
      svg.appendChild(path);
      bgRef.current.appendChild(svg);
      stars.push(svg);
    }

    gsap.set(stars, {
      x: 90,
      y: 0,
      scale: "random(0.3, 1)",
      fill: "#FFD700",
    });

    gsap.to(stars, {
      duration: 2,
      physics2D: {
        velocity: "random(250, 380)",
        angle: "random(240, 300)", // yulduzlar yon tomonga otiladi
        gravity: 400,
      },
      rotation: 190,
      onComplete: () => {
        stars.forEach((star) => star.remove());
        router.push("/profile");
      },
    }); */
    router.push("/login");
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
          <stop stop-color="#8768E5" />
          <stop offset="1" stop-color="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_781_3787"
          x1="1"
          y1="5.58181"
          x2="8.67188"
          y2="5.58181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8768E5" />
          <stop offset="1" stop-color="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_781_3787"
          x1="1"
          y1="5.58181"
          x2="8.67188"
          y2="5.58181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8768E5" />
          <stop offset="1" stop-color="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_781_3787"
          x1="4.91627"
          y1="1.13599"
          x2="4.91627"
          y2="10.0276"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#253575" />
          <stop offset="1" stop-color="#162561" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_781_3787"
          x1="1"
          y1="5.58181"
          x2="8.67188"
          y2="5.58181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8768E5" />
          <stop offset="1" stop-color="#002E93" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_781_3787"
          x1="4.91627"
          y1="1.13599"
          x2="4.91627"
          y2="10.0276"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#253575" />
          <stop offset="1" stop-color="#162561" />
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
          stroke-opacity="0.5"
          stroke-width="4"
          stroke-linecap="round"
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
          <stop stop-color="#253575" />
          <stop offset="1" stop-color="#162561" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <>
      {/* <nav className="w-full bg-[#0f0f0f] shadow-md p-4 flex justify-between items-center relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/favicon.png" alt="logo" className="w-7 h-7" />
          <h1 className="font-semibold text-lg">Alla</h1>
        </div>

        <div
          ref={bgRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        ></div>

        <button
          onClick={handleStarClick}
          className="relative bg-[#1d243a] text-white px-5 py-2 rounded-md font-mono hover:bg-[#181e30] transition"
        >
          <div ref={iconRef} className="inline-block mr-2">
            ⭐
          </div>
          Profile
        </button>
      </nav> */}
      <nav className="py-3 px-[64px] flex items-center justify-between border-b border-[#D1DBFF1F] h-fit relative z-10">
        <img src="/assets/icons/logo.svg" alt="" onClick={() => router.push("/")} />
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
        <Button
          onClick={handleStarClick}
          className="relative p-4 rounded-full text-[#162561] text-[17px] font-[800] max-w-[174px] w-full h-[50px]"
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
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                <stop stop-color="#253575" />
                <stop offset="1" stop-color="#162561" />
              </linearGradient>
            </defs>
          </svg>
          {buttonItem1}
          {buttonItem2}
        </Button>
      </nav>
    </>
  );
}
