import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const CartoonSlides = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const isDark = theme === "dark";

  const images = [
    "/assets/images/slide1.png",
    "/assets/images/slide2.png",
    "/assets/images/slide3.png",
    "/assets/images/slide4.png",
    "/assets/images/slide1.png",
    "/assets/images/slide2.png",
    "/assets/images/slide3.png",
    "/assets/images/slide4.png",
  ];

  return (
    <div
      className={`w-full min-h-[700px] h-full relative z-10 flex items-center justify-center overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-[#001145] via-[#0a1f6c] to-[#001145]"
          : "bg-gradient-to-b from-[#133CCA] via-[#4767d6] to-[#133CCA]"
      }`}
    >
      {/* Light mode uchun ajoyib gradient layer */}
      {!isDark && (
        <>
          {/* Shaffof gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-500/5 to-blue-600/10 z-0"></div>

          {/* Nuqta pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] z-0"></div>

          {/* Yumshoq glow markazda */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-300/10 rounded-full blur-3xl z-0"></div>
        </>
      )}

      {/* Dark mode uchun gradient */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-blue-800/10 z-0"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-3xl z-0"></div>
        </>
      )}

      {/* Asosiy slider */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: -80,
            depth: 150,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          loop={true}
          className="w-full py-10"
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={i}
              className="!w-[400px] !h-[560px] transition-transform duration-500 ease-out"
            >
              <div className="relative w-full h-full group">
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-3xl"
                  style={{
                    boxShadow: isDark
                      ? "0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.1)"
                      : "0 30px 60px -15px rgba(19, 60, 202, 0.4), 0 0 0 1px rgba(255,255,255,0.3)",
                  }}
                />

                {/* White border glow effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-300"></div>

                {/* Subtle glow behind image */}
                <div className="absolute -inset-4 bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-[-1]"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Yuqori va pastki gradient fade */}
      <div
        className={`absolute top-0 left-0 w-full h-40 ${
          isDark
            ? "bg-gradient-to-b from-[#001145] to-transparent"
            : "bg-gradient-to-b from-[#133CCA] to-transparent"
        } z-10 pointer-events-none`}
      ></div>

      <div
        className={`absolute bottom-0 left-0 w-full h-40 ${
          isDark
            ? "bg-gradient-to-t from-[#001145] to-transparent"
            : "bg-gradient-to-t from-[#133CCA] to-transparent"
        } z-10 pointer-events-none`}
      ></div>
    </div>
  );
};

export default CartoonSlides;
