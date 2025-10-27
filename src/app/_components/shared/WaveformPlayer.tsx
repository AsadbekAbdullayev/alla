"use client";

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import { useParams } from "next/navigation";

interface WaveformPlayerProps {}

const createGradient = (width: number): CanvasGradient => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  const color1 = "rgba(165, 128, 233, 0.8)";
  const color2 = "rgba(224, 127, 175, 0.8)";
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  return gradient;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const WaveformPlayer: React.FC<WaveformPlayerProps> = () => {
  const { id } = useParams();
  const waveformRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const token = localStorage.getItem("token");
  const audioUrl = `https://api.alla.itic.uz/api/stream/audio/${id}?token=${token}`;

  const wavesurferOptions: Partial<WaveSurferOptions> = {
    height: 50,
    normalize: true,
    cursorColor: "#ddd5e9",
    waveColor: "#34262e",
    cursorWidth: 1,
    barWidth: 4,
    barGap: 2,
    barRadius: 5,
    minPxPerSec: 1,
    fillParent: true,
    url: audioUrl,
    mediaControls: false,
    autoplay: false,
    interact: true,
    dragToSeek: true,
    hideScrollbar: true,
    audioRate: 1,
    autoScroll: true,
    autoCenter: true,
  };

  useEffect(() => {
    if (!containerRef.current || !audioUrl) {
      return;
    }

    const wavesurfer = WaveSurfer.create({
      ...wavesurferOptions,
      container: containerRef.current,
    } as WaveSurferOptions);

    waveformRef.current = wavesurfer;

    wavesurfer.on("ready", () => {
      const width = wavesurfer.getWidth();
      const progressColorGradient = createGradient(width);
      wavesurfer.setOptions({
        progressColor: progressColorGradient,
      });

      setDuration(wavesurfer.getDuration());
    });

    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => setIsPlaying(false));
    wavesurfer.on("finish", () => setIsPlaying(false));

    wavesurfer.on("timeupdate", (currentTime) => {
      setCurrentTime(currentTime);
    });

    wavesurfer.on("decode", () => {
      setDuration(wavesurfer.getDuration());
    });

    return () => {
      wavesurfer.destroy();
      waveformRef.current = null;
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    waveformRef.current?.playPause();
  };

  const handleSkipForward = () => {
    if (waveformRef.current) {
      const currentTime = waveformRef.current.getCurrentTime();
      const newTime = Math.min(currentTime + 15);
      waveformRef.current.setTime(newTime);
    }
  };

  const handleSkipBackward = () => {
    if (waveformRef.current) {
      const currentTime = waveformRef.current.getCurrentTime();
      const newTime = Math.max(currentTime - 15, 0);
      waveformRef.current.setTime(newTime);
    }
  };

  const gradientClasses = `bg-gradient-to-r from-[#A580E9] to-[#E07FAF]`;

  return (
    <div className="pb-1 bg-inherit rounded-lg w-full">
      <h1 className="text-md font-normal mb-2 text-center">
        {formatTime(duration)} minut
      </h1>
      <div
        ref={containerRef}
        className="w-full"
        style={{
          height: wavesurferOptions.height,
        }}
      />

      <div className="mt-2 flex justify-between text-white text-sm">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="mt-4 flex justify-center items-center gap-5">
        <button
          onClick={handleSkipBackward}
          className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E07FAF] duration-300"
        >
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.6 9.58008H10.54L9.78003 11.8701H12.07C12.91 11.8701 13.6 12.5501 13.6 13.4001C13.6 14.2401 12.92 14.9301 12.07 14.9301H9.78003M7.18005 14.92V9.58008L5.68005 11.2501M7.66003 3.21997L9.64001 0.75M2.54999 6.54974C1.43999 8.02974 0.75 9.85974 0.75 11.8597C0.75 16.7697 4.73001 20.7498 9.64001 20.7498C14.55 20.7498 18.53 16.7697 18.53 11.8597C18.53 6.94974 14.55 2.96973 9.64001 2.96973C8.96001 2.96973 8.30003 3.05978 7.66003 3.20978"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={handlePlayPause}
          className={`w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg transition duration-200 ${gradientClasses} hover:scale-105`}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 4h3v12H5zm7 0h3v12h-3z" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.66 13.73L13.38 14.47L12.1 15.21C10.45 16.16 9.1 15.38 9.1 13.48V12V10.52C9.1 8.61 10.45 7.84 12.1 8.79L13.38 9.53L14.66 10.27C16.31 11.22 16.31 12.78 14.66 13.73Z"
                fill="white"
              />
            </svg>
          )}
        </button>

        <button
          onClick={handleSkipForward}
          className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E07FAF] duration-300"
        >
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.08 15.6727H9.79C9.38 15.6727 9.04 15.3327 9.04 14.9227C9.04 14.5127 9.38 14.1727 9.79 14.1727H12.08C12.51 14.1727 12.86 13.8227 12.86 13.3927C12.86 12.9627 12.51 12.6127 12.08 12.6127H9.79C9.55 12.6127 9.32 12.4927 9.18 12.3027C9.04 12.1127 9 11.8527 9.08 11.6227L9.84 9.33271C9.94 9.02271 10.23 8.82271 10.55 8.82271H13.61C14.02 8.82271 14.36 9.16271 14.36 9.57271C14.36 9.98271 14.02 10.3227 13.61 10.3227H11.09L10.83 11.1127H12.08C13.34 11.1127 14.36 12.1327 14.36 13.3927C14.36 14.6527 13.33 15.6727 12.08 15.6727Z"
              fill="white"
            />
            <path
              d="M7.19 15.6727C6.78 15.6727 6.44 15.3327 6.44 14.9227V11.5327L6.25 11.7527C5.97 12.0627 5.5 12.0827 5.19 11.8127C4.89 11.5327 4.86 11.0627 5.14 10.7527L6.64 9.08271C6.85 8.85271 7.18 8.77271 7.47 8.88271C7.76 8.99271 7.95 9.27271 7.95 9.58271V14.9327C7.94 15.3427 7.61 15.6727 7.19 15.6727Z"
              fill="white"
            />
            <path
              d="M17.34 6.10271C17.09 5.77271 16.62 5.70271 16.29 5.95271C15.96 6.20271 15.89 6.67271 16.14 7.00271C17.22 8.44271 17.79 10.1227 17.79 11.8627C17.79 16.3527 14.14 20.0027 9.65 20.0027C5.16 20.0027 1.51 16.3527 1.51 11.8627C1.51 7.37271 5.16 3.73271 9.65 3.73271C10.23 3.73271 10.82 3.80271 11.46 3.95271C11.49 3.96271 11.52 3.95271 11.55 3.95271C11.58 3.95271 11.6 3.97271 11.62 3.97271C11.65 3.97271 11.67 3.96271 11.7 3.96271C11.73 3.96271 11.76 3.95271 11.8 3.94271C11.86 3.93271 11.91 3.90271 11.96 3.88271C11.99 3.86271 12.02 3.85271 12.05 3.83271C12.06 3.82271 12.08 3.82271 12.09 3.81271C12.12 3.79271 12.13 3.76271 12.15 3.74271C12.19 3.70271 12.22 3.67271 12.25 3.62271C12.28 3.58271 12.29 3.53271 12.31 3.48271C12.32 3.45271 12.34 3.42271 12.35 3.39271C12.35 3.37271 12.35 3.36271 12.35 3.34271C12.36 3.29271 12.36 3.24271 12.35 3.19271C12.35 3.14271 12.35 3.10271 12.34 3.05271C12.33 3.01271 12.31 2.97271 12.29 2.92271C12.27 2.87271 12.25 2.82271 12.22 2.78271C12.22 2.77271 12.22 2.76271 12.21 2.75271L10.23 0.282709C9.97 -0.0372906 9.5 -0.0972906 9.18 0.162709C8.86 0.422709 8.81 0.892709 9.06 1.21271L9.88 2.23271C9.8 2.23271 9.72 2.22271 9.64 2.22271C4.33 2.22271 0 6.54271 0 11.8627C0 17.1827 4.32 21.5027 9.64 21.5027C14.96 21.5027 19.28 17.1827 19.28 11.8627C19.29 9.79271 18.61 7.80271 17.34 6.10271Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaveformPlayer;
