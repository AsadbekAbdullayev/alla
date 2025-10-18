"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useCategories } from "@/entities/Categories/api";
import { useParams, useRouter } from "next/navigation";
import { Layout, Menu, Spin } from "antd";
import {
  VideoCameraOutlined,
  PlayCircleOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  FilePdfOutlined,
  HomeOutlined,
  AudioOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import gsap from "gsap";

const { Sider } = Layout;

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
    const videoItems = Array.isArray(categories)
      ? categories.map((category) => ({
          key: category.key,
          icon: iconMap[category.key] || <HomeOutlined />,
          label: category.name,
        }))
      : [];

    const bookItems = [
      { key: "books", icon: <FilePdfOutlined />, label: "Kitoblar" },
    ];

    const userItems = [
      { key: "users", icon: <UserOutlined />, label: "Foydalanuvchilar" },
      { key: "moderators", icon: <TeamOutlined />, label: "Moderatorlar" },
    ];

    return [
      {
        type: "group",
        label: (
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M8.81992 0.333313H5.17992V3.23998H8.81992V0.333313Z"
                fill="#fff"
              />
              <path
                d="M9.81992 0.333313V3.23998H13.5799C13.2399 1.40665 11.8866 0.33998 9.81992 0.333313Z"
                fill="#fff"
              />
              <path
                d="M0.333252 4.23998V9.79331C0.333252 12.22 1.77992 13.6666 4.20659 13.6666H9.79325C12.2199 13.6666 13.6666 12.22 13.6666 9.79331V4.23998H0.333252ZM8.62659 9.78665L7.23992 10.5866C6.94659 10.7533 6.65992 10.84 6.39325 10.84C6.19325 10.84 6.01325 10.7933 5.84659 10.7C5.45992 10.48 5.24659 10.0266 5.24659 9.43998V7.83998C5.24659 7.25331 5.45992 6.79998 5.84659 6.57998C6.23325 6.35331 6.72659 6.39331 7.23992 6.69331L8.62659 7.49331C9.13992 7.78665 9.41992 8.19998 9.41992 8.64665C9.41992 9.09331 9.13325 9.48665 8.62659 9.78665Z"
                fill="#fff"
              />
              <path
                d="M4.17992 0.333313C2.11325 0.33998 0.759919 1.40665 0.419919 3.23998H4.17992V0.333313Z"
                fill="#fff"
              />
            </svg>

            <span className="text-lg text-[#fff] font-semibold underline">
              {" "}
              Videolar
            </span>
          </div>
        ),
        children: [
          {
            key: "",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          ,
          ...videoItems,
        ],
      },
      {
        type: "group",
        label: (
          <div>
            <BookOutlined className="w-fit mr-2 text-lg text-[#fff]" />
            <span className="text-lg font-semibold underline text-[#fff] ">
              {" "}
              Kitoblar
            </span>
          </div>
        ),
        children: bookItems,
      },
      {
        type: "group",
        label: (
          <div>
            <UserOutlined className="w-fit mr-2 text-lg text-[#fff]" />
            <span className="text-lg font-semibold underline text-[#fff]">
              Monitoring
            </span>
          </div>
        ),
        children: userItems,
      },
    ];
  }, [categories]);

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
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={230}
    >
      <div className="p-4 flex items-center justify-between h-[60px] border-b border-[#112240]">
        {!collapsed && (
          <div
            ref={titleRef}
            className="text-white text-lg font-bold tracking-wide"
          >
            Alla Dashboard
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-fit text-white text-xl flex items-center justify-center"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={typeof current === "string" ? [current] : []}
          onClick={(info) => {
            setCurrent(info.key);
            router.push(`/dashboard/${info.key}`);
          }}
          items={items}
          className="!bg-transparent !border-none"
        />
      )}
    </Sider>
  );
};

export default Sidebar;
