import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { donationID } = await req.json();

    const donation = await prisma.donation.update({
      where: { DonationID: donationID },
      data: { Status: "Declined" },
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
