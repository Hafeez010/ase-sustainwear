import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { logAction } from "@/lib/logAction";
import { use } from "react";

export async function POST(req) {
  try {
    const { donationID } = await req.json();

    const donation = await prisma.donation.update({
      where: { DonationID: donationID },
      where:{userId:UserID},
      data: { Status: "Declined" },
    });
  await logAction({
  userId: UserID,
  action: `Declined donation ${donationID}`,
  });

    return NextResponse.json(donation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to decline donation" },
      { status: 500 }
    );
  }
}
