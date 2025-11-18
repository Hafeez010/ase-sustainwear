"use client";

import AdminNavBar from "@/app/components/AdminNavBar";

export default function UserManagement() {
  const users = [
    { name: "User 1", role: "Staff" },
    { name: "User 2", role: "Donor" },
    { name: "User 3", role: "Admin" },
    { name: "User 4", role: "Staff" },
    { name: "User 5", role: "Donor" },
    { name: "User 6", role: "Staff" },
  ];

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold mb-4 text-black text-center">
        User Management
      </h1>

      {/* Navigation Tabs */}
      <AdminNavBar />

      {/* Table + Summary Section */}
      <div className="flex flex-col md:flex-row justify-center gap-10 w-full max-w-5xl">
        {/* User Table */}
        <div className="flex-1 overflow-x-auto border rounded-lg shadow bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-black text-center">
                <th className="px-4 py-3 border-b">User</th>
                <th className="px-4 py-3 border-b">Role</th>
                <th className="px-4 py-3 border-b">✓</th>
                <th className="px-4 py-3 border-b">✕</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr
                  key={idx}
                  className={`text-center ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2 border-b text-left">{u.name}</td>
                  <td className="px-4 py-2 border-b">{u.role}</td>
                  <td className="px-4 py-2 border-b">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                      ✓
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Box */}
        <div className="w-full md:w-1/3 bg-white border rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-3 text-center border-b pb-2">
            Summary
          </h2>
          <ul className="space-y-2 text-left">
            <li className="flex justify-between">
              <span className="font-bold">Total Users:</span> <span>28</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold">Total Requests:</span> <span>17</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold">Total Actions:</span> <span>50</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
