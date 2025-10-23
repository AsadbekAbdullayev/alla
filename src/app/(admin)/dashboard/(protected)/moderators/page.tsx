"use client";

import React, { useEffect, useState } from "react";
import {
  useGetUsers,
  useCreateUser,
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
  Card,
  Row,
  Col,
  Modal,
  Drawer,
  Form,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  BlockOutlined,
  UnlockOutlined,
  KeyOutlined,
  UserOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDebounce } from "@/hooks";
import { ModeratorForm } from "@/app/_components/ModeratorForm";
import Loader from "@/app/loading";

const ModeratorPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [userDetailModal, setUserDetailModal] = useState(false);
  const [selectedModerator, setSelectedModerator] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);
  // Debounce qilingan search
  const debouncedSearchText = useDebounce(searchText, 500);

  // Form instances
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Filter parametrlari
  const params = {
    page,
    size,
    role: "MODERATOR",
    status: statusFilter || undefined,
    search: debouncedSearchText || undefined,
  };

  const { data, isLoading, refetch } = useGetUsers(params);
  const createUserMutation = useCreateUser();
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

  // Avtomatik qidiruv
  React.useEffect(() => {
    setPage(0);
    refetch();
  }, [debouncedSearchText, statusFilter]);

  // Yangi moderator yaratish
  const handleCreateModerator = async (values: any) => {
    try {
      await createUserMutation.mutateAsync(values);
      message.success("Moderator muvaffaqiyatli yaratildi!");
      setDrawerVisible(false);
      form.resetFields();
      refetch();
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Moderator yaratishda xatolik!"
      );
    }
  };

  // Moderatorni yangilash
  const handleUpdateModerator = async (values: any) => {
    if (!selectedModerator) return;

    try {
      await updateUserMutation.mutateAsync({
        id: selectedModerator.id,
        ...values,
      });
      message.success("Moderator muvaffaqiyatli yangilandi!");
      setEditDrawerVisible(false);
      editForm.resetFields();
      refetch();
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Moderator yangilashda xatolik!"
      );
    }
  };

  // Statusni o'zgartirish
  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        status: newStatus,
      });
      message.success("Moderator statusi muvaffaqiyatli yangilandi!");
      refetch();
    } catch {
      message.error("Status yangilashda xatolik yuz berdi!");
    }
  };

  // Bloklash/Blokdan chiqarish
  const handleBlockUser = async (userId: number) => {
    try {
      await blockUserMutation.mutateAsync(userId);
      message.success("Moderator muvaffaqiyatli bloklandi!");
      refetch();
    } catch {
      message.error("Moderatorni bloklashda xatolik yuz berdi!");
    }
  };

  const handleUnblockUser = async (userId: number) => {
    try {
      await unblockUserMutation.mutateAsync(userId);
      message.success("Moderator muvaffaqiyatli blokdan chiqarildi!");
      refetch();
    } catch {
      message.error("Moderatorni blokdan chiqarishda xatolik yuz berdi!");
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

  // O'chirish
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserMutation.mutateAsync(userId);
      message.success("Moderator muvaffaqiyatli o'chirildi!");
      refetch();
    } catch {
      message.error("Moderatorni o'chirishda xatolik yuz berdi!");
    }
  };

  // Ko'rish va tahrirlash
  const handleViewModerator = (user: User) => {
    setSelectedModerator(user);
    setUserDetailModal(true);
  };

  const handleEditModerator = (user: User) => {
    setSelectedModerator(user);
    editForm.setFieldsValue({
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    setEditDrawerVisible(true);
  };

  const handleCreateDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleEditDrawerClose = () => {
    setEditDrawerVisible(false);
    setSelectedModerator(null);
    editForm.resetFields();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      render: (phone: string) => {
        const formatted = phone.replace(
          /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
          "+$1 $2 $3 $4 $5"
        );
        return <span className="text-white font-medium">{formatted}</span>;
      },
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
      render: (role: string) => <Tag color="purple">👑 Moderator</Tag>,
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
      title: "Yaratilgan",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span className="text-gray-400">
          {moment(createdAt).format("DD MMM YYYY")}
        </span>
      ),
    },
    {
      title: "Oxirgi kirish",
      dataIndex: "lastLoginAt",
      key: "lastLoginAt",
      render: (lastLoginAt: string) => (
        <span className="text-gray-400">
          {lastLoginAt
            ? moment(lastLoginAt).format("DD MMM YYYY HH:mm")
            : "Hali emas"}
        </span>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      fixed: "right" as const,
      width: 200,
      render: (_: any, record: User) => (
        <div className="flex gap-1">
          <Button
            type="link"
            onClick={() => handleViewModerator(record)}
            icon={<EyeOutlined />}
            className="text-blue-400 hover:text-blue-300 px-2"
            size="small"
          >
            Ko'rish
          </Button>

          <Button
            type="link"
            onClick={() => handleEditModerator(record)}
            icon={<EditOutlined />}
            className="text-green-400 hover:text-green-300 px-2"
            size="small"
          >
            Tahrirlash
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

          <Popconfirm
            title="Moderatorni o'chirish"
            description="Haqiqatan ham bu moderatorni o'chirmoqchimisiz?"
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

  const moderators = data?.data?.content || [];
  const totalElements = data?.data?.totalElements || 0;

  if (!isClient || isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Sarlavha */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Moderatorlar Boshqaruvi
        </h1>
        <p className="text-gray-400">
          Platformadagi barcha moderatorlar ro'yxati
        </p>
      </div>

      {/* Filterlar va Create button */}
      <Card className="bg-[#1f1f1f] border-gray-700">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Telefon raqam yoki ism bo'yicha qidirish..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
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
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="w-full"
            >
              Yangi Moderator
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Statistikalar */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="bg-[#1f1f1f] border-gray-700 text-center">
            <div className="text-2xl font-bold text-white">{totalElements}</div>
            <div className="text-gray-400">Jami Moderatorlar</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-[#1f1f1f] border-gray-700 text-center">
            <div className="text-2xl font-bold text-green-400">
              {moderators.filter((u: any) => u.status === "ACTIVE").length}
            </div>
            <div className="text-gray-400">Faol Moderatorlar</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-[#1f1f1f] border-gray-700 text-center">
            <div className="text-2xl font-bold text-red-400">
              {moderators.filter((u: any) => u.status === "BLOCKED").length}
            </div>
            <div className="text-gray-400">Bloklangan Moderatorlar</div>
          </Card>
        </Col>
      </Row>

      {/* Jadval */}
      <Card
        title={`Moderatorlar ro'yxati (${totalElements} ta)`}
        className="bg-[#1f1f1f] border-gray-700"
      >
        <Table
          columns={columns}
          dataSource={moderators}
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

      {/* Yangi moderator qo'shish drawer */}
      <Drawer
        title="Yangi Moderator Qo'shish"
        width={500}
        onClose={handleCreateDrawerClose}
        open={drawerVisible}
      >
        <ModeratorForm
          form={form}
          onFinish={handleCreateModerator}
          loading={createUserMutation.isLoading}
        />
      </Drawer>

      {/* Moderator tahrirlash drawer */}
      <Drawer
        title={`Moderator Tahrirlash - ${selectedModerator?.firstName} ${selectedModerator?.lastName}`}
        width={500}
        onClose={handleEditDrawerClose}
        open={editDrawerVisible}
      >
        <ModeratorForm
          form={editForm}
          onFinish={handleUpdateModerator}
          loading={updateUserMutation.isLoading}
          isEdit={true}
          initialData={selectedModerator}
        />
      </Drawer>

      {/* Moderator ma'lumotlari modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserOutlined />
            Moderator Ma'lumotlari
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
        {selectedModerator && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">ID</label>
                <p className="text-white">#{selectedModerator.id}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Telefon</label>
                <p className="text-white">{selectedModerator.phoneNumber}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Ism</label>
                <p className="text-white">
                  {selectedModerator.firstName} {selectedModerator.lastName}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <Tag color={getStatusColor(selectedModerator.status)}>
                  {getStatusText(selectedModerator.status)}
                </Tag>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Yaratilgan</label>
                <p className="text-white">
                  {moment(selectedModerator.createdAt).format(
                    "DD MMM YYYY HH:mm"
                  )}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Oxirgi kirish</label>
                <p className="text-white">
                  {selectedModerator.lastLoginAt
                    ? moment(selectedModerator.lastLoginAt).format(
                        "DD MMM YYYY HH:mm"
                      )
                    : "Hali emas"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModeratorPage;
