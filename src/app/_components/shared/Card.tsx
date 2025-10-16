"use client";
import React, { memo } from "react";
import Image from "next/image";
import TalimiyContent from "../../../../public/assets/imgs/talimiy-content.png";
import LetterLogo from "./LetterLogo";

type CardProps = {
  title?: string;
  desc?: string;
  onClick?: () => {};
  canPerformance?: boolean;
  poster?: string;
  duration?: string;
  isBook?: string;
  isAudioBook?: string;
  totalPage?: number;
};

const Card = ({ title, duration, onClick, desc, poster }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className=" flex relative  min-w-[273px] max-w-[273px] h-[272px] !p-2 flex-col justify-end 
                 items-start rounded-[24px_64px_24px_24px] bg-[#252527] text-white font-nunito 
                 text-[20px] font-bold tracking-tight cursor-pointer overflow-hidden 
                 shadow-[3px_5px_0_0_rgba(7,8,13,0.15),_0_-4px_0_0_rgba(255,106,0,0.13)_inset] 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-[0_0_1px_0px_#9F80C6,0_0_2px_1px_#BA7A9C]"
    >
      <Image
        src={poster || TalimiyContent}
        alt={title || "Image"}
        fill
        className="static object-cover !w-full !h-[162px] rounded-[24px_64px_24px_24px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Qoraytiruvchi fon (gradient) */}

      {/* Textlar */}
      <div className="relative z-10 p-3">
        <h3 className="text-lg font-semibold">{title || "Category"}</h3>
        {duration && (
          <span className="block text-sm font-normal opacity-80">
            {duration}
          </span>
        )}
        {
          <span className="block text-sm font-normal opacity-80 w-[90%]">
            {desc || "O‘zbek hududlariga xos milliy allalarni tinglang "}
          </span>
        }
      </div>

      <div className="absolute right-3 bottom-3 w-fit">
        <LetterLogo
          height="h-[40px]"
          width="w-[40px]"
          bgColor="bg-[#4CA9FF]"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M6.75 13.5L11.25 9L6.75 4.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default memo(Card);
