"use client";

import { useState, useEffect } from "react";
import AdminNavBar from "@/app/components/AdminNavBar";

import PendingBarChart from "@/app/components/adminCharts/PendingBarChart";
import ActivityVsUsersChart from "@/app/components/adminCharts/ActivityVsUsersChart";
import GroupedBarChart from "@/app/components/adminCharts/GroupedBarChart";
import DonationsPieChart from "@/app/components/adminCharts/DonationsPieChart";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();

        if (!res.ok) {
          console.error("Analytics error:", data.error);
          return;
        }

        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <main className="text-center py-20 text-gray-600">
        Loading dashboard…
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-6 bg-gray-50 text-gray-800">

      {/* HEADER */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          Admin Dashboard
        </h2>
        <a
          href="http://localhost:3000/login"
          className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium"
        >
          Logout
        </a>
      </div>

      <AdminNavBar activeTab="Dashboard" />

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2 text-lg">Total Donations</h2>
          <p className="text-2xl font-semibold text-blue-600">
            {analytics?.totalDonations || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2 text-lg">Total Users</h2>
          <p className="text-2xl font-semibold text-blue-600">
            {analytics?.totalUsers || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2 text-lg">Pending Requests</h2>
          <p className="text-2xl font-semibold text-blue-600">
            {analytics
              ? analytics.donationStatus.find(s => s.label === "Pending")?.value || 0
              : 0}
          </p>
        </div>

      </div>


      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-6xl">
        <DonationsPieChart data={analytics.donationsPie || []} />
        <ActivityVsUsersChart data={analytics.activityVsUsers || []} />
        <PendingBarChart data={analytics.donationStatus || []} />
        <GroupedBarChart data={analytics.groupedBar || []} />

      </div>

      {/* RECENT SYSTEM LOGS */}
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-6xl mt-10">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>

        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">User</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Time</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {analytics.recentLogs?.slice(0, 10).map((log, i) => (
              <tr key={i} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{log.user}</td>
                <td className="px-4 py-2 border-b">{log.role || "-"}</td>
                <td className="px-4 py-2 border-b">{log.time}</td>
                <td className="px-4 py-2 border-b">{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </main>
  );
}
