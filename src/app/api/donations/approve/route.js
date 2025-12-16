import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAction } from "@/lib/logAction";


export async function POST(req) {
  try {
    const { donationID,staffId } = await req.json();

    const donation = await prisma.donation.findUnique({
      where: { DonationID: donationID },
    });

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    await prisma.donation.update({
      where: { DonationID: donationID },
      data: { Status: "Approved" },
    });
    await logAction({
    userId: staffId,
    action: `Approved donation ${donationID} → added to inventory`,
    });

    const inventoryItem = await prisma.inventory.create({
      data: {
        Category: donation.Type,
        Condition: donation.Condition,
        Quantity: donation.Quantity,
        Status: "Available",
        SourceDonationID: donation.DonationID,
      },
    });

    return NextResponse.json({
      donationID: donation.DonationID,
      inventoryItem,
    });
  } catch (error) {
    console.error("Approve donation error:", error);
    return NextResponse.json(
      { error: "Failed to approve donation" },
      { status: 500 }
    );
  }
  
}
