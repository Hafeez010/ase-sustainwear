import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logs = await prisma.systemlog.findMany({
      orderBy: { Timestamp: "desc" },
      include: { user: true },
    });

    const formatted = logs.map((log) => ({
      time: log.Timestamp ? new Date(log.Timestamp).toLocaleString() : "—",
      user: log.user ? `${log.user.FirstName} ${log.user.LastName}` : "System",
      role: log.user?.Role || "N/A",
      action: log.Action,
      status: log.Status,
    }));

    return NextResponse.json(formatted);

  } catch (err) {
    console.error("System log fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}
