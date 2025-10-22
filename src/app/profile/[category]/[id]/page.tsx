"use client";

import SkeletonCards from "@/app/_components/shared/SkeletonCard";
import { useVideoById } from "@/entities/Videos/api";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import { formatDuration } from "@/lib";

export default function ProfilePage() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const { data: videoData, isLoading: videosLoading } = useVideoById(
    id as string
  );

  return (
    <div className="min-h-screen flex-1 p-6 md:px-16">
      {videosLoading ? (
        <SkeletonCards />
      ) : (
        <div className="w-full flex gap-6">
          <div className="min-w-[682px] min-h-[404px] max-h-[404px]">
            <ReactPlayer
              slot="media"
              controls={true}
              src={`https://api.alla.itic.uz/api/stream/video/${id}?token=${token}`}
              className="rounded-3xl !w-full !h-[95%]"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="flex h-[28px] items-center gap-[6px] w-fit rounded-[8px] bg-[rgba(4,181,95,0.10)] px-2 py-[2px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14.1 4.11341C13.8266 3.96675 13.2533 3.81341 12.4733 4.36008L11.4933 5.05341C11.42 2.98008 10.52 2.16675 8.33329 2.16675H4.33329C2.05329 2.16675 1.16663 3.05341 1.16663 5.33341V10.6667C1.16663 12.2001 1.99996 13.8334 4.33329 13.8334H8.33329C10.52 13.8334 11.42 13.0201 11.4933 10.9467L12.4733 11.6401C12.8866 11.9334 13.2466 12.0267 13.5333 12.0267C13.78 12.0267 13.9733 11.9534 14.1 11.8867C14.3733 11.7467 14.8333 11.3667 14.8333 10.4134V5.58675C14.8333 4.63341 14.3733 4.25341 14.1 4.11341ZM7.33329 7.58675C6.64663 7.58675 6.07996 7.02675 6.07996 6.33341C6.07996 5.64008 6.64663 5.08008 7.33329 5.08008C8.01996 5.08008 8.58663 5.64008 8.58663 6.33341C8.58663 7.02675 8.01996 7.58675 7.33329 7.58675Z"
                  fill="#04B55F"
                />
              </svg>
              <span className="text-[#04B55F] font-nunito text-[13px] italic font-semibold leading-[18px] tracking-[-0.078px]">
                {`${formatDuration(Number(videoData?.duration || 0))} minut`}
              </span>
            </div>

            <h3 className="text-lg font-semibold truncate mt-2">
              {videoData?.title || "Category"}
            </h3>

            <span className="block text-sm font-normal opacity-80 w-[90%] !line-clamp-2">
              {videoData?.description || ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
