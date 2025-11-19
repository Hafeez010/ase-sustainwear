"use client";

import AdminNavBar from "@/app/components/AdminNavBar";
import DonationsLineChart from "@/app/components/adminCharts/DonationsLineChart";
import PendingBarChart from "@/app/components/adminCharts/PendingBarChart";
import ActivityVsUsersChart from "@/app/components/adminCharts/ActivityVsUsersChart";
import GroupedBarChart from "@/app/components/adminCharts/GroupedBarChart";
import DonationsPieChart from "@/app/components/adminCharts/DonationsPieChart";
import ProfitLossBarChart from "@/app/components/adminCharts/ProfitLossBarChart";

export default function ReportsAnalytics() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold mb-4 text-black text-center">
        Reports & Analytics
      </h1>

      {/* Navigation Tabs */}
      <AdminNavBar activeTab="Reports" />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {/* Top Row */}
        <DonationsLineChart />
        <PendingBarChart />
        <ActivityVsUsersChart />

        {/* Bottom Row */}
        <GroupedBarChart />
        <DonationsPieChart />
        <ProfitLossBarChart />
      </div>
    </main>
  );
}
