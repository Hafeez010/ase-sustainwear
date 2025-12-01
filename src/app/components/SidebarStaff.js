"use client";

import React from "react";
import Link from "next/link";

const items = [
  { id: "dashboard", label: "Dashboard", href: "/charityStaff" },
  { id: "incoming", label: "Incoming Donations", href: "/charityStaff/incoming-donations" },
  { id: "inventory", label: "Inventory", href: "/charityStaff/inventory" },
  { id: "distribution", label: "Distribution Records", href: "/charityStaff/distribution" },
  // Reports removed
  { id: "settings", label: "Profile / Settings", href: "/charityStaff/settings" },
];

export default function SidebarStaff({ active = "dashboard" }) {
  return (
    <aside className="w-64 bg-white border-r-2 border-black flex flex-col">
      
      {/* Header */}
      <div className="p-6 border-b-2 border-black">
        <h1 className="text-xl font-bold">SustainWear</h1>
        <p className="text-sm text-gray-600">Charity Staff Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        {items.map((it) => (
          <Link
            key={it.id}
            href={it.href}
            className={`block w-full text-left px-4 py-2 border border-black rounded-md transition
              ${
                active === it.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t-2 border-black">
        <Link
          href="/"
          className="block w-full text-center border border-black py-2 rounded-md hover:bg-gray-200 transition font-semibold"
        >
          Logout
        </Link>
      </div>
    </aside>
  );
}

