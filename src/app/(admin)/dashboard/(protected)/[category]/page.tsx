// app/dashboard/[category]/page.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useCategoryStats } from "@/entities/Categories/api";
import { useVideosByCategory } from "@/entities/Videos/api";
import { useParams, useRouter } from "next/navigation";
import { Card, Row, Col, Progress, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import gsap from "gsap";

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const router = useRouter();
  const statRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const { data: stats, isLoading: statsLoading } = useCategoryStats(
    category as string
  );
  const { data: videos, isLoading: videosLoading } = useVideosByCategory(
    category as string
  );

  // GSAP animations
  useEffect(() => {
    if (statRef.current && videoRef.current) {
      gsap.from(statRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(videoRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
      });
    }
  }, [category]);

  if (statsLoading || videosLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Category Stats Section */}
      <div ref={statRef} className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4 uppercase">
          {stats?.category} Statistikasi
        </h2>
        <Row gutter={24}>
          <Col span={12}>
            <div className="text-gray-300 mb-2">Videolar soni</div>
            <Progress
              percent={stats?.totalVideos ? (stats.totalVideos / 100) * 100 : 0}
              format={() => `${stats?.totalVideos || 0}`}
              strokeColor="#436EFF"
            />
          </Col>
          <Col span={12}>
            <div className="text-gray-300 mb-2">Ko‘rishlar soni</div>
            <Progress
              percent={stats?.totalViews ? (stats.totalViews / 1000) * 100 : 0}
              format={() => `${stats?.totalViews || 0}`}
              strokeColor="#00C49F"
            />
          </Col>
        </Row>
      </div>

      {/* Videos List */}
      <div ref={videoRef}>
        <h3 className="text-lg font-semibold text-white mb-4">Videolar</h3>
        <Row gutter={[16, 16]}>
          {videos?.content?.map((video: any) => (
            <Col xs={24} sm={12} md={8} lg={6} key={video.id}>
              <Card
                hoverable
                onClick={() => {
                  const filename = video?.videoUrl?.split("/")?.pop();
                  router.push(
                    `/dashboard/video/${6}/${"f686597c-7384-4110-816a-286e3904261a.mp4"}`
                  );
                }}
                className="min-w-fit"
                style={{
                  background:
                    "linear-gradient(145deg, #0f0f0f 0%, #1a1a1a 100%)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                cover={
                  <div
                    className="flex items-center justify-center"
                    style={{
                      height: 180,
                      background:
                        "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
                    }}
                  >
                    <PlayCircleOutlined
                      style={{ fontSize: 48, color: "#4C8EFF" }}
                    />
                  </div>
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "scale(1.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 18px rgba(67,110,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.3)";
                }}
              >
                <Card.Meta
                  title={
                    <span className="text-white font-semibold line-clamp-1">
                      {video.title}
                    </span>
                  }
                  description={
                    <span className="text-gray-400 text-sm line-clamp-2">
                      {video.description?.slice(0, 60) || "Tavsif mavjud emas"}
                    </span>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoryPage;
