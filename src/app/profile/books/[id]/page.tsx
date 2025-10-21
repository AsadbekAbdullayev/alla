"use client"; // Bu qatorni eng yuqoriga qo'shing
import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "next/navigation";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Loader from "@/app/_components/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props: any, ref: any) => {
  return (
    <div
      ref={ref}
      className="bg-inherit rounded-md overflow-hidden w-full h-full"
    >
      {props.children}
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState();
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const goNext = () => flipBookRef?.current?.pageFlip()?.flipNext();
  const goPrev = () => flipBookRef?.current?.pageFlip().flipPrev();

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-start pt-[100px] items-center overflow-hidden">
        <HTMLFlipBook
          ref={flipBookRef as any}
          width={400}
          height={570}
          size="stretch"
          onFlip={onFlip}
          minWidth={280}
          maxWidth={600}
          minHeight={400}
          maxHeight={800}
          drawShadow={true}
          flippingTime={800}
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
          className="shadow-lg"
          style={{
            width: "400px",
            height: "570px",
            background: "inherit",
          }}
          startPage={0}
        >
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={7}>
              <Document
                file={`https://api.alla.itic.uz/api/stream/pdf/${id}?token=${token}`}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="z-[999] w-full h-screen bg-inherit flex justify-center items-center">
                    <Loader />
                  </div>
                }
              >
                <Page
                  pageNumber={pNum}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            </Pages>
          ))}
        </HTMLFlipBook>

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
            className="!bg-purple-400 disabled:!bg-gray-400"
            disabled={currentPage + 1 === numPages}
          >
            Oldinga
          </Button>
        </div>
      </div>
    </>
  );
}

export default Flipbook;
