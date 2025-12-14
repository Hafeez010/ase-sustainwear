import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logs = await prisma.systemLog.findMany({
      orderBy: { Timestamp: "desc" },
      include: {
        user: {
          select: { FirstName: true, LastName: true, Role: true },
        },
      },
    });

    const formatted = logs.map((log) => ({
      id: log.LogID,
      user: log.user ? `${log.user.FirstName} ${log.user.LastName}` : "System",
      role: log.user ? log.user.Role : "-",
      action: log.Action,
      status: log.Status,
      timestamp: new Date(log.Timestamp).toLocaleString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch system logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch system logs" },
      { status: 500 }
    );
  }
};
