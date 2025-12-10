"use client";

import { useState, useEffect } from "react";
import AdminNavBar from "@/app/components/AdminNavBar";

import DonationsLineChart from "@/app/components/adminCharts/DonationsLineChart";
import PendingBarChart from "@/app/components/adminCharts/PendingBarChart";
import ActivityVsUsersChart from "@/app/components/adminCharts/ActivityVsUsersChart";
import GroupedBarChart from "@/app/components/adminCharts/GroupedBarChart";
import DonationsPieChart from "@/app/components/adminCharts/DonationsPieChart";
import DonationsVsExpenditureBarChart from "@/app/components/adminCharts/DonationsVsExpenditureBarChart";

export default function ReportsAnalytics() {
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

        // ---- NO MORE CONVERSIONS NEEDED ----
        setAnalytics({
          donationsByMonth: data.donationsByMonth,
          donationStatus: data.donationStatus,
          activityVsUsers: data.activityVsUsers,
          groupedBar: data.groupedBar,
          donationsPie: data.donationsPie,
          monthlyPerformance: data.monthlyPerformance,
        });

      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-6 bg-gray-50 text-gray-800">

      {/* HEADER */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          Reports & Analytics
        </h2>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium">
          Logout
        </button>
      </div>

      <AdminNavBar activeTab="Reports & Analytics" />

      {loading && (
        <p className="text-center mt-10 text-gray-600">Loading analytics...</p>
      )}

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">

          <DonationsLineChart data={analytics.donationsByMonth} />
          <PendingBarChart data={analytics.donationStatus} />
          <ActivityVsUsersChart data={analytics.activityVsUsers} />
          <GroupedBarChart data={analytics.groupedBar} />
          <DonationsPieChart data={analytics.donationsPie} />
          <DonationsVsExpenditureBarChart data={analytics.monthlyPerformance} />

        </div>
      )}

    </main>
  );
}
