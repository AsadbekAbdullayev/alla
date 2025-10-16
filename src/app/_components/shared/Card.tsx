"use client";
import React, { memo } from "react";
import Image from "next/image";
import TalimiyContent from "../../../../public/assets/imgs/talimiy-content.png";
import LetterLogo from "./LetterLogo";
import { formatDuration } from "@/lib";
type CardProps = {
  title?: string;
  desc?: string;
  onClick?: () => void;
  canPerformance?: boolean;
  poster?: string;
  duration?: string;
  isBook?: string;
  isAudioBook?: string;
  totalPage?: number;
  bgColor?: string;
};

const Card = ({
  title,
  duration,
  onClick,
  desc,
  poster,
  canPerformance,
  bgColor,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className=" flex relative  min-w-[273px] max-w-[273px] h-[272px] !p-2 flex-col justify-end 
                 items-start rounded-[24px_64px_24px_24px] bg-[#252527] text-white font-nunito 
                 text-[20px] font-bold tracking-tight cursor-pointer overflow-hidden 
                 shadow-[3px_5px_0_0_rgba(7,8,13,0.15),_0_-4px_0_0_rgba(255,106,0,0.13)_inset] 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-[0_0_1px_0px_#9F80C6,0_0_2px_1px_#BA7A9C] italic hover:scale-[1.02]"
    >
      <div className="relative !w-full !h-[162px]">
        {canPerformance && (
          <div className="absolute z-10 flex items-center justify-center top-[60px] left-[105px] w-12 h-12 rounded-full bg-[rgba(0,0,0,0.25)] border border-white shadow-[inset_-0.344px_0.344px_0.344px_-0.687px_rgba(255,255,255,0.35)] backdrop-blur-[4.7px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M12.2054 2.76465C6.68544 2.76465 2.20544 7.24465 2.20544 12.7646C2.20544 18.2846 6.68544 22.7646 12.2054 22.7646C17.7254 22.7646 22.2054 18.2846 22.2054 12.7646C22.2054 7.24465 17.7354 2.76465 12.2054 2.76465ZM15.2054 14.9946L12.3054 16.6646C11.9454 16.8746 11.5454 16.9746 11.1554 16.9746C10.7554 16.9746 10.3654 16.8746 10.0054 16.6646C9.28544 16.2446 8.85544 15.5046 8.85544 14.6646V11.3146C8.85544 10.4846 9.28544 9.73465 10.0054 9.31465C10.7254 8.89465 11.5854 8.89465 12.3154 9.31465L15.2154 10.9846C15.9354 11.4046 16.3654 12.1446 16.3654 12.9846C16.3654 13.8246 15.9354 14.5746 15.2054 14.9946Z"
                fill="white"
              />
            </svg>
          </div>
        )}
        <Image
          src={poster || TalimiyContent}
          alt={title || "Image"}
          fill
          unoptimized
          className=" object-cover !w-full !h-[162px] rounded-[24px_64px_24px_24px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Qoraytiruvchi fon (gradient) */}

      {/* Textlar */}
      <div className="relative z-10 p-3">
        <h3 className="text-lg font-semibold truncate">
          {title || "Category"}
        </h3>

        {duration && (
          <span className="block text-sm font-normal opacity-80">
            {`${formatDuration(Number(duration))} minut`}
          </span>
        )}

        {
          <span className="block text-sm font-normal opacity-80 w-[90%] !line-clamp-2">
            {desc || ""}
          </span>
        }
      </div>

      <div className="absolute right-3 bottom-3 w-fit">
        <LetterLogo
          height="h-[38px]"
          width="w-[38px]"
          bgColor={bgColor || "bg-[#4CA9FF]"}
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
