"use client";

import { useRouter } from "next/navigation";
import {
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";

export default function AdminSider() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { key: "dashboard", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "users", icon: <UserOutlined />, label: "Users" },
    { key: "videos", icon: <VideoCameraOutlined />, label: "Videos" },
  ];

  const handleClick = ({ key }: any) => {
    router.push(`/dashboard/${key}`);
  };

  return (
    <aside
      className={`bg-[#0f0f0f] text-white h-full transition-all ${
        collapsed ? "w-16" : "w-56"
      } flex flex-col`}
    >
      <div
        className="text-center py-4 text-lg font-bold border-b border-gray-800 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "💫" : "Admin Panel"}
      </div>
      <Menu
        mode="inline"
        theme="dark"
        items={items}
        className="bg-transparent flex-1"
        onClick={handleClick}
      />
    </aside>
  );
}
