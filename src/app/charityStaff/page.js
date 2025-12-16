"use client";

import SidebarStaff from "../components/SidebarStaff";
import { useEffect, useState } from "react";

export default function CharityStaffDashboard() {
  const [recentDonations, setRecentDonations] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [distributed, setDistributed] = useState([]);


  useEffect(() => {
  async function loadDashboard() {
    try {
      const donationsRes = await fetch("/api/donations");
      const inventoryRes = await fetch("/api/inventory");
      const distributionRes = await fetch("/api/distribution");

      setRecentDonations(await donationsRes.json());
      setInventory(await inventoryRes.json());
      setDistributed(await distributionRes.json());
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  }

  loadDashboard();
}, []);

const pendingCount = recentDonations.filter(d => d.Status === "Pending").length;

const totalInventoryItems = inventory.reduce(
  (sum, item) => sum + item.Quantity,
  0
);

const totalDistributedItems = distributed.reduce(
  (sum, d) => sum + d.quantity,
  0
);

const approvedItems = totalInventoryItems + totalDistributedItems;

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

        
     <div className="grid grid-cols-3 gap-6 mb-10">
  <div className="p-6 bg-white border-2 border-black rounded-lg shadow">
    <h2 className="font-semibold text-lg mb-2">Pending Donations</h2>
    <p className="text-3xl font-bold">{pendingCount}</p>
  </div>

  <div className="p-6 bg-white border-2 border-black rounded-lg shadow">
    <h2 className="font-semibold text-lg mb-2">Total Inventory Items</h2>
    <p className="text-3xl font-bold">{totalInventoryItems}</p>
  </div>

  <div className="p-6 bg-white border-2 border-black rounded-lg shadow">
    <h2 className="font-semibold text-lg mb-2">Approved Donations</h2>
    <p className="text-3xl font-bold">{approvedItems}</p>
  </div>
</div>



        
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
    <tr key={d.DonationID}>
      <td className="border border-black px-4 py-2">{d.DonationID}</td>
      <td className="border border-black px-4 py-2">{d.Name}</td>
      <td className="border border-black px-4 py-2">
        {new Date(d.SubmittedAt).toLocaleDateString()}
      </td>
      <td className="border border-black px-4 py-2">{d.Quantity}</td>
      <td className="border border-black px-4 py-2">{d.Status}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        
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
    <tr key={item.InventoryID}>
      <td className="border border-black px-4 py-2">{item.InventoryID}</td>
      <td className="border border-black px-4 py-2">{item.Category}</td>
      <td className="border border-black px-4 py-2">{item.Quantity}</td>
      <td className="border border-black px-4 py-2">{item.Condition}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </section>
    </main>
  );
}

