import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { logAction } from "@/lib/logAction";

export async function GET() {
  try {
    const distributions = await prisma.distribution.findMany({
      orderBy: { Date: "desc" },
      include: { inventory: true },
    });

    const formatted = distributions.map((d) => ({
      id: d.DistributionID,
      recipient: d.Recipient,
      category: d.inventory?.Category || "Unknown",
      quantity: d.Quantity,
      date: new Date(d.Date).toLocaleDateString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /distribution error:", error);
    return NextResponse.json(
      { error: "Failed to fetch distribution records" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { inventoryID, recipient, quantity,staffId } = await req.json();

    if (!inventoryID || !recipient || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const inv = await prisma.inventory.findUnique({
      where: { InventoryID: inventoryID },
    });
      await logAction({
    userId: staffId,
    action: `Distributed ${quantity} of ${inv.Category} to ${recipient}`,
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

    await prisma.distribution.create({
      data: {
        InventoryID: inventoryID,
        Recipient: recipient,
        Quantity: Number(quantity),
      },
    });

    const remaining = inv.Quantity - quantity;

    const updatedItem = await prisma.inventory.update({
      where: { InventoryID: inventoryID },
      data: {
        Quantity: remaining,
        Status:
          remaining <= 0
            ? "Out of Stock"
            : remaining <= 50
            ? "Low"
            : "Available",
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("POST /distribution error:", error);
    return NextResponse.json(
      { error: "Failed to create distribution record" },
      { status: 500 }
    );
  }
}
