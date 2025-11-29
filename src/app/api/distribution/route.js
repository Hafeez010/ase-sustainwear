import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { inventoryID, recipient, quantity } = await req.json();

    // 1. Fetch inventory item
    const inv = await prisma.inventory.findUnique({
      where: { InventoryID: inventoryID },
    });

    if (!inv) {
      return NextResponse.json(
        { error: "Inventory item not found" },
        { status: 404 }
      );
    }

    if (inv.Quantity < quantity) {
      return NextResponse.json(
        { error: "Not enough quantity available" },
        { status: 400 }
      );
    }

    // 2. Create distribution record
    await prisma.distribution.create({
      data: {
        InventoryID: inventoryID,
        Recipient: recipient,
        Quantity: quantity,
      },
    });

    // 3. Update inventory after distribution
    const updatedItem = await prisma.inventory.update({
      where: { InventoryID: inventoryID },
      data: {
        Quantity: inv.Quantity - quantity,
        Status:
          inv.Quantity - quantity <= 0
            ? "Out of Stock"
            : inv.Quantity - quantity <= 50
            ? "Low"
            : "Available",
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create distribution record" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const records = await prisma.distribution.findMany({
      orderBy: { Date: "desc" },
      include: {
        inventory: true, // allows you to show category automatically
      },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch distribution records" },
      { status: 500 }
    );
  }
}