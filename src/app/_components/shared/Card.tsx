"use client";
import React, { memo } from "react";
import Image from "next/image";
// TalimiyContent importini O'CHIRING va URL bilan ishlang
import LetterLogo from "./LetterLogo";
import { formatDuration } from "@/lib";

type CardProps = {
  title?: string;
  desc?: string;
  onClick?: () => void;
  canPerformance?: boolean;
  poster?: any;
  duration?: string;
  isBook?: boolean;
  isAudioBook?: boolean;
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
  isBook,
  isAudioBook,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className=" flex relative  min-w-[273px] max-w-[273px] h-[272px] !p-2 flex-col justify-start 
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
          src={poster || "/assets/imgs/talimiy-content.png"} // URL bilan
          alt={title || "Image"}
          fill
          unoptimized
          className=" object-cover !w-full !h-[162px] rounded-[24px_64px_24px_24px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {(isBook || isAudioBook) && (
        <div className="w-full flex gap-3 p-1">
          {isBook && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M12.4915 0.666626H5.50817C2.47484 0.666626 0.666504 2.47496 0.666504 5.50829V12.4833C0.666504 15.525 2.47484 17.3333 5.50817 17.3333H12.4832C15.5165 17.3333 17.3248 15.525 17.3248 12.4916V5.50829C17.3332 2.47496 15.5248 0.666626 12.4915 0.666626ZM8.58317 13.375C8.58317 13.675 8.28317 13.875 8.00817 13.7583C6.99984 13.325 5.68317 12.925 4.7665 12.8083L4.60817 12.7916C4.09984 12.725 3.68317 12.25 3.68317 11.7333V5.31663C3.68317 4.67496 4.19984 4.19996 4.83317 4.24996C5.87484 4.33329 7.4165 4.83329 8.38317 5.38329C8.5165 5.45829 8.58317 5.59996 8.58317 5.74163V13.375ZM14.3165 11.725C14.3165 12.2416 13.8998 12.7166 13.3915 12.7833L13.2165 12.8C12.3082 12.925 10.9998 13.3166 9.9915 13.7416C9.7165 13.8583 9.4165 13.6583 9.4165 13.3583V5.73329C9.4165 5.58329 9.4915 5.44163 9.62484 5.36663C10.5915 4.82496 12.0998 4.34163 13.1248 4.24996H13.1582C13.7998 4.24996 14.3165 4.76663 14.3165 5.40829V11.725Z"
                fill="white"
              />
              <path
                d="M12.4915 0.666626H5.50817C2.47484 0.666626 0.666504 2.47496 0.666504 5.50829V12.4833C0.666504 15.525 2.47484 17.3333 5.50817 17.3333H12.4832C15.5165 17.3333 17.3248 15.525 17.3248 12.4916V5.50829C17.3332 2.47496 15.5248 0.666626 12.4915 0.666626ZM8.58317 13.375C8.58317 13.675 8.28317 13.875 8.00817 13.7583C6.99984 13.325 5.68317 12.925 4.7665 12.8083L4.60817 12.7916C4.09984 12.725 3.68317 12.25 3.68317 11.7333V5.31663C3.68317 4.67496 4.19984 4.19996 4.83317 4.24996C5.87484 4.33329 7.4165 4.83329 8.38317 5.38329C8.5165 5.45829 8.58317 5.59996 8.58317 5.74163V13.375ZM14.3165 11.725C14.3165 12.2416 13.8998 12.7166 13.3915 12.7833L13.2165 12.8C12.3082 12.925 10.9998 13.3166 9.9915 13.7416C9.7165 13.8583 9.4165 13.6583 9.4165 13.3583V5.73329C9.4165 5.58329 9.4915 5.44163 9.62484 5.36663C10.5915 4.82496 12.0998 4.34163 13.1248 4.24996H13.1582C13.7998 4.24996 14.3165 4.76663 14.3165 5.40829V11.725Z"
                fill="#04B55F"
              />
            </svg>
          )}

          {isAudioBook && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M1.29152 14.5417C0.949849 14.5417 0.666515 14.2584 0.666515 13.9167V9.16671C0.624849 6.90837 1.46652 4.77504 3.03318 3.17504C4.59985 1.58337 6.69985 0.708374 8.95818 0.708374C13.5748 0.708374 17.3332 4.46671 17.3332 9.08337V13.8334C17.3332 14.175 17.0499 14.4584 16.7082 14.4584C16.3665 14.4584 16.0832 14.175 16.0832 13.8334V9.08337C16.0832 5.15837 12.8915 1.95837 8.95818 1.95837C7.03318 1.95837 5.24985 2.70004 3.92485 4.05004C2.59152 5.40837 1.88318 7.21671 1.91652 9.15004V13.9084C1.91652 14.2584 1.64152 14.5417 1.29152 14.5417Z"
                fill="#04B55F"
              />
              <path
                d="M3.94985 9.37504H3.84152C2.09152 9.37504 0.666515 10.8 0.666515 12.55V14.1167C0.666515 15.8667 2.09152 17.2917 3.84152 17.2917H3.94985C5.69985 17.2917 7.12485 15.8667 7.12485 14.1167V12.55C7.12485 10.8 5.69985 9.37504 3.94985 9.37504Z"
                fill="#04B55F"
              />
              <path
                d="M14.1582 9.37504H14.0498C12.2998 9.37504 10.8748 10.8 10.8748 12.55V14.1167C10.8748 15.8667 12.2998 17.2917 14.0498 17.2917H14.1582C15.9082 17.2917 17.3332 15.8667 17.3332 14.1167V12.55C17.3332 10.8 15.9082 9.37504 14.1582 9.37504Z"
                fill="#04B55F"
              />
            </svg>
          )}
        </div>
      )}

      <div className="relative z-10 px-1">
        <h3 className="text-lg font-semibold line-clamp-2">
          {title || "Category"}
        </h3>

        {duration && (
          <span className="block text-sm font-normal opacity-80">
            {`${formatDuration(Number(duration))} minut`}
          </span>
        )}

        {
          <span className="block text-sm font-normal opacity-80  !line-clamp-2">
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
