"use client";

import AdminNavBar from "@/app/components/AdminNavBar";
import DonationsLineChart from "@/app/components/adminCharts/DonationsLineChart";
import PendingBarChart from "@/app/components/adminCharts/PendingBarChart";
import ActivityVsUsersChart from "@/app/components/adminCharts/ActivityVsUsersChart";
import GroupedBarChart from "@/app/components/adminCharts/GroupedBarChart";
import DonationsPieChart from "@/app/components/adminCharts/DonationsPieChart";
import RevenueVsExpensesChart from "@/app/components/adminCharts/DonationsVsExpenditureBarChart";

export default function ReportsAnalytics() {
  // Test data for charts
  const donationsData = [
    { month: "Jan", amount: 500 },
    { month: "Feb", amount: 700 },
    { month: "Mar", amount: 450 },
    { month: "Apr", amount: 800 },
    { month: "May", amount: 650 },
  ];

  const pendingData = [
    { label: "Pending Approvals", value: 70, color: "#F59E0B" },
    { label: "Approved Donations", value: 50, color: "#10B981" },
    { label: "Donations Shipped", value: 30, color: "#3B82F6" },
  ];

  const activityVsUsersData = [
    { month: "Jan", activity: 50, users: 20 },
    { month: "Feb", activity: 80, users: 25 },
    { month: "Mar", activity: 60, users: 30 },
    { month: "Apr", activity: 100, users: 35 },
    { month: "May", activity: 90, users: 40 },
  ];

  const groupedBarData = [
    { month: "Jan", activeUsers: 20, pendingApprovals: 5 },
    { month: "Feb", activeUsers: 25, pendingApprovals: 10 },
    { month: "Mar", activeUsers: 30, pendingApprovals: 8 },
    { month: "Apr", activeUsers: 35, pendingApprovals: 12 },
    { month: "May", activeUsers: 40, pendingApprovals: 15 },
  ];

  const donationsPieData = [
    { name: "Donations", value: 3000 },
    { name: "Users", value: 50 },
  ];

  const revenueVsExpensesData = [
    { month: "Jan", revenue: 5000, expenses: 3000 },
    { month: "Feb", revenue: 7000, expenses: 4000 },
    { month: "Mar", revenue: 4500, expenses: 2500 },
    { month: "Apr", revenue: 8000, expenses: 5000 },
    { month: "May", revenue: 6500, expenses: 3500 },
  ];

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
        <DonationsLineChart data={donationsData} />
        <PendingBarChart data={pendingData} />
        <ActivityVsUsersChart data={activityVsUsersData} />

        {/* Bottom Row */}
        <GroupedBarChart data={groupedBarData} />
        <DonationsPieChart data={donationsPieData} />
        <RevenueVsExpensesChart data={revenueVsExpensesData} />
      </div>
    </main>
  );
}
