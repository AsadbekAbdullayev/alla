"use client";
import { Modal, Button, Spin } from "antd";
import {
  PlayCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import AudioPlayer from "react-h5-audio-player";
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
  const token = sessionStorage.getItem("token");
  const pdfFileName = pdfUrl?.toString()?.split("/")?.pop() || "";
  const pdfStreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/stream/pdf/${id}?token=${token}`;
  const pdfDownloadUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stream/pdf/${id}?download=true`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(false);
  }

  function onDocumentLoadError() {
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
        {pdfUrl ? (
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
                      href={pdfStreamUrl}
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
                  file={pdfStreamUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center h-full">
                      <Spin size="large" />
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    width={800}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
            <p className="text-gray-400 text-lg">PDF fayl mavjud emas</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

interface AudioModalProps {
  visible: boolean;
  onClose: () => void;
  audioUrl: string;
  title: string;
  author: string;
  id: number;
}

export const AudioModal: React.FC<AudioModalProps> = ({
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
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400">by {author}</p>
        </div>

        {audioUrl ? (
          <>
            <div className="bg-gray-800 p-4 rounded-lg">
              <AudioPlayer
                autoPlay={false}
                src={audioStreamUrl}
                onPlay={(e) => console.log("Audio play boshlandi")}
                showJumpControls={false}
                layout="stacked"
                customProgressBarSection={["PROGRESS_BAR"]}
                customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                style={{
                  background: "transparent",
                  boxShadow: "none",
                }}
              />
            </div>

            <div className="text-sm text-gray-400">
              <p>Audio kitobni tinglash uchun play tugmasini bosing</p>
              <p className="text-xs mt-1">{audioFileName}</p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Audio fayl mavjud emas</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
