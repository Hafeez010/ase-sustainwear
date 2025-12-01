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
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold mb-4 text-black text-center">
        System Logs
      </h1>

      {/* Navigation Tabs */}
      <AdminNavBar activeTab="System Logs" />

      {/* Logs Table */}
      <div className="w-full max-w-6xl mt-10">
        <SystemLogsTable logs={logs} />
      </div>
    </main>
  );
}
