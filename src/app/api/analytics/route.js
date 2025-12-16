import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


function monthKey(date) {
  return new Date(date).toISOString().slice(0, 7);
}

export async function GET() {
  try {

    const donations = await prisma.donation.findMany();
    const donationsMap = {};

    donations.forEach((d) => {
      const month = monthKey(d.SubmittedAt);
      donationsMap[month] = (donationsMap[month] || 0) + 1;
    });

    const donationsByMonth = Object.entries(donationsMap).map(([month, count]) => ({
      month,
      donations: count,
    }));

    const donationStatus = [
      { label: "Pending", value: donations.filter(d => d.Status === "Pending").length },
      { label: "Approved", value: donations.filter(d => d.Status === "Approved").length },
      { label: "Rejected", value: donations.filter(d => d.Status === "Rejected").length },
    ];

    const logs = await prisma.systemLog.findMany();
    const users = await prisma.user.findMany();

    const activityVsUsers = [
      {
        month: "Overview",
        activity: logs.length,
        users: users.length,
      }
    ];

    const groupedBar = [
      {
        month: "Overview",
        activeUsers: users.filter(u => u.Role !== "Pending").length,
        pendingApprovals: users.filter(u => u.Role === "Pending").length,
      }
    ];

    const typeCounts = {};
    donations.forEach(d => {
      typeCounts[d.Type] = (typeCounts[d.Type] || 0) + 1;
    });

    const donationsPie = Object.entries(typeCounts).map(([name, value]) => ({
      name,
      value,
    }));

    const inventory = await prisma.inventory.findMany({ include: { donation: true } });
    const distributions = await prisma.distribution.findMany();

    const monthly = {};

    inventory.forEach(item => {
      const month = monthKey(item.donation.SubmittedAt);
      if (!monthly[month]) monthly[month] = { month, added: 0, distributed: 0 };
      monthly[month].added += item.Quantity;
    });

    distributions.forEach(d => {
      const month = monthKey(d.Date);
      if (!monthly[month]) monthly[month] = { month, added: 0, distributed: 0 };
      monthly[month].distributed += d.Quantity;
    });

    const monthlyPerformance = Object.values(monthly);


    const recent = await prisma.systemLog.findMany({
      orderBy: { Timestamp: "desc" },
      take: 20,
      include: { user: true }
    });

    const recentLogs = recent.map(log => ({
      time: log.Timestamp.toISOString().replace("T", " ").slice(0, 16),
      user: log.user ? `${log.user.FirstName} ${log.user.LastName}` : "System",
      role: log.user?.Role || "-",
      action: log.Action,
      status: log.Status,
    }));


    return NextResponse.json({
      donationsByMonth,
      donationStatus,
      activityVsUsers,
      groupedBar,
      donationsPie,
      monthlyPerformance,
      recentLogs,
      totalDonations: donations.length,
      totalUsers: users.length,
    });

  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
