import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const { donationID } = await req.json();

  try {

    const updatedDonation = await prisma.donation.update({
      where: { DonationID: donationID },
      data: { Status: "Approved" },
    });

    await prisma.inventory.create({
      data: {
        Category: updatedDonation.Type,
        Condition: updatedDonation.Condition,
        Quantity: updatedDonation.Quantity,
        SourceDonationID: updatedDonation.DonationID,
      },
    });

    return NextResponse.json(updatedDonation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to approve donation" }, { status: 500 });
  }
}
