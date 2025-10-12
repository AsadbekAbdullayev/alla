"use client";

export default function Footer() {
  return (
    <footer className="mt-auto py-6 text-center bg-gradient-to-t from-gray-900 to-black shadow-inner border-t border-gray-800">
      <p className="text-gray-400 text-sm tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-400 font-semibold">
          Alla Video Platform
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
}
