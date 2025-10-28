"use client";

import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children, active = "dashboard" }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex">
        <Sidebar active={active} />
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
