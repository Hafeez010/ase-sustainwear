import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { logAction } from "@/lib/logAction";

export async function POST(req) {
  try {
    const { donationID, staffId } = await req.json();

    const donation = await prisma.donation.update({
      where: { DonationID: donationID },
      data: { Status: "Declined" },
    });

    await logAction({
      userId: staffId,
      action: `Declined donation ${donationID}`,
    });

    return NextResponse.json(donation);

  } catch (error) {
    console.error("Decline error:", error);
    return NextResponse.json(
      { error: "Failed to decline donation" },
      { status: 500 }
    );
  }
}
