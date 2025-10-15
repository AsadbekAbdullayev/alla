// app/layout.tsx (Server Component)
import RootWrapper from "./_components/RootWrapper";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alla — Bolalar uchun xavfsiz internet makoni",
  description:
    "Bu yerda faqat ta’limiy va tarbiyaviy kontent: multfilmlar, qo‘shiqlar, kitoblar va interaktiv mashqlar.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
