"use client";

import AdminNavBar from "@/app/components/AdminNavBar";
import SystemLogsTable from "@/app/components/SystemLogsTable";

export default function SystemsLogPage() {
  const logs = [
    { time: "2025-10-28 14:29", user: "User 9", role: "Donor", action: "Submitted donation", status: "Success" },
    { time: "2025-10-28 16:30", user: "User 17", role: "Staff", action: "Rejected donation", status: "Success" },
    { time: "2025-10-28 17:41", user: "User 12", role: "Donor", action: "Updated donation", status: "Success" },
    { time: "2025-10-28 18:33", user: "User 1", role: "Admin", action: "Approved user", status: "Success" },
    { time: "2025-10-28 21:08", user: "User 6", role: "Staff", action: "Approved donation", status: "Success" },
  ];

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-6 bg-gray-50 text-gray-800">

      {/* HEADER ROW */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        {/* Company Name */}
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>

        {/* Page Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          System Logs
        </h2>

        {/* Logout Button */}
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium">
          Logout
        </button>
      </div>

      {/* NAV BAR */}
      <AdminNavBar activeTab="System Logs" />

      {/* Logs Table */}
      <div className="w-full max-w-6xl mt-10">
        <SystemLogsTable logs={logs} />
      </div>
    </main>
  );
}
