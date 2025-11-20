"use client";

import Link from "next/link";

export default function AdminNavBar({ activeTab }) {
  const tabs = ["Dashboard", "User Management", "Reports & Analytics", "System Logs"];

  return (
    <div className="flex gap-4 justify-center mb-10">
      {tabs.map((tab) => (
        <Link
          key={tab}
          href="#"
          className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition ${
            tab === activeTab
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-100 text-black"
          }`}
        >
          {tab}
        </Link>
      ))}
    </div>
  );
}
