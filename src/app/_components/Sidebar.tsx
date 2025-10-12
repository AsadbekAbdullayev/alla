// app/dashboard/_components/Sidebar.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useCategories } from "@/entities/Categories/api";
import { Menu, Spin } from "antd";
import {
  VideoCameraOutlined,
  PlayCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const iconMap: Record<string, React.ReactNode> = {
  ALLALAR: <HomeOutlined />,
  NATIONAL_CARTOONS: <VideoCameraOutlined />,
  MOVIES_SERIES: <PlayCircleOutlined />,
  EDUCATIONAL_CONTENT: <VideoCameraOutlined />,
  FOREIGN_CARTOONS: <HomeOutlined />,
  SONGS_DANCES: <PlayCircleOutlined />,
  HEALTHY_LIFESTYLE: <VideoCameraOutlined />,
  GAMES: <HomeOutlined />,
};

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { data: categories, isLoading } = useCategories();
  const [current, setCurrent] = useState("");
  const items = useMemo(
    () =>
      categories?.map((category) => ({
        key: category.key,
        icon: iconMap[category.key] || <HomeOutlined />,
        label: category.name,
      })) || [],
    [categories]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin />
      </div>
    );
  }

  return (
    <div className="w-60 h-full flex flex-col bg-[#1a1a1a]">
      {/* Gradient Header */}
      <div
        className="p-4 flex flex-col items-center justify-center"
        style={{
          background: `radial-gradient(circle at top left, #1D39C400, #1A34B6 80%)`,
        }}
      >
        <div className="text-white text-lg font-bold">Ism Familiya</div>
      </div>

      <div
        className="w-full !h-[1px] my-5"
        style={{
          background: `linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #436EFF 51%, rgba(255, 255, 255, 0.00) 100%)`,
        }}
      ></div>

      <div
        className="px-4 mt-2 uppercase"
        style={{
          color: "#979797",
          fontSize: 10,
          fontStyle: "italic",
          fontWeight: 700,
          lineHeight: "14px",
          letterSpacing: "0.1px",
        }}
      >
        Asosiy
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[current]}
        onClick={(info) => {
          setCurrent(info.key);
        }}
        items={items}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          color: "#979797",
        }}
      />
    </div>
  );
};

export default Sidebar;
