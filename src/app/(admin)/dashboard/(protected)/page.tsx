// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "../../../_components/Sidebar";
import { useCategoryStats } from "@/entities/Categories/api";
import { Spin } from "antd";

const DashboardPage: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("ALLALAR");
  const { data: stats, isLoading } = useCategoryStats(selectedKey);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 bg-[#101010] text-white overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin />
          </div>
        ) : (
          <div className="space-y-2">
            <p>
              <strong>Category:</strong> {stats?.category}
            </p>
            <p>
              <strong>Total Videos:</strong> {stats?.totalVideos}
            </p>
            <p>
              <strong>Total Views:</strong> {stats?.totalViews}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
