"use client";

import { useState, useEffect } from "react";
import SidebarStaff from "../../components/SidebarStaff";

export default function DistributionRecordsPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // 1. MOCK DATA
    const mockData = [
      {
        id: "R001",
        recipient: "Shelter Hope",
        category: "Shirts",
        quantity: 25,
        date: "21/10/2025",
      },
      {
        id: "R002",
        recipient: "Penang Aid",
        category: "Pants",
        quantity: 18,
        date: "19/10/2025",
      },
      {
        id: "R003",
        recipient: "Community Care",
        category: "Jackets",
        quantity: 12,
        date: "17/10/2025",
      },
    ];

    // 2. LOAD SAVED DISTRIBUTIONS FROM LOCAL STORAGE
    const savedRecords = JSON.parse(localStorage.getItem("distributionRecords") || "[]");

    // 3. MERGE BOTH LISTS
    setRecords([...mockData, ...savedRecords]);
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-100">
      <SidebarStaff active="distribution" />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Distribution Records</h1>

        {/* Search + Add */}
        <div className="mb-6 flex justify-between">
          <input
            type="text"
            placeholder="Search records..."
            className="px-4 py-2 w-64 border border-black rounded-md"
          />

          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            + Add Record
          </button>
        </div>

        {/* Record Table */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
          <table className="w-full border border-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-black px-4 py-2">Record ID</th>
                <th className="border border-black px-4 py-2">Recipient</th>
                <th className="border border-black px-4 py-2">Category</th>
                <th className="border border-black px-4 py-2">Quantity</th>
                <th className="border border-black px-4 py-2">Date</th>
                <th className="border border-black px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td className="border border-black px-4 py-2">{rec.id}</td>
                  <td className="border border-black px-4 py-2">{rec.recipient}</td>
                  <td className="border border-black px-4 py-2">{rec.category}</td>
                  <td className="border border-black px-4 py-2">{rec.quantity}</td>
                  <td className="border border-black px-4 py-2">{rec.date}</td>
                  <td className="border border-black px-4 py-2">
                    <button className="px-3 py-1 border border-black rounded-md hover:bg-gray-200">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No distribution records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
