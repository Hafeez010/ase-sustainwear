"use client";
import React from "react";

export default function ReportsAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#CCF3CC] p-6 font-sans">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Reports & Analytics
      </h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-10">
        {["Dashboard", "User Management", "Reports & Analytics", "System Logs"].map(
          (tab) => (
            <div
              key={tab}
              className={`px-6 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium cursor-pointer ${
                tab === "Reports & Analytics"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-800"
              }`}
            >
              {tab}
            </div>
          )
        )}
      </div>

      {/* Chart Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🔶 Top Row */}
        <div className="border border-blue-300 bg-white/70 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-black mb-3">Donations Over Time</h2>
          <div className="h-48 flex items-center justify-center text-gray-500">
            [Line Chart Placeholder]
          </div>
        </div>

        <div className="border border-blue-300 bg-white/70 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-black mb-3">Donation Progress</h2>
          <div className="space-y-3">
            {[
              { label: "Pending Approvals", width: "w-[70%]" },
              { label: "Approved Donations", width: "w-[60%]" },
              { label: "Donations Shipped", width: "w-[30%]" },
            ].map((bar) => (
              <div key={bar.label}>
                <p className="text-sm font-medium">{bar.label}</p>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className={`${bar.width} bg-orange-400 h-3 rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-blue-300 bg-white/70 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-black mb-3">Activity vs Users</h2>
          <div className="h-48 flex items-center justify-center text-gray-500">
            [Dual-Line Chart Placeholder]
          </div>
        </div>

        {/* 🔷 Bottom Row */}
        <div className="border border-blue-300 bg-white/70 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-black mb-3">
            Active Users & Pending Approvals
          </h2>
          <div className="h-48 flex items-center justify-center text-gray-500">
            [Grouped Bar Chart Placeholder]
          </div>
        </div>

        <div className="border border-blue-300 bg-white/70 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-black mb-3">Donations vs Users</h2>
          <div className="h-48 flex items-center justify-center text-gray-500">
            [Pie Chart Placeholder]
          </div>
        </div>

        <div className="border border-blue-300 bg-white/70 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-black mb-3">Donations Profit/Loss</h2>
          <div className="h-48 flex items-center justify-center text-gray-500">
            [Profit/Loss Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
