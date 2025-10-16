"use client";
import ReactPlayer from "react-player";

export default function Player() {
  const token = sessionStorage.getItem("token");

  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <ReactPlayer
        slot="media"
        controls={true}
        light="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        src={`https://api.alla.itic.uz/api/stream/video/6?token=${token}`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
