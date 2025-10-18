// app/layout.tsx (Server Component)
import type { Metadata, Viewport } from "next";
import RootWrapper from "./_components/RootWrapper";
import "./globals.css";

// 🔹 SEO metadata (umumiy sayt uchun)
export const metadata: Metadata = {
  title: {
    default: "Alla — Bolalar uchun xavfsiz internet makoni",
    template: "%s | Alla", // har bir sahifa o‘z sarlavhasini qo‘shadi
  },
  description:
    "Bu yerda faqat ta’limiy va tarbiyaviy kontent: multfilmlar, qo‘shiqlar, kitoblar va interaktiv mashqlar.",
  keywords: [
    "Alla",
    "bolalar",
    "ta’lim",
    "tarbiya",
    "multfilm",
    "kitob",
    "qo‘shiq",
    "interaktiv o‘yinlar",
  ],
  authors: [{ name: "TRK Team" }],
  creator: "TRK Company",
  publisher: "TRK Company",
  metadataBase: new URL("https://alla.itic.uz"),
  alternates: {
    canonical: "https://alla.itic.uz",
  },
  openGraph: {
    title: "Alla — Bolalar uchun xavfsiz internet makoni",
    description:
      "Multfilmlar, qo‘shiqlar, kitoblar va interaktiv mashqlar — barchasi bolalar uchun xavfsiz muhitda.",
    url: "https://alla.itic.uz",
    siteName: "Alla",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alla — Bolalar uchun xavfsiz internet makoni",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alla — Bolalar uchun xavfsiz internet makoni",
    description:
      "Bolalar uchun ta’limiy va tarbiyaviy kontent platformasi — multfilmlar, qo‘shiqlar, kitoblar va o‘yinlar.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

// 🔹 Mobil uchun viewport
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" dir="ltr">
      <head>
        {/* Favicons, meta va font preconnectlar qo‘shish */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0f0f0f] text-white antialiased">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
