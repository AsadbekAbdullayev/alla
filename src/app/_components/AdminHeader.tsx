"use client";

export default function AdminHeader() {
  return (
    <header className="bg-[#181818] px-6 py-3 shadow-md flex justify-between items-center">
      <h1 className="font-semibold text-lg">Admin Dashboard</h1>
      <div className="text-gray-400">Welcome, Super Admin 👑</div>
    </header>
  );
}
