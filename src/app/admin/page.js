"use client";

import AdminNavBar from "@/app/components/AdminNavBar";
import PendingBarChart from "@/app/components/adminCharts/PendingBarChart";
import ActivityVsUsersChart from "@/app/components/adminCharts/ActivityVsUsersChart";
import GroupedBarChart from "@/app/components/adminCharts/GroupedBarChart";
import DonationsPieChart from "@/app/components/adminCharts/DonationsPieChart";
import {
  dashboardSummary,
  recentActivity,
  donationStatus,
  activityVsUsers,
  groupedBar,
  donationsPie
} from "@/app/admin/data/testData";

export default function AdminDashboard() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-6 bg-gray-50 text-gray-800">

      {/* HEADER ROW */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        {/* Company Name */}
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>

        {/* Page Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          Admin Dashboard
        </h2>

        {/* Logout Button */}
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium">
          Logout
        </button>
      </div>

      {/* NAV BAR */}
      <AdminNavBar activeTab="Dashboard" />

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2 text-lg">Total Donations</h2>
          <p className="text-2xl font-semibold text-blue-600">{dashboardSummary.totalDonations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2 text-lg">Total Users</h2>
          <p className="text-2xl font-semibold text-blue-600">{dashboardSummary.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2 text-lg">Total Requests</h2>
          <p className="text-2xl font-semibold text-blue-600">{dashboardSummary.totalRequests}</p>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-6xl">
        <DonationsPieChart data={donationsPie} />
        <ActivityVsUsersChart data={activityVsUsers} />
        <PendingBarChart data={donationStatus} />
        <GroupedBarChart data={groupedBar} />
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-6xl mt-10">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        <table className="w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">User</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Time</th>
              <th className="px-4 py-2 border-b">Activity</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, i) => (
              <tr key={i} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{row.user}</td>
                <td className="px-4 py-2 border-b">{row.role}</td>
                <td className="px-4 py-2 border-b">{row.time}</td>
                <td className="px-4 py-2 border-b">{row.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
}
