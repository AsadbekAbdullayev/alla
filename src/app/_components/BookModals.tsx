"use client";
import { Modal, Button, Spin } from "antd";
import {
  PlayCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-h5-audio-player/lib/styles.css";

// PDF.js workerini sozlash
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfModalProps {
  visible: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  id: number;
}

export const PdfModal: React.FC<PdfModalProps> = ({
  visible,
  onClose,
  pdfUrl,
  title,
  id,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // URL ni to'g'ri tayyorlash
  const getPdfUrl = () => {
    if (!token) return null;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    // URL formatini tekshirish va to'g'rilash
    let url = `${baseUrl}/stream/pdf/${id}?token=${token}`;

    // Agar URL noto'g'ri formatda bo'lsa, to'g'rilash
    if (!url.startsWith("http")) {
      url = `${window.location.origin}${url}`;
    }

    return {
      url: url,
      withCredentials: true,
      httpHeaders: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const pdfFileName = pdfUrl?.toString()?.split("/")?.pop() || "";
  const pdfDownloadUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stream/pdf/${id}?download=true`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error("PDF yuklashda xatolik:", error);
    setLoading(false);
    setError(true);
  }

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <FileTextOutlined />
          {title} - PDF Ko'rish
        </div>
      }
      open={visible}
      onCancel={onClose}
      width="90%"
      style={{ maxWidth: 1000 }}
      footer={[
        <Button
          key="download"
          href={pdfDownloadUrl}
          download
          icon={<DownloadOutlined />}
        >
          Yuklab olish
        </Button>,
        <Button key="close" onClick={onClose}>
          Yopish
        </Button>,
      ]}
    >
      <div className="h-[70vh] flex flex-col">
        {pdfUrl && token ? (
          <>
            {/* Navigation controls */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                  Oldingi
                </Button>
                <span className="text-white">
                  Sahifa {pageNumber} / {numPages}
                </span>
                <Button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                >
                  Keyingi
                </Button>
              </div>
              <span className="text-gray-300 text-sm">{pdfFileName}</span>
            </div>

            {/* PDF content */}
            <div className="flex-1 bg-gray-900 rounded-lg overflow-auto flex justify-center">
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <Spin size="large" />
                  <span className="ml-2 text-white">PDF yuklanmoqda...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-red-400 text-lg mb-2">
                      PDF yuklashda xatolik
                    </p>
                    <Button
                      href={getPdfUrl()?.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Brauzerda ochish
                    </Button>
                  </div>
                </div>
              )}

              {!error && (
                <Document
                  file={getPdfUrl()}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center h-full">
                      <Spin size="large" />
                    </div>
                  }
                  noData={
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white">PDF fayl topilmadi</p>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    width={Math.min(800, window.innerWidth - 100)}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
            <p className="text-gray-400 text-lg">
              {!token ? "Token topilmadi" : "PDF fayl mavjud emas"}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

// AudioModal komponenti
export const AudioModal: React.FC<any> = ({
  visible,
  onClose,
  audioUrl,
  title,
  author,
  id,
}) => {
  const audioFileName = audioUrl?.toString()?.split("/")?.pop() || "";
  const audioStreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/stream/audio/${id}`;
  const audioDownloadUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stream/audio/${id}?download=true`;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <PlayCircleOutlined />
          {title} - Audio Kitob
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={600}
      footer={[
        <Button
          key="download"
          href={audioDownloadUrl}
          download
          icon={<DownloadOutlined />}
        >
          Yuklab olish
        </Button>,
        <Button key="close" onClick={onClose}>
          Yopish
        </Button>,
      ]}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          {author && <p className="text-gray-600">Muallif: {author}</p>}
        </div>

        <audio controls className="w-full max-w-md" src={audioStreamUrl}>
          Sizning brauzeringiz audio elementni qo'llab-quvvatlamaydi.
        </audio>

        <p className="mt-4 text-sm text-gray-500">{audioFileName}</p>
      </div>
    </Modal>
  );
};
