import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { inventoryID } = await req.json();

    await prisma.inventory.update({
      where: { InventoryID: inventoryID },
      data: {
        Status: "Out of Stock",
      },
    });

    return NextResponse.json({ success: true, inventoryID });
  } catch (error) {
    console.error("Allocation error:", error);
    return NextResponse.json(
      { error: "Failed to allocate item" },
      { status: 500 }
    );
  }
}
