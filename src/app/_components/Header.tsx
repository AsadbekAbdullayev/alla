import React from "react";
import { Button } from "antd";
import Navbar from "./navbar";
import { useSearchParams } from "next/navigation";

const Header = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";
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
    <div
      className={`w-full relative min-h-[900px] h-full flex flex-col justify-start overflow-hidden ${
        !isDark && "bg-[#133CCA]"
      }`}
    >
      <Navbar />
      <div className="py-[120px] px-[120px] flex w-full h-full items-center justify-start relative z-10">
        <div>
          <h2 className="text-white text-[64px] font-[900] flex flex-wrap items-end max-w-[922px] leading-[80px]">
            Bolalar uchun{" "}
            <img
              src="/assets/icons/kids.svg"
              alt=""
              className="w-[184px] h-[122px]"
            />{" "}
            xavfsiz
            <span>internet makoni – Alla platformasi</span>
          </h2>
          <p className="text-white text-[22px] font-[500] max-w-[666px] pt-3">
            Bu yerda faqat ta’limiy va tarbiyaviy kontent: multfilmlar,
            qo‘shiqlar, kitoblar va interaktiv mashqlar.
          </p>
          <Button
            className="relative !bg-white  p-4 mt-12 rounded-full text-[#162561] text-[17px] font-[800] max-w-[201px] w-full h-[50px]"
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
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.43 6.59668L20.5 12.6667L14.43 18.7367M3.5 12.6667H20.33"
                stroke="url(#paint1_linear_781_3776)"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                  <stop stop-color="#A580E9" />
                  <stop offset="1" stop-color="#E07FAF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_781_3776"
                  x1="12.178"
                  y1="6.59668"
                  x2="12.178"
                  y2="18.7367"
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
        </div>
      </div>
      {isDark && (
        <img
          src="/assets/images/headerBg.png"
          alt=""
          className="absolute top-0  w-full h-fit"
        />
      )}
      <img
        src="/assets/icons/headerCloud.svg"
        alt=""
        className="absolute top-[191px] right-[108px]"
      />
      <img
        src="/assets/icons/headerSaturn.svg"
        alt=""
        className="absolute top-[271px] right-[171px]"
      />
      <img
        src="/assets/icons/headerSun.svg"
        alt=""
        className="absolute top-[39px] left-0"
      />
      <img
        src="/assets/icons/headerRabbit.svg"
        alt=""
        className="absolute left-[343px] bottom-[204px]"
      />
      <img
        src="/assets/icons/headerRabbit2.svg"
        alt=""
        className="absolute left-0 bottom-0"
      />
    </div>
  );
};

export default Header;
