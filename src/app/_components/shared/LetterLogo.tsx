"use client";
import React, { memo } from "react";

type LetterLogoProps = {
  letter?: string;
  onClick?: () => {};
  bgColor?: string;
  icon?: React.ReactNode;
  width?: string;
  height?: string;
};

const LetterLogo = ({
  height,
  letter,
  width,
  bgColor,
  icon,
  onClick,
}: LetterLogoProps) => {
  return (
    <div
      onClick={onClick && onClick}
      className={`rounded-full relative ${
        bgColor ? bgColor : "bg-gradient-to-r from-[#9F80C6] to-[#BA7A9C]"
      } ${width ? width : " min-w-12"} ${
        height ? height : " min-h-12"
      }  flex items-center justify-center text-white font-nunito text-[28px] font-bold leading-normal tracking-tight`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        className="absolute top-[4px] right-[5px]"
      >
        <g opacity="0.49">
          <path
            d="M7.25925 3.87119C12.7347 5.19262 15.7358 11.6841 15.286 15.4749M2.98923 2.47781L1.62068 2.03123"
            stroke="white"
            strokeWidth="2.99445"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="10"
        viewBox="0 0 9 10"
        fill="none"
        className="absolute bottom-1 left-2"
      >
        <g opacity="0.5">
          <path
            d="M0.28394 3.41381C-0.0825477 2.51249 0.140332 0.872478 1.02414 0.275312C2.09769 -0.218433 2.41303 1.48417 3.71281 2.49585C5.01259 3.50753 4.5623 5.94294 2.86038 5.70772C1.15847 5.4725 0.650428 4.31513 0.28394 3.41381Z"
            fill="white"
          />
          <path
            d="M8.02528 7.72776C7.93743 8.55214 7.24007 9.18764 6.08604 8.96743C4.49082 8.5278 4.80479 6.67879 5.91162 6.33838C7.01845 5.99796 8.11314 6.90339 8.02528 7.72776Z"
            fill="white"
          />
        </g>
      </svg>

      {icon ? icon : letter || "A"}
    </div>
  );
};

export default memo(LetterLogo);
