"use client";

import React, { useState } from "react";
import {
  useUploadFile,
  useCreateVideo,
  useGetAdminVideos,
  useUpdateVideo,
  Video,
} from "@/entities/Admin/api";
import { useParams } from "next/navigation";
import {
  Button,
  Drawer,
  Form,
  Input,
  Upload,
  message,
  Spin,
  Table,
  Tag,
  Image,
  Select,
  Popconfirm,
} from "antd";
import { LoadingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import VideoModal from "@/app/_components/VideoModal";
import { useDeleteVideo } from "@/entities/Admin/api";
import { DeleteOutlined } from "@ant-design/icons";

const CategoryPage: React.FC = () => {
  const { TextArea } = Input;
  const { category } = useParams();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const deleteVideoMutation = useDeleteVideo();
  const uploadMutation = useUploadFile();
  const createVideoMutation = useCreateVideo();
  const updateVideoMutation = useUpdateVideo();
  const { data, isLoading, refetch } = useGetAdminVideos(
    `?category=${category}`
  );

  const STATIC_TAGS = ["bolalar", "music", "qiziqarli", "dance", "top"];

  const STATUS_OPTIONS = [
    { value: "PENDING", label: "⏳ Kutilmoqda" },
    { value: "APPROVED", label: "✅ Tasdiqlangan" },
    { value: "REJECTED", label: "❌ Rad etilgan" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "green";
      case "REJECTED":
        return "red";
      case "PENDING":
        return "orange";
      default:
        return "default";
    }
  };

  const handleUpload = async (file: File, type: "video" | "image") => {
    try {
      if (type === "video") setUploadingVideo(true);
      else setUploadingImage(true);

      const res = await uploadMutation.mutateAsync({ type, file });
      message.success(
        `${type === "video" ? "Video" : "Rasm"} muvaffaqiyatli yuklandi!`
      );
      return res?.data?.videoUrl || res?.data;
    } catch {
      message.error(
        `${type === "video" ? "Video" : "Rasm"} yuklashda xatolik yuz berdi!`
      );
      return "";
    } finally {
      setUploadingVideo(false);
      setUploadingImage(false);
    }
  };

  const handleFinish = async (values: any) => {
    if (!videoFile) return message.error("Iltimos, video faylni yuklang!");
    if (!thumbnailFile) return message.error("Iltimos, rasmni yuklang!");

    const videoUrl = await handleUpload(videoFile, "video");
    const thumbnailUrl = await handleUpload(thumbnailFile, "image");
    if (!videoUrl || !thumbnailUrl) return;

    const newVideo: Partial<Video> = {
      title: values.title,
      description: values.description,
      category: String(category),
      videoUrl,
      thumbnailUrl,
      ageLimit: Number(values.ageLimit),
      duration: Number(values.duration),
      status: "PENDING",
      tags: STATIC_TAGS,
    };

    try {
      await createVideoMutation.mutateAsync(newVideo as Video);
      message.success("Video muvaffaqiyatli yaratildi!");
      setDrawerVisible(false);
      form.resetFields();
      setVideoFile(null);
      setThumbnailFile(null);
      refetch();
    } catch {
      message.error("Video yaratishda xatolik yuz berdi!");
    }
  };

  const handleEditFinish = async (values: any) => {
    if (!selectedVideo) return;

    try {
      let videoUrl = selectedVideo.videoUrl;
      let thumbnailUrl = selectedVideo.thumbnailUrl;

      // Yangi video fayl yuklangan bo'lsa
      if (videoFile) {
        videoUrl = await handleUpload(videoFile, "video");
        if (!videoUrl) return;
      }

      // Yangi rasm fayl yuklangan bo'lsa
      if (thumbnailFile) {
        thumbnailUrl = await handleUpload(thumbnailFile, "image");
        if (!thumbnailUrl) return;
      }

      const updatedVideo = {
        ...selectedVideo,
        ...values,
        videoUrl,
        thumbnailUrl,
        ageLimit: Number(values.ageLimit),
        duration: Number(values.duration),
      };

      await updateVideoMutation.mutateAsync({
        id: selectedVideo.id,
        data: updatedVideo,
      });

      message.success("Video muvaffaqiyatli yangilandi!");
      setEditDrawerVisible(false);
      editForm.resetFields();
      setVideoFile(null);
      setThumbnailFile(null);
      refetch();
    } catch {
      message.error("Video yangilashda xatolik yuz berdi!");
    }
  };

  const handleViewVideo = (video: Video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const handleEditVideo = (video: Video) => {
    setSelectedVideo(video);
    editForm.setFieldsValue({
      title: video.title,
      description: video.description,
      ageLimit: video.ageLimit,
      duration: video.duration,
      status: video.status,
      tags: video.tags || [],
    });
    setEditDrawerVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedVideo(null);
  };

  const handleEditDrawerClose = () => {
    setEditDrawerVisible(false);
    setSelectedVideo(null);
    setVideoFile(null);
    setThumbnailFile(null);
  };

  // Statusni table'dan o'zgartirish
  const handleStatusChange = async (videoId: number, newStatus: string) => {
    try {
      const video = data?.data?.content.find((v: Video) => v.id === videoId);
      if (!video) return;

      await updateVideoMutation.mutateAsync({
        id: videoId,
        data: {
          ...video,
          status: newStatus,
        },
      });

      message.success("Status muvaffaqiyatli yangilandi!");
      refetch();
    } catch {
      message.error("Status yangilashda xatolik yuz berdi!");
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    try {
      await deleteVideoMutation.mutateAsync(videoId);
      message.success("Video muvaffaqiyatli o'chirildi!");
      refetch();
    } catch {
      message.error("Video o'chirishda xatolik yuz berdi!");
    }
  };

  // Jadval ustunlari
  const columns = [
    {
      title: "Rasm",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (url: string) => {
        const poster = url?.split("/")?.pop();
        return (
          <Image
            src={`https://api.alla.itic.uz/api/stream/image/${poster || ""}`}
            alt="thumbnail"
            width={80}
            height={60}
            className="rounded-md object-cover border-purple-400 border"
            preview={false}
          />
        );
      },
    },
    {
      title: "Sarlavha",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "Tavsif",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span className="text-gray-400 line-clamp-2">
          {text || "Tavsif mavjud emas"}
        </span>
      ),
    },
    {
      title: "Yuklangan sana",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return (
          <span className="underline">
            {moment(createdAt).format("DD MMM YYYY hh:mm")}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Video) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={STATUS_OPTIONS}
          className="w-40"
          suffixIcon={null}
        />
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      width: 200,
      render: (_: any, record: Video) => (
        <div className="flex gap-2">
          {/* Ko'rish tugmasi */}
          <Button
            type="link"
            onClick={() => handleViewVideo(record)}
            icon={<EyeOutlined />}
            className="text-blue-400 hover:text-blue-300"
            size="small"
          >
            Ko'rish
          </Button>

          {/* Tahrirlash tugmasi */}
          <Button
            type="link"
            onClick={() => handleEditVideo(record)}
            icon={<EditOutlined />}
            className="text-green-400 hover:text-green-300"
            size="small"
          >
            Tahrirlash
          </Button>

          {/* O'chirish tugmasi */}
          <Popconfirm
            title="Videoni o'chirish"
            description="Haqiqatan ham bu videoni o'chirmoqchimisiz?"
            onConfirm={() => handleDeleteVideo(record.id)}
            okText="Ha"
            cancelText="Yo'q"
            okType="danger"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className="text-red-400 hover:text-red-300"
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        Video qo'shish
      </Button>

      {/* Jadval */}
      <div className="bg-[#141414] p-4 rounded-xl border border-gray-800 shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4">
          Videolar ro'yxati
        </h3>
        <Table
          columns={columns}
          dataSource={data?.data?.content || []}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          className="!text-white"
          scroll={{ y: "calc(100vh - 200px)" }}
        />
      </div>

      {/* Video qo'shish drawer */}
      <Drawer
        title="Yangi video qo'shish"
        width={500}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="space-y-4"
        >
          <Form.Item
            name="title"
            label="Sarlavha"
            rules={[{ required: true, message: "Sarlavha kiritish majburiy!" }]}
          >
            <Input placeholder="Video sarlavhasini kiriting" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Tavsif"
            rules={[{ required: true, message: "Tavsif kiritish majburiy!" }]}
          >
            <TextArea rows={4} placeholder="Video haqida qisqacha ma'lumot" />
          </Form.Item>

          <Form.Item
            name="ageLimit"
            label="Yosh cheklovi"
            rules={[{ required: true, message: "Yosh cheklovini kiriting!" }]}
          >
            <Input type="number" placeholder="Masalan: 6" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Davomiylik (sekundlarda)"
            rules={[{ required: true, message: "Davomiylikni kiriting!" }]}
          >
            <Input type="number" placeholder="Masalan: 180" />
          </Form.Item>

          <Form.Item label="Video fayl" required>
            <Upload
              accept="video/*"
              maxCount={1}
              beforeUpload={(file) => {
                setVideoFile(file);
                return false;
              }}
              showUploadList={{ showRemoveIcon: true }}
            >
              <Button
                loading={uploadingVideo}
                icon={uploadingVideo ? <LoadingOutlined /> : undefined}
              >
                {uploadingVideo ? "Video yuklanmoqda..." : "Videoni tanlang"}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Video rasmi (thumbnail)" required>
            <Upload
              accept="image/*"
              maxCount={1}
              beforeUpload={(file) => {
                setThumbnailFile(file);
                return false;
              }}
              showUploadList={{ showRemoveIcon: true }}
            >
              <Button
                loading={uploadingImage}
                className="!w-full h-11 !bg-[#252525] text-white border border-gray-700 hover:bg-[#252525]"
                icon={uploadingImage ? <LoadingOutlined /> : undefined}
              >
                {uploadingImage ? "Rasm yuklanmoqda..." : "Rasmni tanlang"}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createVideoMutation.isLoading}
              className="w-full"
            >
              Tasdiqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      {/* Video tahrirlash drawer */}
      <Drawer
        title={`Video tahrirlash - ${selectedVideo?.title}`}
        width={500}
        onClose={handleEditDrawerClose}
        open={editDrawerVisible}
      >
        {selectedVideo && (
          <Form
            layout="vertical"
            form={editForm}
            onFinish={handleEditFinish}
            className="space-y-4"
          >
            <Form.Item
              name="title"
              label="Sarlavha"
              rules={[
                { required: true, message: "Sarlavha kiritish majburiy!" },
              ]}
            >
              <Input placeholder="Video sarlavhasini kiriting" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Tavsif"
              rules={[{ required: true, message: "Tavsif kiritish majburiy!" }]}
            >
              <TextArea rows={4} placeholder="Video haqida qisqacha ma'lumot" />
            </Form.Item>

            <Form.Item
              name="ageLimit"
              label="Yosh cheklovi"
              rules={[{ required: true, message: "Yosh cheklovini kiriting!" }]}
            >
              <Input type="number" placeholder="Masalan: 6" />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Davomiylik (sekundlarda)"
              rules={[{ required: true, message: "Davomiylikni kiriting!" }]}
            >
              <Input type="number" placeholder="Masalan: 180" />
            </Form.Item>

            <Form.Item name="status" label="Status">
              <Select options={STATUS_OPTIONS} />
            </Form.Item>

            <Form.Item name="tags" label="Teglar">
              <Select
                mode="multiple"
                placeholder="Teglarni tanlang"
                options={STATIC_TAGS.map((tag) => ({ value: tag, label: tag }))}
              />
            </Form.Item>

            {/* Video fayl yangilash */}
            <Form.Item label="Video fayl (agar o'zgartirmoqchi bo'lsangiz)">
              <Upload
                accept="video/*"
                maxCount={1}
                beforeUpload={(file) => {
                  setVideoFile(file);
                  return false;
                }}
                showUploadList={{ showRemoveIcon: true }}
              >
                <Button
                  loading={uploadingVideo}
                  icon={uploadingVideo ? <LoadingOutlined /> : undefined}
                >
                  {uploadingVideo
                    ? "Video yuklanmoqda..."
                    : "Yangi video tanlang"}
                </Button>
              </Upload>
            </Form.Item>

            {/* Rasm fayl yangilash */}
            <Form.Item label="Video rasmi (agar o'zgartirmoqchi bo'lsangiz)">
              <Upload
                accept="image/*"
                maxCount={1}
                beforeUpload={(file) => {
                  setThumbnailFile(file);
                  return false;
                }}
                showUploadList={{ showRemoveIcon: true }}
              >
                <Button
                  loading={uploadingImage}
                  icon={uploadingImage ? <LoadingOutlined /> : undefined}
                >
                  {uploadingImage
                    ? "Rasm yuklanmoqda..."
                    : "Yangi rasm tanlang"}
                </Button>
              </Upload>
              {selectedVideo?.thumbnailUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-400">Joriy rasm:</p>
                  <Image
                    src={`https://api.alla.itic.uz/api/stream/image/${selectedVideo.thumbnailUrl
                      .split("/")
                      .pop()}`}
                    alt="thumbnail"
                    width={80}
                    height={60}
                    className="rounded-md object-cover mt-1"
                    preview={false}
                  />
                </div>
              )}
            </Form.Item>

            <div className="flex gap-2 pt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={updateVideoMutation.isLoading}
                className="flex-1"
              >
                Yangilash
              </Button>
              <Button onClick={handleEditDrawerClose} className="flex-1">
                Bekor qilish
              </Button>
            </div>
          </Form>
        )}
      </Drawer>

      {/* Video ko'rish modal */}
      <VideoModal
        video={selectedVideo}
        visible={modalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default CategoryPage;
