"use client";

import Link from "next/link";

export default function AdminNavBar({ activeTab }) {
  const tabs = [
    { name: "Dashboard", href: "/admin" },
    { name: "User Management", href: "/admin/userManagement" },
    { name: "Reports & Analytics", href: "/admin/reportsAnalytics" },
    { name: "System Logs", href: "/admin/systemsLog" },
  ];

  return (
    <div className="flex gap-4 justify-center mb-10">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition ${
            tab.name === activeTab
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-100 text-black"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
