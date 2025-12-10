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

        // ----------------------
        // FIX: Convert object → array
        // ----------------------

        const donationsByMonth = Object.entries(data.donationsByMonth).map(
          ([month, donations]) => ({ month, donations })
        );

        const donationStatus = [
          { label: "Pending", value: data.donationStatus.Pending },
          { label: "Approved", value: data.donationStatus.Approved },
          { label: "Rejected", value: data.donationStatus.Rejected },
        ];

        const activityVsUsers = [
          {
            month: "Total",
            activity: data.activityVsUsers.totalLogs,
            users: data.activityVsUsers.totalUsers,
          },
        ];

        const groupedBar = Object.entries(data.groupedBar).map(
          ([month, obj]) => ({
            month,
            activeUsers: obj.donated,
            pendingApprovals: obj.distributed,
          })
        );

        const donationsPie = Object.entries(data.donationsPie).map(
          ([name, value]) => ({ name, value })
        );

        const monthlyPerformance = Object.entries(data.monthlyPerformance).map(
          ([month, obj]) => ({
            month,
            income: obj.added,
            expenditure: obj.distributed,
          })
        );

        setAnalytics({
          donationsByMonth,
          donationStatus,
          activityVsUsers,
          groupedBar,
          donationsPie,
          monthlyPerformance,
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

      {/* HEADER ROW */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          Reports & Analytics
        </h2>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium">
          Logout
        </button>
      </div>

      {/* NAV BAR */}
      <AdminNavBar activeTab="Reports & Analytics" />

      {/* LOADING */}
      {loading && (
        <p className="text-center mt-10 text-gray-600">Loading analytics...</p>
      )}

      {/* DATA LOADED */}
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
