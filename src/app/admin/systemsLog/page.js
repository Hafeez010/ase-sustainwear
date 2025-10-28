"use client";
import React from "react";

export default function SystemLogsPage() {
  const logs = [
    { time: "2025-10-28 14:29", user: "User 9", role: "Donor", action: "Submitted donation", status: "Success" },
    { time: "2025-10-28 16:30", user: "User 17", role: "Staff", action: "Rejected donation", status: "Success" },
    { time: "2025-10-28 17:41", user: "User 12", role: "Donor", action: "Updated donation", status: "Success" },
    { time: "2025-10-28 18:33", user: "User 1", role: "Admin", action: "Approved user", status: "Success" },
    { time: "2025-10-28 21:08", user: "User 6", role: "Staff", action: "Approved donation", status: "Success" },
  ];

  return (
    <div className="min-h-screen bg-[#CCF3CC] p-6 font-sans">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-black mb-6">System Logs</h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-10">
        {["Dashboard", "User Management", "Reports & Analytics", "System Logs"].map((tab) => (
          <div
            key={tab}
            className={`px-6 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium cursor-pointer ${
              tab === "System Logs" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-800"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300">
          <thead className="bg-gray-200 text-black font-bold text-center">
            <tr>
              <th className="px-4 py-2 border border-green-300">Timestamp</th>
              <th className="px-4 py-2 border border-green-300">User</th>
              <th className="px-4 py-2 border border-green-300">Role</th>
              <th className="px-4 py-2 border border-green-300">Action</th>
              <th className="px-4 py-2 border border-green-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-green-50 text-black"}
              >
                <td className="px-4 py-2 border border-green-300">{log.time}</td>
                <td className="px-4 py-2 border border-green-300">{log.user}</td>
                <td className="px-4 py-2 border border-green-300">{log.role}</td>
                <td className="px-4 py-2 border border-green-300">{log.action}</td>
                <td className="px-4 py-2 border border-green-300">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
