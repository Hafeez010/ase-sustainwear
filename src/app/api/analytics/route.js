import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper to convert date to YYYY-MM
function monthKey(date) {
  return new Date(date).toISOString().slice(0, 7);
}

export async function GET() {
  try {
    // ---------------------------
    // 1. Donations by month
    // ---------------------------
    const donations = await prisma.donation.findMany();
    const donationsByMonth = {};

    donations.forEach((d) => {
      const month = monthKey(d.SubmittedAt);
      donationsByMonth[month] = (donationsByMonth[month] || 0) + 1;
    });

    // ---------------------------
    // 2. Donation status counts
    // ---------------------------
    const donationStatus = {
      Pending: donations.filter((d) => d.Status === "Pending").length,
      Approved: donations.filter((d) => d.Status === "Approved").length,
      Rejected: donations.filter((d) => d.Status === "Rejected").length,
    };

    // ---------------------------
    // 3. System logs vs users
    // ---------------------------
    const logs = await prisma.systemLog.findMany();
    const users = await prisma.user.findMany();

    const activityVsUsers = {
      totalLogs: logs.length,
      totalUsers: users.length,
    };

    // ---------------------------
    // 4. Donations vs Distributions (month)
    // ---------------------------
    const distributions = await prisma.distribution.findMany();
    const groupedBar = {};

    donations.forEach((d) => {
      const month = monthKey(d.SubmittedAt);
      if (!groupedBar[month]) groupedBar[month] = { donated: 0, distributed: 0 };
      groupedBar[month].donated += d.Quantity;
    });

    distributions.forEach((dist) => {
      const month = monthKey(dist.Date);
      if (!groupedBar[month]) groupedBar[month] = { donated: 0, distributed: 0 };
      groupedBar[month].distributed += dist.Quantity;
    });

    // ---------------------------
    // 5. Donations pie chart (by type)
    // ---------------------------
    const donationsPie = {};
    donations.forEach((d) => {
      donationsPie[d.Type] = (donationsPie[d.Type] || 0) + 1;
    });

    // ---------------------------
    // 6. Monthly performance (Inventory added vs distributed)
    // ---------------------------
    const monthlyPerformance = {};

    // Inventory added (from donations)
   const inventory = await prisma.inventory.findMany({
  include: {
    donation: true,  // ← REQUIRED
  },
});

    inventory.forEach((item) => {
      const month = monthKey(item.donation.SubmittedAt);
      if (!monthlyPerformance[month])
        monthlyPerformance[month] = { added: 0, distributed: 0 };

      monthlyPerformance[month].added += item.Quantity;
    });

    // Inventory distributed
    distributions.forEach((dist) => {
      const month = monthKey(dist.Date);
      if (!monthlyPerformance[month])
        monthlyPerformance[month] = { added: 0, distributed: 0 };

      monthlyPerformance[month].distributed += dist.Quantity;
    });

    return NextResponse.json({
      donationsByMonth,
      donationStatus,
      activityVsUsers,
      groupedBar,
      donationsPie,
      monthlyPerformance,
    });

  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
