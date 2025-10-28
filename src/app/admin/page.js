"use client";

import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#CCF3CC] p-8">
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center text-black mb-8">
        Admin Dashboard
      </h1>

      {/* NAVIGATION TABS */}
      <div className="flex justify-center space-x-8 mb-10">
        {["Dashboard", "User Management", "Reports & Analytics", "System Logs"].map((tab, index) => (
          <div
            key={index}
            className={`px-6 py-2 border border-gray-300 bg-white text-center cursor-pointer font-medium ${
              tab === "Dashboard"
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-800 hover:text-blue-500"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* 1️⃣ Total Donations */}
        <div className="border border-blue-400 p-4 rounded-lg">
          <h2 className="font-bold mb-2 text-lg">Total Donations</h2>
          <p className="text-black">Total Donations: 412</p>
          <p className="text-black">Total xxx: 109</p>
          <p className="text-black">Total xxx: 248</p>
        </div>

        {/* 2️⃣ Total Users / Requests */}
        <div className="border border-blue-400 p-4 rounded-lg">
          <h2 className="font-bold mb-2 text-lg">Total Users / Total Requests</h2>
          <p className="text-black">Total Users: 28</p>
          <p className="text-black">Total Requests: 17</p>
          <p className="text-black">Total xxx: 50</p>
        </div>

        {/* 3️⃣ Horizontal Bars */}
        <div className="border border-blue-400 p-4 rounded-lg">
          <h2 className="font-bold mb-2 text-lg">Donation Progress</h2>
          {[
            { label: "Pending Approvals", width: "70%" },
            { label: "Approved Donations", width: "60%" },
            { label: "Donations Shipped", width: "30%" },
          ].map((bar, i) => (
            <div key={i} className="mb-3">
              <div className="text-black mb-1">{bar.label}</div>
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div
                  className="bg-orange-400 h-4 rounded-full"
                  style={{ width: bar.width }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* 4️⃣ Pie Chart */}
        <div className="border border-blue-400 p-4 rounded-lg flex flex-col items-center">
          <h2 className="font-bold mb-2 text-lg">Pie Chart (Example)</h2>
          <div className="relative w-40 h-40 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mb-4"></div>
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-yellow-400 mr-2"></div> Donations
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 mr-2"></div> Users
            </div>
          </div>
        </div>

        {/* 5️⃣ Line Chart */}
        <div className="border border-blue-400 p-4 rounded-lg">
          <h2 className="font-bold mb-2 text-lg">Line Chart (Example)</h2>
          <div className="bg-white h-48 flex items-center justify-center text-gray-400 italic">
            Placeholder for Line Chart
          </div>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <span className="text-orange-500">● Activity</span>
            <span className="text-blue-500">● Users</span>
          </div>
        </div>

        {/* 6️⃣ Bar Chart */}
        <div className="border border-blue-400 p-4 rounded-lg">
          <h2 className="font-bold mb-2 text-lg">Bar Chart (Example)</h2>
          <div className="bg-white h-48 flex items-center justify-center text-gray-400 italic">
            Placeholder for Bar Chart
          </div>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <span className="text-orange-400">■ Active Users</span>
            <span className="text-cyan-400">■ Pending Approvals</span>
          </div>
        </div>
      </div>

      {/* 📋 Recent Activity Table */}
      <div className="border border-blue-400 bg-white rounded-lg p-4">
        <h2 className="font-bold mb-4 text-lg">Recent Activity</h2>
        <table className="w-full border border-blue-300 text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-blue-300 px-4 py-2 font-semibold">User</th>
              <th className="border border-blue-300 px-4 py-2 font-semibold">Role</th>
              <th className="border border-blue-300 px-4 py-2 font-semibold">Time</th>
              <th className="border border-blue-300 px-4 py-2 font-semibold">Activity</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["User 9", "Donor", "14:29", "Submitted donation"],
              ["User 17", "Staff", "16:30", "Rejected donation"],
              ["User 12", "Donor", "17:41", "Updated donation"],
              ["User 1", "Admin", "18:33", "Approved User"],
              ["User 6", "Staff", "21:08", "Approved donation"],
            ].map((row, i) => (
              <tr key={i} className="text-center hover:bg-blue-50">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="border border-blue-300 px-4 py-2 text-black"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
