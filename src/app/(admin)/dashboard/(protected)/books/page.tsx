"use client";
import React, { useEffect, useState } from "react";
import {
  useUploadFile,
  useCreateBook,
  useGetBooks,
  useUpdateBook,
  useDeleteBook,
  Book,
} from "@/entities/Admin/api";
import {
  Button,
  Drawer,
  message,
  Spin,
  Table,
  Tag,
  Image,
  Select,
  Popconfirm,
  Form,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

import nextDynamic from "next/dynamic";

const BookForm = nextDynamic(
  () => import("@/app/_components/BookForms").then((mod) => mod.BookForm),
  {
    ssr: false,
  }
);

const PdfModal = nextDynamic(
  () => import("@/app/_components/BookModals").then((mod) => mod.PdfModal),
  {
    ssr: false,
  }
);

const AudioModal = nextDynamic(
  () => import("@/app/_components/BookModals").then((mod) => mod.AudioModal),
  {
    ssr: false,
  }
);

const BookPage: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const uploadMutation = useUploadFile();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();
  const { data, isLoading, refetch } = useGetBooks({ page: 0, size: 20 });

  const STATUS_OPTIONS = [
    { value: "PENDING", label: "⏳ Kutilmoqda" },
    { value: "APPROVED", label: "✅ Tasdiqlangan" },
    { value: "REJECTED", label: "❌ Rad etilgan" },
  ];

  const handleUpload = async (file: File, type: "image" | "pdf" | "audio") => {
    try {
      if (type === "image") setUploadingCover(true);
      else if (type === "pdf") setUploadingPdf(true);
      else setUploadingAudio(true);

      const res = await uploadMutation.mutateAsync({ type, file });
      message.success(
        `${
          type === "image" ? "Rasm" : type === "pdf" ? "PDF" : "Audio"
        } muvaffaqiyatli yuklandi!`
      );
      return res?.data?.videoUrl || res?.data;
    } catch {
      message.error(
        `${
          type === "image" ? "Rasm" : type === "pdf" ? "PDF" : "Audio"
        } yuklashda xatolik yuz berdi!`
      );
      return "";
    } finally {
      if (type === "image") setUploadingCover(false);
      else if (type === "pdf") setUploadingPdf(false);
      else setUploadingAudio(false);
    }
  };

  const handleFinish = async (values: any) => {
    if (!coverFile) return message.error("Iltimos, kitob muqovasini yuklang!");
    if (!pdfFile && !audioFile)
      return message.error("Iltimos, PDF yoki Audio faylni yuklang!");

    const coverImageUrl = await handleUpload(coverFile, "image");
    let pdfUrl = "";
    let audioUrl = "";

    if (pdfFile) pdfUrl = await handleUpload(pdfFile, "pdf");
    if (audioFile) audioUrl = await handleUpload(audioFile, "audio");

    if (!coverImageUrl || (!pdfUrl && !audioUrl)) return;

    const newBook: Partial<Book> = {
      title: values.title,
      author: values.author,
      description: values.description,
      coverImageUrl,
      pdfUrl: pdfUrl || undefined,
      audioUrl: audioUrl || undefined,
      ageLimit: Number(values.ageLimit),
      totalPages: Number(values.totalPages),
      duration: Number(values.duration),
      status: "PENDING",
      tags: ["bolalar", "ertak", "ta'lim"],
    };

    try {
      await createBookMutation.mutateAsync(newBook as Book);
      message.success("Kitob muvaffaqiyatli yaratildi!");
      setDrawerVisible(false);
      form.resetFields();
      setCoverFile(null);
      setPdfFile(null);
      setAudioFile(null);
      refetch();
    } catch {
      message.error("Kitob yaratishda xatolik yuz berdi!");
    }
  };

  const handleEditFinish = async (values: any) => {
    if (!selectedBook) return;

    try {
      let coverImageUrl = selectedBook.coverImageUrl;
      let pdfUrl = selectedBook.pdfUrl;
      let audioUrl = selectedBook.audioUrl;

      if (coverFile) {
        coverImageUrl = await handleUpload(coverFile, "image");
        if (!coverImageUrl) return;
      }
      if (pdfFile) pdfUrl = await handleUpload(pdfFile, "pdf");
      if (audioFile) audioUrl = await handleUpload(audioFile, "audio");

      const updatedBook = {
        ...selectedBook,
        ...values,
        coverImageUrl,
        pdfUrl,
        audioUrl,
        ageLimit: Number(values.ageLimit),
        totalPages: Number(values.totalPages),
        duration: Number(values.duration),
      };

      await updateBookMutation.mutateAsync({
        id: selectedBook.id,
        data: updatedBook,
      });

      message.success("Kitob muvaffaqiyatli yangilandi!");
      setEditDrawerVisible(false);
      editForm.resetFields();
      setCoverFile(null);
      setPdfFile(null);
      setAudioFile(null);
      refetch();
    } catch {
      message.error("Kitob yangilashda xatolik yuz berdi!");
    }
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    editForm.setFieldsValue({
      title: book.title,
      author: book.author,
      description: book.description,
      ageLimit: book.ageLimit,
      totalPages: book.totalPages,
      duration: book.duration,
      status: book.status,
      tags: book.tags || [],
    });
    setEditDrawerVisible(true);
  };

  const handleDeleteBook = async (bookId: number) => {
    try {
      await deleteBookMutation.mutateAsync(bookId);
      message.success("Kitob muvaffaqiyatli o'chirildi!");
      refetch();
    } catch {
      message.error("Kitob o'chirishda xatolik yuz berdi!");
    }
  };

  const handleViewPdf = (book: Book) => {
    setSelectedBook(book);
    setPdfModalVisible(true);
  };

  const handleListenAudio = (book: Book) => {
    setSelectedBook(book);
    setAudioModalVisible(true);
  };

  const handleStatusChange = async (bookId: number, newStatus: string) => {
    try {
      const book = data?.data?.content.find((b: Book) => b.id === bookId);
      if (!book) return;

      await updateBookMutation.mutateAsync({
        id: bookId,
        data: { ...book, status: newStatus },
      });

      message.success("Status muvaffaqiyatli yangilandi!");
      refetch();
    } catch {
      message.error("Status yangilashda xatolik yuz berdi!");
    }
  };

  const handleEditDrawerClose = () => {
    setEditDrawerVisible(false);
    setSelectedBook(null);
    setCoverFile(null);
    setPdfFile(null);
    setAudioFile(null);
  };

  const columns = [
    {
      title: "Muqova",
      dataIndex: "coverImageUrl",
      key: "coverImageUrl",
      render: (url: string) => (
        <Image
          src={`https://api.alla.itic.uz/api/stream/image/${
            url?.split("/")?.pop() || ""
          }`}
          alt="cover"
          width={60}
          height={80}
          className="rounded-md object-cover border-purple-400 border"
          preview={false}
        />
      ),
    },
    {
      title: "Sarlavha",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span className="text-white font-medium">{text}</span>
      ),
    },
    {
      title: "Muallif",
      dataIndex: "author",
      key: "author",
      render: (text: string) => <span className="text-gray-300">{text}</span>,
    },
    {
      title: "Sahifalar",
      dataIndex: "totalPages",
      key: "totalPages",
      render: (pages: number) => (
        <span className="text-blue-400">{pages} sah</span>
      ),
    },
    {
      title: "Yuklangan sana",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span className="text-gray-400">
          {moment(createdAt).format("DD MMM YYYY")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Book) => (
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
      title: "Formatlar",
      key: "formats",
      render: (_: any, record: Book) => (
        <div className="flex gap-1">
          {record.pdfUrl && (
            <Button
              type="link"
              icon={<FileTextOutlined />}
              // onClick={() => handleViewPdf(record)}
              className="text-blue-400 p-0"
              size="small"
            >
              PDF
            </Button>
          )}
          {record.audioUrl && (
            <Button
              type="link"
              icon={<PlayCircleOutlined />}
              // onClick={() => handleListenAudio(record)}
              className="text-green-400 p-0"
              size="small"
            >
              Audio
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      fixed: "right" as const,
      width: 150,
      render: (_: any, record: Book) => (
        <div className="flex gap-1">
          {/* <Button
            type="link"
            onClick={() => handleEditBook(record)}
            icon={<EditOutlined />}
            className="text-blue-400 hover:text-blue-300 px-2"
            size="small"
          >
            Tahrirlash
          </Button> */}

          <Popconfirm
            title="Kitobni o'chirish"
            description="Haqiqatan ham bu kitobni o'chirmoqchimisiz?"
            onConfirm={() => handleDeleteBook(record.id)}
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        Kitob qo'shish
      </Button>

      {/* Jadval */}
      <div className="bg-[#141414] p-4 rounded-xl border border-gray-800 shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4">
          Kitoblar ro'yxati
        </h3>
        <Table
          columns={columns}
          dataSource={data?.data?.content || []}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="!text-white"
          scroll={{ x: 1200 }}
        />
      </div>

      {/* Kitob qo'shish drawer */}
      <Drawer
        title="Yangi kitob qo'shish"
        width={500}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <BookForm
          form={form}
          onFinish={handleFinish}
          loading={createBookMutation.isLoading}
          coverFile={coverFile}
          setCoverFile={setCoverFile}
          pdfFile={pdfFile}
          setPdfFile={setPdfFile}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          uploadingCover={uploadingCover}
          uploadingPdf={uploadingPdf}
          uploadingAudio={uploadingAudio}
        />
      </Drawer>

      {/* Kitob tahrirlash drawer */}
      <Drawer
        title={`Kitob tahrirlash - ${selectedBook?.title}`}
        width={500}
        onClose={handleEditDrawerClose}
        open={editDrawerVisible}
      >
        {selectedBook && (
          <BookForm
            form={editForm}
            onFinish={handleEditFinish}
            loading={updateBookMutation.isLoading}
            coverFile={coverFile}
            setCoverFile={setCoverFile}
            pdfFile={pdfFile}
            setPdfFile={setPdfFile}
            audioFile={audioFile}
            setAudioFile={setAudioFile}
            uploadingCover={uploadingCover}
            uploadingPdf={uploadingPdf}
            uploadingAudio={uploadingAudio}
            isEdit={true}
            selectedBook={selectedBook}
          />
        )}
      </Drawer>

      {/* Modallar */}
      {selectedBook && (
        <>
          <PdfModal
            visible={pdfModalVisible}
            onClose={() => setPdfModalVisible(false)}
            pdfUrl={selectedBook.pdfUrl!}
            title={selectedBook.title}
            id={selectedBook.id}
          />

          <AudioModal
            visible={audioModalVisible}
            onClose={() => setAudioModalVisible(false)}
            audioUrl={selectedBook.audioUrl!}
            title={selectedBook.title}
            author={selectedBook.author}
            id={selectedBook.id}
          />
        </>
      )}
    </div>
  );
};

export default BookPage;
