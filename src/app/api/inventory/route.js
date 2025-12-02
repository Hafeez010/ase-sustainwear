import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await prisma.inventory.findMany({
      where: {
        NOT: { Status: "Out of Stock" },
      },
      orderBy: {
        Category: "asc",
      },
      include: {
        donation: {
          include: {
            user: true, 
          },
        },
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Inventory fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}
