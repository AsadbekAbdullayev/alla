"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const themeParam = searchParams.get("theme") || "light";
  const isDark = themeParam === "dark";

  const handleToggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("theme", !isDark ? "dark" : "light");
    router.replace(`?${params.toString()}`);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-14 h-8 flex items-center rounded-full p-[3px] transition-colors duration-500 ${
        isDark ? "bg-gradient-to-r from-[#253575] to-[#162561]" : "bg-gray-300"
      }`}
    >
      {/* Icons */}
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute ${
          isDark ? "right-2 text-yellow-200" : "left-2 text-yellow-500"
        } text-[14px]`}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.span>

      {/* Circle knob */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className={`w-6 h-6 rounded-full bg-white shadow-md ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}