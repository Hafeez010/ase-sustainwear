import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req) {
  try {
    const { id, Category, Condition, Quantity, Status } = await req.json();

    const updated = await prisma.inventory.update({
      where: { InventoryID: id },
      data: {
        Category,
        Condition,
        Quantity: Number(Quantity),
        Status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update inventory error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}
