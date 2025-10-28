"use client";

import React from "react";
import Link from "next/link"; // if using CRA, replace with <a href> or react-router Link

const items = [
  { id: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
  { id: "users", label: "User Management", href: "/admin/users" },
  { id: "reports", label: "Reports", href: "/admin/reports" },
  { id: "logs", label: "System Logs", href: "/admin/logs" },
];

export default function Sidebar({ active = "dashboard" }) {
  return (
    <aside className="w-64 hidden lg:block border-r bg-white dark:bg-gray-800 dark:border-gray-700">
      <nav className="p-4 space-y-1">
        {items.map((it) => (
          <Link key={it.id} href={it.href} className={`block rounded px-3 py-2 text-sm ${active === it.id ? 'bg-green-50 dark:bg-gray-700 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
