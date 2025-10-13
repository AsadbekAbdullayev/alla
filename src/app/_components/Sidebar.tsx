"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useCategories } from "@/entities/Categories/api";
import { Menu, Spin } from "antd";
import {
  VideoCameraOutlined,
  PlayCircleOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import gsap from "gsap";
import { useRouter, useParams } from "next/navigation";

const iconMap: Record<string, React.ReactNode> = {
  ALLALAR: <HomeOutlined />,
  NATIONAL_CARTOONS: <VideoCameraOutlined />,
  MOVIES_SERIES: <PlayCircleOutlined />,
  EDUCATIONAL_CONTENT: <VideoCameraOutlined />,
  FOREIGN_CARTOONS: <PlayCircleOutlined />,
  SONGS_DANCES: <MenuUnfoldOutlined />,
  HEALTHY_LIFESTYLE: <MenuFoldOutlined />,
  GAMES: <MenuUnfoldOutlined />,
};

const Sidebar: React.FC = () => {
  const { data: categories, isLoading } = useCategories();
  const [collapsed, setCollapsed] = useState(false);
  const { category: categoryName } = useParams();
  const [current, setCurrent] = useState(categoryName);
  const titleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const items = useMemo(() => {
    const homeItem = {
      key: "home",
      icon: <HomeOutlined />,
      label: "Bosh sahifa",
    };

    const categoryItems = Array.isArray(categories)
      ? categories.map((category) => ({
          key: category.key,
          icon: iconMap[category.key] || <HomeOutlined />,
          label: category.name,
        }))
      : [];

    return categoryItems;
    return [homeItem, ...categoryItems];
  }, [categories]);

  // Animate "Alla Dashboard" title
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [collapsed]);

  return (
    <div
      className={`h-full flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-60"
      } bg-[#1a1a1a]`}
    >
      <div
        className="p-4 h-[60px] flex items-center justify-between"
        style={{
          background: `radial-gradient(circle at top left, #1D39C400, #1A34B6 80%)`,
        }}
      >
        {/* Animated Title */}
        {!collapsed && (
          <div
            ref={titleRef}
            className="text-white text-lg  font-bold whitespace-nowrap"
          >
            Alla Dashboard
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white text-xl flex w-full items-center justify-center"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large">
            <p className="!bg-inherit !text-white ">Yuklanyapdi...</p>
          </Spin>
        </div>
      ) : (
        <>
          <div className="w-full h-px my-5 bg-gradient-to-r from-transparent via-[#436EFF] to-transparent" />

          {!collapsed && (
            <div className="px-4 mt-2 uppercase text-[#979797] text-[10px] italic font-bold leading-[14px] tracking-[0.1px]">
              Asosiy
            </div>
          )}

          {/* Menu */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={typeof current === "string" ? [current] : []}
            onClick={(info) => {
              setCurrent(info.key);
              router.push(`/dashboard/${info.key}`);
            }}
            items={items}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#979797",
              fontSize: collapsed ? 12 : 14,
            }}
            inlineCollapsed={collapsed}
            className="!bg-transparent select-none !border-none !text-[#979797] !text-[12px] md:!text-[14px]"
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
