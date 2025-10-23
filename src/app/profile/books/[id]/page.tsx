"use client";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "next/navigation";
import { Button } from "antd";
import {
  ExpandAltOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import screenfull from "screenfull";
import { gsap } from "gsap";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props: any, ref: any) => (
  <div className="flex justify-center items-start bg-inherit w-full">
    <div
      ref={ref}
      className="bg-inherit rounded-md   overflow-hidden w-fit h-fit"
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
  const [fullScreen, setFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: any) => setNumPages(numPages);
  const onFlip = (e: any) => setCurrentPage(e.data);

  const goNext = () => flipBookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => flipBookRef.current?.pageFlip()?.flipPrev();

  const dotsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.to(dotsRef.current, {
      opacity: 0,
      stagger: {
        each: 0.3,
        repeat: -1,
        yoyo: true,
      },
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handler = () => setFullScreen(screenfull.isFullscreen);
      screenfull.on("change", handler);
      return () => screenfull.off("change", handler);
    }
  }, []);

  return (
    <div className="h-fit flex flex-col justify-start relative items-center  ">
      <Document
        file={`https://api.alla.itic.uz/api/stream/pdf/${id}?token=${token}`}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex justify-center bg-inherit h-full items-start  pt-[100px] text-white text-xl">
            Kitob yuklanmoqda
            <span className="flex ml-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  ref={(el: any) => (dotsRef.current[i] = el!)}
                  className="mx-[1px]"
                >
                  .
                </span>
              ))}
            </span>
          </div>
        }
      >
        {numPages > 0 && (
          <div
            ref={containerRef}
            className={`w-full h-fit flex ${
              fullScreen && "items-center "
            } justify-center`}
          >
            <HTMLFlipBook
              ref={flipBookRef as any}
              width={fullScreen ? 600 : 500}
              height={700}
              size="stretch"
              onFlip={onFlip}
              minWidth={900}
              maxWidth={1200}
              minHeight={600}
              maxHeight={1000}
              drawShadow={true}
              flippingTime={500}
              usePortrait={false}
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
              className="w-[90vw] h-[85vh] rounded-md"
              style={{
                width: fullScreen ? "800px" : "800px",
                height: "730px",
                background: "inherit",
                overflow: "hidden",
              }}
              startPage={0}
            >
              {[...Array(numPages)].map((_, i) => (
                <Pages key={i}>
                  <Page
                    pageNumber={i + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    scale={0.86}
                  />
                </Pages>
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </Document>

      {numPages > 0 && (
        <div className="flex items-center gap-4  mt-2 flex-wrap justify-center">
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

          <Button
            type="primary"
            icon={<ExpandAltOutlined />}
            className="!bg-purple-500 "
            onClick={() => {
              if (screenfull.isEnabled && containerRef.current) {
                screenfull.toggle(containerRef.current);
              }
            }}
          >
            {"Full ekran ochish"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Flipbook;
