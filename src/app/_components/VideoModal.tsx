// components/VideoModal.tsx
"use client";
import ReactPlayer from "react-player";
import { Modal, Button, Tag, message } from "antd";
import { useState } from "react";
import { Video } from "@/entities/Admin/api";
import { EyeOutlined } from "@ant-design/icons";

interface VideoModalProps {
  video: Video | null;
  visible: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, visible, onClose }) => {
  const [playing, setPlaying] = useState(false);
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : "";
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return { color: "green", text: "✅ Tasdiqlangan" };
      case "REJECTED":
        return { color: "red", text: "❌ Rad etilgan" };
      case "PENDING":
        return { color: "orange", text: "⏳ Kutilmoqda" };
      default:
        return { color: "default", text: status };
    }
  };
  console.log(video, "videovideo");

  const statusInfo = video
    ? getStatusColor(video.status)
    : { color: "default", text: "" };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <EyeOutlined />
          Video ko'rish - {video?.title}
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Yopish
        </Button>,
      ]}
      className="video-modal"
    >
      {video && (
        <div className="space-y-6">
          {/* Video player */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden">
            <ReactPlayer
              controls={true}
              playing={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              src={`${BASE_URL}/stream/video/${video.id}?token=${token}`}
              width="100%"
              height="auto"
              style={{ aspectRatio: "16/9" }}
            />
          </div>

          {/* Video ma'lumotlari */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2">
                Asosiy ma'lumotlar
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white">{video.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <Tag color={statusInfo.color} className="font-semibold">
                    {statusInfo.text}
                  </Tag>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ko'rishlar:</span>
                  <span className="text-white">{video.viewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Layklar:</span>
                  <span className="text-white">{video.likeCount}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2">
                Texnik ma'lumotlar
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Davomiylik:</span>
                  <span className="text-white">{video.duration}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Yosh cheklovi:</span>
                  <span className="text-white">{video.ageLimit}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kategoriya:</span>
                  <span className="text-white">{video.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Yuklangan sana:</span>
                  <span className="text-white">
                    {video.createdAt
                      ? new Date(video.createdAt).toLocaleDateString("uz-UZ")
                      : "Noma'lum"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tavsif */}
          {video.description && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Tavsif</h3>
              <p className="text-gray-300 text-sm">{video.description}</p>
            </div>
          )}

          {/* Teglar */}
          {video.tags && video.tags.length > 0 && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Teglar</h3>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <Tag key={index} color="blue" className="font-medium">
                    #{tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default VideoModal;
