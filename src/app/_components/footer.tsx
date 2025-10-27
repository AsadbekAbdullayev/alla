"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";

  return (
    <footer
      className={`w-full relative min-h-[900px] flex flex-col justify-end ${
        !isDark ? "bg-gradient-to-b from-[#C2D9C6] to-[#76A97E]" : ""
      }`}
    >
      <div
        className="px-[120px] pt-[120px] relative z-10 max-sm:px-4 sm:px-8"
        style={{
          background: isDark
            ? "linear-gradient(360deg, #211A61 0%, rgba(181, 229, 252, 0) 100%)"
            : "linear-gradient(360deg, #2D8934 0%, rgba(181, 229, 252, 0) 100%)",
        }}
      >
        <div className="w-full flex justify-between pb-[80px] relative z-50 border-b border-[#FFFFFF33] max-sm:flex-col max-sm:gap-12">
          <div className="max-w-[567px] w-full">
            <Image
              src={
                isDark
                  ? "/assets/icons/footerLogo.svg"
                  : "/assets/icons/allaLight.svg"
              }
              alt="Footer Logo"
              width={120}
              height={157}
              loading="lazy"
            />

            <p
              className="text-[18px] font-[600] text-white leading-[24px] pt-8"
              style={{ fontFamily: "Fredoka" }}
            >
              Alla — bolajonlar uchun xavfsiz va foydali media platforma. Milliy
              allalar, multfilmlar, ta’limiy kontent va sog‘lom turmush tarzi
              loyihalari bilan farzandingizning quvonchi va bilimi uchun xizmat
              qilamiz.
            </p>
          </div>

          <div className="flex justify-end gap-[24px] w-full max-sm:justify-between">
            <div className="max-w-[193px] w-full">
              <p className="text-[#FFFFFF99] text-[14px] pb-[13px] font-[600]">
                Asosiy
              </p>
              <ul className="space-y-[13px]">
                {[
                  "Bo’limlar",
                  "Platforma imkoniyatlari",
                  "Bolalar xavfsizligi",
                ].map((text) => (
                  <li
                    key={text}
                    className="text-white text-[16px] cursor-pointer font-[600]"
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-[180px] w-full">
              <p className="text-[#FFFFFF99] text-[14px] font-[600] pb-[13px]">
                Faoliyat
              </p>
              <ul className="space-y-[13px]">
                {["Biz haqimizda", "Rahbariyat"].map((text) => (
                  <li
                    key={text}
                    className="text-white text-[16px] cursor-pointer font-[600]"
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-[34px] flex justify-between">
          <p className="text-[#FFFFFF99] text-[14px] font-[500]">
            © 2025 Alla platformasi
          </p>

          <div className="flex items-center gap-4">
            {[
              { src: "/assets/icons/footerInstagram.svg", alt: "Instagram" },
              { src: "/assets/icons/footerTelegram.svg", alt: "Telegram" },
              { src: "/assets/icons/footerTwitter.svg", alt: "Twitter" },
              { src: "/assets/icons/footerFacebook.svg", alt: "Facebook" },
            ].map((icon) => (
              <a key={icon.alt} href="#">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <Image
        src="/assets/images/footerBg.png"
        alt="Footer Background"
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute top-[-400px] left-0 w-screen max-sm:top-[400px] max-lg:top-[280px]"
      />
    </footer>
  );
}
