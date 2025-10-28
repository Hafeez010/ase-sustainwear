"use client";

import React from "react";
import { Check, X } from "lucide-react"; // lightweight icons

export default function UserManagement() {
  return (
    <div className="min-h-screen bg-[#CCF3CC] p-8">
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center text-black mb-8">
        User Management
      </h1>

      {/* NAVIGATION TABS */}
      <div className="flex justify-center space-x-8 mb-10">
        {["Dashboard", "User Management", "Reports & Analytics", "System Logs"].map(
          (tab, index) => (
            <div
              key={index}
              className={`px-6 py-2 border border-gray-300 bg-white text-center cursor-pointer font-medium ${
                tab === "User Management"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-800 hover:text-blue-500"
              }`}
            >
              {tab}
            </div>
          )
        )}
      </div>

      {/* MAIN CONTENT LAYOUT */}
      <div className="grid grid-cols-3 gap-8">
        {/* 📋 USER TABLE (2/3 width) */}
        <div className="col-span-2 border border-green-300 bg-white rounded-lg p-4">
          <h2 className="font-bold mb-4 text-lg text-black">User List</h2>
          <table className="w-full border-collapse border border-green-200">
            <thead>
              <tr className="bg-gray-200 text-black font-semibold text-center">
                <th className="border border-green-200 px-4 py-2 text-left">User</th>
                <th className="border border-green-200 px-4 py-2">Role</th>
                <th className="border border-green-200 px-4 py-2">✓</th>
                <th className="border border-green-200 px-4 py-2">✕</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["User 1", "Staff"],
                ["User 2", "Donor"],
                ["User 3", "Admin"],
                ["User 4", "Staff"],
                ["User 5", "Donor"],
                ["User 6", "Donor"],
                ["User 7", "Staff"],
                ["User 8", "Admin"],
                ["User 9", "Donor"],
                ["User 10", "Staff"],
                ["User 11", "Donor"],
              ].map((user, i) => (
                <tr
                  key={i}
                  className={`text-center ${
                    i % 2 === 0 ? "bg-white" : "bg-green-50"
                  } hover:bg-green-100`}
                >
                  <td className="border border-green-200 px-4 py-2 text-left text-black">
                    {user[0]}
                  </td>
                  <td className="border border-green-200 px-4 py-2 text-black">
                    {user[1]}
                  </td>
                  <td className="border border-green-200 px-4 py-2">
                    <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition">
                      <Check size={18} color="white" />
                    </button>
                  </td>
                  <td className="border border-green-200 px-4 py-2">
                    <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition">
                      <X size={18} color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📊 SIDE SUMMARY BOX */}
        <div className="border border-blue-400 p-4 rounded-lg h-fit">
          <h2 className="font-bold mb-2 text-lg text-black">Summary Statistics</h2>
          <p className="text-black mb-1">Total Users: <span className="font-semibold">28</span></p>
          <p className="text-black mb-1">Total Requests: <span className="font-semibold">17</span></p>
          <p className="text-black">Total xxx: <span className="font-semibold">50</span></p>
        </div>
      </div>
    </div>
  );
}
