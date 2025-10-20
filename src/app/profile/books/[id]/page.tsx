"use client"; // Bu qatorni eng yuqoriga qo'shing
import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <>
      <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center  overflow-hidden">
        <h1 className="text-3xl text-white text-center font-bold">FlipBook-</h1>
        <HTMLFlipBook width={400} height={570}>
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={pNum + 1}>
              <Document
                file={
                  "https://api.alla.itic.uz/api/stream/pdf/11?token=eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6Iis5OTg5MDEyMzQ1NjciLCJ1c2VySWQiOjEsInN1YiI6Iis5OTg5MDEyMzQ1NjciLCJpYXQiOjE3NjA5Nzk2NzUsImV4cCI6MTc2MTA2NjA3NX0.Xe6MlIX_7BvLc5SFo1uW-CS4txxdjbh8sgfrgWjRfwM"
                }
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={pNum}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
              <p>
                Page {pNum} of {numPages}
              </p>
            </Pages>
          ))}
        </HTMLFlipBook>
      </div>
    </>
  );
}

export default Flipbook;
