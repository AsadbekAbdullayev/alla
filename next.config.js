/** @type {import('next').NextConfig} */
module.exports = {
  // Webpack konfiguratsiyasi joyida qoldi
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }
    return config;
  },

  // 📸 Rasmlar konfiguratsiyasi yangilandi
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      // --- YANGI QO'SHILGAN DOMEN ---
      {
        protocol: "https",
        hostname: "api.alla.itic.uz",
        port: "",
        pathname: "/api/stream/image/**", // Faqat rasmlar yo'lini cheklaymiz
      },
    ],
  },
};
