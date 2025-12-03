// testData.js
export const dashboardSummary = {
  totalDonations: 412,
  totalUsers: 28,
  totalRequests: 17,
  totalActions: 50,
};

export const recentActivity = [
  { user: "User 9", role: "Donor", time: "14:29", activity: "Submitted donation" },
  { user: "User 17", role: "Staff", time: "16:30", activity: "Rejected donation" },
  { user: "User 12", role: "Donor", time: "17:41", activity: "Updated donation" },
  { user: "User 1", role: "Admin", time: "18:33", activity: "Approved User" },
  { user: "User 6", role: "Staff", time: "21:08", activity: "Approved donation" },
];

// Donations over months for line chart
export const donationsByMonth = [
  { month: "Jan", donations: 50 },
  { month: "Feb", donations: 75 },
  { month: "Mar", donations: 60 },
  { month: "Apr", donations: 90 },
  { month: "May", donations: 120 },
  { month: "Jun", donations: 100 },
];

// Pending Bar Chart
export const donationStatus = [
  { label: "Pending Approvals", value: 70 },
  { label: "Approved Donations", value: 60 },
  { label: "Donations Shipped", value: 30 },
];

// Activity vs Users Chart
export const activityVsUsers = [
  { month: "Jan", activity: 40, users: 20 },
  { month: "Feb", activity: 50, users: 25 },
  { month: "Mar", activity: 35, users: 28 },
  { month: "Apr", activity: 60, users: 30 },
  { month: "May", activity: 80, users: 32 },
  { month: "Jun", activity: 90, users: 34 },
];

// Donations Pie Chart
export const donationsPie = [
  { name: "Donations", value: 300 },
  { name: "Users", value: 120 },
];

// Grouped Bar Chart
export const groupedBar = [
  { month: "Jan", activeUsers: 20, pendingApprovals: 15 },
  { month: "Feb", activeUsers: 25, pendingApprovals: 18 },
  { month: "Mar", activeUsers: 28, pendingApprovals: 12 },
  { month: "Apr", activeUsers: 30, pendingApprovals: 20 },
  { month: "May", activeUsers: 32, pendingApprovals: 10 },
  { month: "Jun", activeUsers: 34, pendingApprovals: 14 },
];

// Monthly Performance Chart (replaces Profit/Loss)
export const monthlyPerformance = [
  { month: "Jan", income: 1000, expenditure: 800 },
  { month: "Feb", income: 1200, expenditure: 900 },
  { month: "Mar", income: 800, expenditure: 700 },
  { month: "Apr", income: 1500, expenditure: 1000 },
  { month: "May", income: 1700, expenditure: 1300 },
  { month: "Jun", income: 1600, expenditure: 1100 },
];
