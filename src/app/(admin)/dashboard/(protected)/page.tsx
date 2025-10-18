"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Card, Row, Col, Statistic, Table, Tag } from "antd";
import {
  EyeOutlined,
  VideoCameraOutlined,
  UserOutlined,
  FolderOutlined,
} from "@ant-design/icons";

// ChartJS ni registr qilish
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  // Statistik ma'lumotlar (API dan keladi)
  const statsData = {
    totalVideos: 156,
    totalViews: 12450,
    activeUsers: 892,
    bannedUsers: 23,
    totalCategories: 8,
  };

  // Kategoriya ma'lumotlari
  const categories = [
    { name: "Allalar", videos: 45, views: 3200, key: "ALLALAR" },
    {
      name: "Milliy Multfilmlar",
      videos: 32,
      views: 2800,
      key: "NATIONAL_CARTOONS",
    },
    {
      name: "Filmlar & Seriallar",
      videos: 28,
      views: 2100,
      key: "MOVIES_SERIES",
    },
    {
      name: "Ta'limiy Kontent",
      videos: 25,
      views: 1800,
      key: "EDUCATIONAL_CONTENT",
    },
    {
      name: "Xorijiy Multfilmlar",
      videos: 18,
      views: 1500,
      key: "FOREIGN_CARTOONS",
    },
    {
      name: "Qo'shiqlar & Raqslar",
      videos: 15,
      views: 1200,
      key: "SONGS_DANCES",
    },
    {
      name: "Sog'lom Turmush",
      videos: 12,
      views: 800,
      key: "HEALTHY_LIFESTYLE",
    },
    { name: "O'yinlar", videos: 8, views: 450, key: "GAMES" },
  ];

  // Oylik ko'rishlar ma'lumotlari
  const monthlyViews = {
    labels: [
      "Yan",
      "Fev",
      "Mar",
      "Apr",
      "May",
      "Iyn",
      "Iyl",
      "Avg",
      "Sen",
      "Okt",
      "Noy",
      "Dek",
    ],
    data: [850, 920, 1100, 980, 1250, 1400, 1600, 1550, 1300, 1450, 1200, 1350],
  };

  // User statistikasi
  const userStats = {
    active: 892,
    banned: 23,
    newThisMonth: 45,
  };

  // 1. Kategoriyalar bo'yicha video statistikasi
  const categoryChartData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        label: "Videolar soni",
        data: categories.map((cat) => cat.videos),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#C9CBCF",
        ],
        borderWidth: 2,
      },
    ],
  };

  // 2. Oylik ko'rishlar statistikasi
  const monthlyChartData = {
    labels: monthlyViews.labels,
    datasets: [
      {
        label: "Oylik ko'rishlar",
        data: monthlyViews.data,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // 3. User statistikasi
  const userChartData = {
    labels: ["Faol Userlar", "Ban Userlar", "Yangi Userlar"],
    datasets: [
      {
        label: "Userlar statistikasi",
        data: [userStats.active, userStats.banned, userStats.newThisMonth],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  // Table uchun columns
  const categoryColumns = [
    {
      title: "Kategoriya",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Videolar",
      dataIndex: "videos",
      key: "videos",
      render: (videos: number) => <Tag color="blue">{videos} ta</Tag>,
    },
    {
      title: "Ko'rishlar",
      dataIndex: "views",
      key: "views",
      render: (views: number) => (
        <span className="text-green-500">{views.toLocaleString()}</span>
      ),
    },
    {
      title: "O'rtacha",
      key: "average",
      render: (_: any, record: any) => (
        <span className="text-orange-500">
          {Math.round(record.views / record.videos).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Sarlavha */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Platforma statistikasi va monitoringi</p>
      </div>

      {/* Asosiy statistikalar */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-[#1f1f1f] border-gray-700">
            <Statistic
              title="Jami Videolar"
              value={statsData.totalVideos}
              prefix={<VideoCameraOutlined className="text-blue-400" />}
              valueStyle={{ color: "#3b82f6" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-[#1f1f1f] border-gray-700">
            <Statistic
              title="Jami Ko'rishlar"
              value={statsData.totalViews}
              prefix={<EyeOutlined className="text-green-400" />}
              valueStyle={{ color: "#10b981" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-[#1f1f1f] border-gray-700">
            <Statistic
              title="Faol Userlar"
              value={statsData.activeUsers}
              prefix={<UserOutlined className="text-purple-400" />}
              valueStyle={{ color: "#8b5cf6" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-[#1f1f1f] border-gray-700">
            <Statistic
              title="Kategoriyalar"
              value={statsData.totalCategories}
              prefix={<FolderOutlined className="text-orange-400" />}
              valueStyle={{ color: "#f59e0b" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts qismi */}
      <Row gutter={[16, 16]}>
        {/* Kategoriyalar statistikasi */}
        <Col xs={24} lg={12}>
          <Card
            title="Kategoriyalar bo'yicha videolar"
            className="bg-[#1f1f1f] border-gray-700"
          >
            <div className="h-64 flex items-center justify-center">
              <Doughnut
                data={categoryChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                      labels: {
                        color: "#fff",
                        font: {
                          size: 12,
                        },
                        padding: 15,
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const label = context.label || "";
                          const value = context.parsed;
                          const total = context.dataset.data.reduce(
                            (a: number, b: number) => a + b,
                            0
                          );
                          const percentage = Math.round((value / total) * 100);
                          return `${label}: ${value} ta (${percentage}%)`;
                        },
                      },
                    },
                  },
                  cutout: "60%",
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {categories.slice(0, 4).map((category, index) => (
                <div
                  key={category.key}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          categoryChartData.datasets[0].backgroundColor[index],
                      }}
                    ></div>
                    <span className="text-gray-300 truncate">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-white font-medium">
                    {category.videos} ta
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Oylik ko'rishlar */}
        <Col xs={24} lg={12}>
          <Card
            title="Oylik ko'rishlar statistikasi (2025)"
            className="bg-[#1f1f1f] border-gray-700"
          >
            <div className="h-64">
              <Line
                data={monthlyChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: "#fff",
                      },
                    },
                    tooltip: {
                      mode: "index",
                      intersect: false,
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      titleColor: "#fff",
                      bodyColor: "#fff",
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                      ticks: {
                        color: "#fff",
                      },
                    },
                    y: {
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                      ticks: {
                        color: "#fff",
                      },
                    },
                  },
                }}
              />
            </div>
          </Card>
        </Col>

        {/* User statistikasi */}
        <Col xs={24} lg={12}>
          <Card
            title="Userlar statistikasi"
            className="bg-[#1f1f1f] border-gray-700"
          >
            <div className="h-64">
              <Bar data={userChartData} options={chartOptions} />
            </div>
          </Card>
        </Col>

        {/* Kategoriyalar jadvali */}
        <Col xs={24} lg={12}>
          <Card
            title="Kategoriyalar statistikasi"
            className="bg-[#1f1f1f] border-gray-700"
          >
            <Table
              columns={categoryColumns}
              dataSource={categories}
              pagination={false}
              size="small"
              className="custom-table"
              rowKey="key"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
