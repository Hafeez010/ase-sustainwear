"use client";

import SidebarStaff from "../components/SidebarStaff";
import { useEffect, useState } from "react";

export default function CharityStaffDashboard() {
  // MOCK DATA
  const [recentDonations, setRecentDonations] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setRecentDonations([
      { id: "D001", donor: "Sarah Tan", date: "28/10/2025", items: 8, status: "Pending" },
      { id: "D002", donor: "John Lee", date: "26/10/2025", items: 4, status: "Approved" },
      { id: "D003", donor: "Emma Wong", date: "25/10/2025", items: 6, status: "Pending" },
    ]);

    setInventory([
      { id: "C101", category: "Shirts", quantity: 124, condition: "Good" },
      { id: "C205", category: "Pants", quantity: 87, condition: "Good" },
      { id: "C330", category: "Jackets", quantity: 42, condition: "Mixed" },
    ]);
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-100">
      <SidebarStaff active="dashboard" />

      <section className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>

          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-black rounded-md"
          />
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white border-2 border-black rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Pending Donations</h2>
            <p className="text-3xl font-bold">2</p>
          </div>

          <div className="p-6 bg-white border-2 border-black rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Total Inventory Items</h2>
            <p className="text-3xl font-bold">253</p>
          </div>

          <div className="p-6 bg-white border-2 border-black rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Approved Donations</h2>
            <p className="text-3xl font-bold">1</p>
          </div>
        </div>

        {/* RECENT DONATIONS */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>

          <table className="w-full border border-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-black px-4 py-2">ID</th>
                <th className="border border-black px-4 py-2">Donor</th>
                <th className="border border-black px-4 py-2">Date</th>
                <th className="border border-black px-4 py-2">Items</th>
                <th className="border border-black px-4 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentDonations.map((d) => (
                <tr key={d.id}>
                  <td className="border border-black px-4 py-2">{d.id}</td>
                  <td className="border border-black px-4 py-2">{d.donor}</td>
                  <td className="border border-black px-4 py-2">{d.date}</td>
                  <td className="border border-black px-4 py-2">{d.items}</td>
                  <td className="border border-black px-4 py-2">{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* INVENTORY OVERVIEW */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>

          <table className="w-full border border-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-black px-4 py-2">ID</th>
                <th className="border border-black px-4 py-2">Category</th>
                <th className="border border-black px-4 py-2">Quantity</th>
                <th className="border border-black px-4 py-2">Condition</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="border border-black px-4 py-2">{item.id}</td>
                  <td className="border border-black px-4 py-2">{item.category}</td>
                  <td className="border border-black px-4 py-2">{item.quantity}</td>
                  <td className="border border-black px-4 py-2">{item.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

