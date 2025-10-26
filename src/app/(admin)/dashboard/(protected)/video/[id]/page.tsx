"use client";
import ReactPlayer from "react-player";
import { useParams } from "next/navigation";

export default function Player() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <ReactPlayer
        slot="media"
        controls={true}
        src={`${BASE_URL}/stream/video/${id}?token=${token}`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
