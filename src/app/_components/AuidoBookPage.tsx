// AudioPlayerPage.tsx
"use client"; //
import React from "react";
import WaveformComponent from "@/app/_components/shared/WaveformPlayer";
import Image from "next/image";

interface AudioPlayerPageProps {
  coverImageUrl: string;
  bookTitle: string;
}

const AudioPlayerPage: React.FC<AudioPlayerPageProps> = ({
  coverImageUrl,
  bookTitle,
}) => {
  return (
    <div className=" bg-inherit text-white relative overflow-hidden">
      <div className=" flex flex-col items-center w-full max-w-sm mx-auto relative z-20 px-6">
        <div className="relative w-fit h-fit min-h-[320px] min-w-[280px] overflow-hidden !rounded-2xl ">
          <Image
            src={coverImageUrl}
            alt={bookTitle}
            width={286}
            className="!z-20 min-h-[320px] min-w-[280px]  !rounded-2xl"
            height={321}
          />
        </div>

        <h1 className="text-[20px] font-extrabold mt-4 text-center">
          {bookTitle || "test"}
        </h1>

        <WaveformComponent />
      </div>
    </div>
  );
};

export default AudioPlayerPage;
