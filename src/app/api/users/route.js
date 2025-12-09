import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { FirstName: "asc" },
      select: {
        UserID: true,
        FirstName: true,
        LastName: true,
        Role: true,
      },
    });

    return NextResponse.json({ users });
  } catch (err) {
    console.error("GET /api/users error:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
