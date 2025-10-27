"use client";
import { Form, Input, Upload, Button, message, Image, Tag } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { validateFileFormat } from "@/lib";

const { TextArea } = Input;

interface BookFormProps {
  form: any;
  onFinish: (values: any) => void;
  loading: boolean;
  coverFile: File | null;
  setCoverFile: (file: File | null) => void;
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
  uploadingCover: boolean;
  uploadingPdf: boolean;
  uploadingAudio: boolean;
  isEdit?: boolean;
  selectedBook?: any;
}

export const BookForm: React.FC<BookFormProps> = ({
  form,
  onFinish,
  loading,
  coverFile,
  setCoverFile,
  pdfFile,
  setPdfFile,
  audioFile,
  setAudioFile,
  uploadingCover,
  uploadingPdf,
  uploadingAudio,
  isEdit = false,
  selectedBook,
}) => {
  const handleBeforeUpload = (file: File, type: "image" | "pdf" | "audio") => {
    const allowedTypes =
      type === "image" ? ["image"] : type === "pdf" ? ["pdf"] : ["audio"];
    const validation = validateFileFormat(file, allowedTypes);

    if (!validation.isValid) {
      message.error(validation.error);
      return false;
    }

    // Faylni state ga saqlash
    if (type === "image") setCoverFile(file);
    else if (type === "pdf") setPdfFile(file);
    else setAudioFile(file);

    return false;
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      className="space-y-4"
    >
      <Form.Item
        name="title"
        label="Kitob nomi"
        rules={[{ required: true, message: "Kitob nomini kiriting!" }]}
      >
        <Input placeholder="Kitob nomi" />
      </Form.Item>

      <Form.Item
        name="author"
        label="Muallif"
        rules={[{ required: true, message: "Muallifni kiriting!" }]}
      >
        <Input placeholder="Muallif ismi" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Tavsif"
        rules={[{ required: true, message: "Tavsif kiriting!" }]}
      >
        <TextArea rows={4} placeholder="Kitob haqida qisqacha ma'lumot" />
      </Form.Item>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="ageLimit"
          label="Yosh cheklovi"
          rules={[{ required: true, message: "Yosh cheklovini kiriting!" }]}
        >
          <Input type="number" placeholder="6" min={0} max={18} />
        </Form.Item>

        <Form.Item
          name="totalPages"
          label="Sahifalar soni"
          rules={[{ required: true, message: "Sahifalar sonini kiriting!" }]}
        >
          <Input type="number" placeholder="120" min={1} />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Davomiylik (daqiqa)"
          rules={[{ required: true, message: "Davomiylikni kiriting!" }]}
        >
          <Input type="number" placeholder="60" min={1} />
        </Form.Item>
      </div>

      {/* Muqova rasm */}
      <Form.Item label="Kitob muqovasi" required>
        <Upload
          accept="image/*"
          maxCount={1}
          beforeUpload={(file) => handleBeforeUpload(file, "image")}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button
            loading={uploadingCover}
            icon={uploadingCover ? <LoadingOutlined /> : undefined}
          >
            {uploadingCover ? "Rasm yuklanmoqda..." : "Muqova rasmini tanlang"}
          </Button>
        </Upload>
        {!isEdit && coverFile && (
          <Tag color="green" className="mt-2">
            ✅ {coverFile.name}
          </Tag>
        )}
        {isEdit && selectedBook?.coverImageUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-400">Joriy muqova:</p>
            <Image
              src={`https://api.alla.itic.uz/api/stream/image/${selectedBook.coverImageUrl
                .split("/")
                .pop()}`}
              alt="cover"
              width={60}
              height={80}
              className="rounded-md object-cover mt-1"
              preview={false}
            />
          </div>
        )}
      </Form.Item>

      {/* PDF fayl */}
      <Form.Item label="PDF fayl">
        <Upload
          accept=".pdf"
          maxCount={1}
          beforeUpload={(file) => handleBeforeUpload(file, "pdf")}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button
            loading={uploadingPdf}
            icon={uploadingPdf ? <LoadingOutlined /> : undefined}
          >
            {uploadingPdf ? "PDF yuklanmoqda..." : "PDF faylni tanlang"}
          </Button>
        </Upload>
        {!isEdit && pdfFile && (
          <Tag color="blue" className="mt-2">
            📄 {pdfFile.name}
          </Tag>
        )}
        {isEdit && selectedBook?.pdfUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-400">Joriy PDF:</p>
            <Tag color="blue" className="mt-1">
              📄 {selectedBook.pdfUrl.split("/").pop()}
            </Tag>
          </div>
        )}
      </Form.Item>

      {/* Audio fayl */}
      <Form.Item label="Audio fayl">
        <Upload
          accept="audio/*"
          maxCount={1}
          beforeUpload={(file) => handleBeforeUpload(file, "audio")}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button
            loading={uploadingAudio}
            icon={uploadingAudio ? <LoadingOutlined /> : undefined}
          >
            {uploadingAudio ? "Audio yuklanmoqda..." : "Audio faylni tanlang"}
          </Button>
        </Upload>
        {!isEdit && audioFile && (
          <Tag color="orange" className="mt-2">
            🎵 {audioFile.name}
          </Tag>
        )}
        {isEdit && selectedBook?.audioUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-400">Joriy audio:</p>
            <Tag color="orange" className="mt-1">
              🎵 {selectedBook.audioUrl.split("/").pop()}
            </Tag>
          </div>
        )}
      </Form.Item>

      {!isEdit && (
        <div className="text-sm text-yellow-500 bg-yellow-50 p-2 rounded">
          📝 Iltimos, kamida bitta format (PDF yoki Audio) tanlang!
        </div>
      )}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
        >
          {isEdit ? "Yangilash" : "Tasdiqlash"}
        </Button>
      </Form.Item>
    </Form>
  );
};
