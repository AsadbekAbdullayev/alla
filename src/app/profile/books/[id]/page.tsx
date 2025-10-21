"use client";
import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "next/navigation";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Loader from "@/app/_components/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props: any, ref: any) => (
  <div className="flex justify-center items-start  bg-inherit p-2 h-screen w-full">
    <div
      ref={ref}
      className="bg-inherit rounded-md  overflow-hidden w-fit h-fit"
    >
      {props.children}
    </div>
  </div>
));
Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState<number>(0);
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: any) => setNumPages(numPages);
  const onFlip = (e: any) => setCurrentPage(e.data);

  const goNext = () => flipBookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => flipBookRef.current?.pageFlip()?.flipPrev();

  return (
    <div className="h-screen flex flex-col justify-start items-center overflow-hidden">
      <Document
        file={`https://api.alla.itic.uz/api/stream/pdf/${id}?token=${token}`}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex justify-center bg-inherit items-start h-screen">
            Kitob yuklanmoqda...
          </div>
        }
      >
        {numPages > 0 && (
          <HTMLFlipBook
            ref={flipBookRef as any}
            width={600}
            height={570}
            size="stretch"
            onFlip={onFlip}
            minWidth={600}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            drawShadow={true}
            flippingTime={500}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={1}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            showCover={false}
            className="w-[90vw] h-[85vh]"
            style={{
              width: "400px",
              height: "800px",
              background: "inherit",
            }}
            startPage={0}
          >
            {[...Array(numPages)].map((_, i) => (
              <Pages key={i}>
                <Page
                  pageNumber={i + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Pages>
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      {/* {numPages > 0 && (
        <div className="flex items-center gap-4 mt-6 flex-wrap justify-center">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={goPrev}
            disabled={currentPage === 0}
            className="!bg-purple-400 disabled:!bg-gray-400"
          >
            Orqaga
          </Button>

          <span className="text-lg font-medium text-white">
            Sahifa: {currentPage + 1} / {numPages}
          </span>

          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={goNext}
            disabled={currentPage + 1 === numPages}
            className="!bg-purple-400 disabled:!bg-gray-400"
          >
            Oldinga
          </Button>
        </div>
      )} */}
    </div>
  );
}

export default Flipbook;
