"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import AudioBook from "@/app/_components/AuidoBookPage";
import PdfBook from "@/app/_components/PdfBookPage";
import { useGetBookById } from "@/entities/Books/api";
import Loader from "@/app/_components/Loader";

interface BookPageProps {
  params: {
    id: string; // Kitob ID'si
  };
}

const GRADIENT_CLASS = "bg-gradient-to-r from-[#A580E9] to-[#E07FAF]";

const BookPage: React.FC<BookPageProps> = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const bookId = params.id;

  // ***** Queries *****
  const { data, isLoading } = useGetBookById(Number(bookId));

  const currentTab = searchParams.get("tab") || "pdf";
  const setTab = (tabName: "pdf" | "audio") => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tab", tabName);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const TabButton: React.FC<{ name: "pdf" | "audio"; label: string }> = ({
    name,
    label,
  }) => {
    const isActive = currentTab === name;

    return (
      <button
        onClick={() => setTab(name)}
        className={`
          flex-1 py-3 text-lg font-semibold transition-all duration-300 rounded-lg mx-1
          ${
            isActive
              ? `text-white ${GRADIENT_CLASS} shadow-lg` // Aktiv holat: Gradient, Oq tekst
              : "text-gray-500 hover:text-gray-200 hover:bg-gray-800" // Passiv holat: Ochroq rang, Qora fonda hover effekti
          }
        `}
      >
        {label}
      </button>
    );
  };

  const renderContent = useMemo(() => {
    const poster = data?.data?.coverImageUrl?.split("/")?.pop();
    switch (currentTab) {
      case "audio":
        return (
          <AudioBook
            coverImageUrl={`https://api.alla.itic.uz/api/stream/image/${
              poster || ""
            }`}
            bookTitle={data?.data?.title}
          />
        );
      case "pdf":
      default:
        return <PdfBook />;
    }
  }, [currentTab, params.id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen  text-white p-4 sm:p-8">
      <header className="mb-8 max-w-xl mx-auto">
        <div className={`flex p-1 rounded-xl bg-gray-900 shadow-xl`}>
          <TabButton name="pdf" label="📄 PDF O'qish" />
          <TabButton name="audio" label="🎧 Audio Tinglash" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto">{renderContent}</main>
    </div>
  );
};

export default BookPage;
