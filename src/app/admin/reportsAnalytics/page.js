"use client";

import AdminNavBar from "@/app/components/AdminNavBar";
import DonationsLineChart from "@/app/components/adminCharts/DonationsLineChart";
import PendingBarChart from "@/app/components/adminCharts/PendingBarChart";
import ActivityVsUsersChart from "@/app/components/adminCharts/ActivityVsUsersChart";
import GroupedBarChart from "@/app/components/adminCharts/GroupedBarChart";
import DonationsPieChart from "@/app/components/adminCharts/DonationsPieChart";
import DonationsVsExpenditureBarChart from "@/app/components/adminCharts/DonationsVsExpenditureBarChart";
import { donationsByMonth, donationStatus, activityVsUsers, groupedBar, donationsPie, monthlyPerformance } from "@/app/admin/data/testData";

export default function ReportsAnalytics() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-extrabold mb-4 text-black text-center">Reports & Analytics</h1>
      <AdminNavBar activeTab="Reports" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        <DonationsLineChart data={donationsByMonth} />
        <PendingBarChart data={donationStatus} />
        <ActivityVsUsersChart data={activityVsUsers} />
        <GroupedBarChart data={groupedBar} />
        <DonationsPieChart data={donationsPie} />
        <DonationsVsExpenditureBarChart data={monthlyPerformance} />
      </div>
    </main>
  );
}
