"use client";

import React, { useEffect, useState } from "react";
import {
  useGetUsers,
  useUpdateUser,
  useDeleteUser,
  useBlockUser,
  useUnblockUser,
  useResetPassword,
  User,
} from "@/entities/AdminUsers/api";
import {
  Button,
  Table,
  Tag,
  Select,
  Input,
  Popconfirm,
  message,
  Spin,
  Card,
  Row,
  Col,
  Modal,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  BlockOutlined,
  UnlockOutlined,
  KeyOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDebounce } from "@/hooks";

const UserPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [userDetailModal, setUserDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const debouncedSearchText = useDebounce(searchText, 500);

  // Faqat search text o'zgarganda ishlaydi
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filter parametrlari
  const params = {
    page,
    size,
    role: "USER",
    status: statusFilter || undefined,
    search: searchText || undefined,
  };

  const { data, isLoading, refetch } = useGetUsers(params);
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const blockUserMutation = useBlockUser();
  const unblockUserMutation = useUnblockUser();
  const resetPasswordMutation = useResetPassword();

  const STATUS_OPTIONS = [
    { value: "", label: "Barchasi" },
    { value: "ACTIVE", label: "🟢 Faol" },
    { value: "INACTIVE", label: "🟡 NoFaol" },
    { value: "BLOCKED", label: "🔴 Bloklangan" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "green";
      case "INACTIVE":
        return "orange";
      case "BLOCKED":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Faol";
      case "INACTIVE":
        return "NoFaol";
      case "BLOCKED":
        return "Bloklangan";
      default:
        return status;
    }
  };

  // Statusni o'zgartirish
  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        status: newStatus,
      });
      message.success("User statusi muvaffaqiyatli yangilandi!");
      refetch();
    } catch {
      message.error("Status yangilashda xatolik yuz berdi!");
    }
  };

  // Userni bloklash
  const handleBlockUser = async (userId: number) => {
    try {
      await blockUserMutation.mutateAsync(userId);
      message.success("User muvaffaqiyatli bloklandi!");
      refetch();
    } catch {
      message.error("Userni bloklashda xatolik yuz berdi!");
    }
  };

  // Userni blokdan chiqarish
  const handleUnblockUser = async (userId: number) => {
    try {
      await unblockUserMutation.mutateAsync(userId);
      message.success("User muvaffaqiyatli blokdan chiqarildi!");
      refetch();
    } catch {
      message.error("Userni blokdan chiqarishda xatolik yuz berdi!");
    }
  };

  // Parolni tiklash
  const handleResetPassword = async (userId: number) => {
    try {
      await resetPasswordMutation.mutateAsync(userId);
      message.success("Parol muvaffaqiyatli tiklandi!");
    } catch {
      message.error("Parolni tiklashda xatolik yuz berdi!");
    }
  };

  // Userni o'chirish
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserMutation.mutateAsync(userId);
      message.success("User muvaffaqiyatli o'chirildi!");
      refetch();
    } catch {
      message.error("Userni o'chirishda xatolik yuz berdi!");
    }
  };

  // User ma'lumotlarini ko'rish
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setUserDetailModal(true);
  };

  // Search va filterlarni qayta yuklash
  const handleSearch = () => {
    setPage(0);
    refetch();
  };

  const handleResetFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setPage(0);
  };

  // Enter bosganda ham ishlashi uchun
  const handlePressEnter = () => {
    setPage(0);
    refetch();
  };
  // Debounced search o'zgarganda avtomatik qidiruv
  useEffect(() => {
    setPage(0); // Sahifani boshiga qaytarish
    refetch();
  }, [debouncedSearchText, statusFilter]);
  // Jadval ustunlari
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: number) => <span className="text-gray-400">#{id}</span>,
    },
    {
      title: "Telefon",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phone: string) => (
        <span className="text-white font-medium">{phone}</span>
      ),
    },
    {
      title: "Ism",
      dataIndex: "firstName",
      key: "firstName",
      render: (firstName: string, record: User) => (
        <span className="text-white">
          {firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Ro'l",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "purple" : "blue"}>
          {role === "ADMIN" ? "👑 Admin" : "👤 User"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: User) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={STATUS_OPTIONS.filter((opt) => opt.value !== "")}
          className="w-40"
          suffixIcon={null}
        />
      ),
    },
    {
      title: "Ro'yxatdan o'tgan",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span className="text-gray-400">
          {moment(createdAt).format("DD MMM YYYY")}
        </span>
      ),
    },
    // {
    //   title: "Oxirgi kirish",
    //   dataIndex: "lastLoginAt",
    //   key: "lastLoginAt",
    //   render: (lastLoginAt: string) => (
    //     <span className="text-gray-400">
    //       {lastLoginAt
    //         ? moment(lastLoginAt).format("DD MMM YYYY HH:mm")
    //         : "Hali emas"}
    //     </span>
    //   ),
    // },
    {
      title: "Amallar",
      key: "actions",
      fixed: "right" as const,
      width: 200,
      render: (_: any, record: User) => (
        <div className="flex gap-1">
          <Button
            type="link"
            onClick={() => handleViewUser(record)}
            icon={<EyeOutlined />}
            className="text-blue-400 hover:text-blue-300 px-2"
            size="small"
          >
            Ko'rish
          </Button>

          {record.status === "BLOCKED" ? (
            <Button
              type="link"
              onClick={() => handleUnblockUser(record.id)}
              icon={<UnlockOutlined />}
              className="text-green-400 hover:text-green-300 px-2"
              size="small"
            >
              Blokdan chiqarish
            </Button>
          ) : (
            <Button
              type="link"
              onClick={() => handleBlockUser(record.id)}
              icon={<BlockOutlined />}
              className="text-orange-400 hover:text-orange-300 px-2"
              size="small"
            >
              Bloklash
            </Button>
          )}

          <Button
            type="link"
            onClick={() => handleResetPassword(record.id)}
            icon={<KeyOutlined />}
            className="text-purple-400 hover:text-purple-300 px-2"
            size="small"
          >
            Parolni tiklash
          </Button>

          <Popconfirm
            title="Userni o'chirish"
            description="Haqiqatan ham bu userni o'chirmoqchimisiz?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Ha"
            cancelText="Yo'q"
            okType="danger"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className="text-red-400 hover:text-red-300 px-2"
              size="small"
              danger
            >
              O'chirish
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const users = data?.data?.content || [];
  const totalElements = data?.data?.totalElements || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Sarlavha */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Userlar Boshqaruvi</h1>
        <p className="text-gray-400">Platformadagi barcha userlar ro'yxati</p>
      </div>

      {/* Filterlar */}
      <Card className="bg-[#1f1f1f] border-gray-700">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Telefon raqam yoki ism bo'yicha qidirish..."
              value={searchText}
              onChange={handleSearchChange}
              onPressEnter={handlePressEnter}
              prefix={<SearchOutlined />}
              allowClear
            />
            {searchText && (
              <div className="text-xs text-gray-400 mt-1">
                Qidiruv: {debouncedSearchText}
              </div>
            )}
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={STATUS_OPTIONS}
              className="w-full"
              placeholder="Status bo'yicha filtrlash"
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button type="primary" onClick={handleSearch} className="w-full">
              Qidirish
            </Button>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button onClick={handleResetFilters} className="w-full">
              Filterni tozalash
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Statistikalar */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="bg-[#1f1f1f] border-gray-700 text-center">
            <div className="text-2xl font-bold text-white">{totalElements}</div>
            <div className="text-gray-400">Jami Userlar</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-[#1f1f1f] border-gray-700 text-center">
            <div className="text-2xl font-bold text-green-400">
              {users.filter((u: any) => u.status === "ACTIVE").length}
            </div>
            <div className="text-gray-400">Faol Userlar</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-[#1f1f1f] border-gray-700 text-center">
            <div className="text-2xl font-bold text-red-400">
              {users.filter((u: any) => u.status === "BLOCKED").length}
            </div>
            <div className="text-gray-400">Bloklangan Userlar</div>
          </Card>
        </Col>
      </Row>

      {/* Jadval */}
      <Card
        title={`Userlar ro'yxati (${totalElements} ta)`}
        className="bg-[#1f1f1f] border-gray-700"
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            current: page + 1,
            pageSize: size,
            total: totalElements,
            onChange: (page) => setPage(page - 1),
            showSizeChanger: false,
          }}
          className="!text-white"
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* User ma'lumotlari modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserOutlined />
            User Ma'lumotlari
          </div>
        }
        open={userDetailModal}
        onCancel={() => setUserDetailModal(false)}
        width={600}
        footer={[
          <Button key="close" onClick={() => setUserDetailModal(false)}>
            Yopish
          </Button>,
        ]}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">ID</label>
                <p className="text-white">#{selectedUser.id}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Telefon</label>
                <p className="text-white">{selectedUser.phoneNumber}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Ism</label>
                <p className="text-white">
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <Tag color={getStatusColor(selectedUser.status)}>
                  {getStatusText(selectedUser.status)}
                </Tag>
              </div>
              <div>
                <label className="text-gray-400 text-sm">
                  Ro'yxatdan o'tgan
                </label>
                <p className="text-white">
                  {moment(selectedUser.createdAt).format("DD MMM YYYY HH:mm")}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Oxirgi kirish</label>
                <p className="text-white">
                  {selectedUser.lastLoginAt
                    ? moment(selectedUser.lastLoginAt).format(
                        "DD MMM YYYY HH:mm"
                      )
                    : "Hali emas"}
                </p>
              </div>
            </div>

            {/* Child profiles */}
            {selectedUser.childProfiles &&
              selectedUser.childProfiles.length > 0 && (
                <div>
                  <label className="text-gray-400 text-sm">
                    Bolalar Profillari
                  </label>
                  <div className="mt-2 space-y-2">
                    {selectedUser.childProfiles.map((child: any) => (
                      <div
                        key={child.id}
                        className="flex items-center gap-3 p-2 bg-gray-800 rounded"
                      >
                        {child.avatarUrl && (
                          <img
                            src={child.avatarUrl}
                            alt={child.name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div>
                          <p className="text-white font-medium">{child.name}</p>
                          <p className="text-gray-400 text-sm">
                            {child.age} yosh
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserPage;
export const dynamic = "force-dynamic";
