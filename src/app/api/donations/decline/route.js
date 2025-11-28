import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req) {
  try {
    const { donationID } = await req.json();
    const updated = await prisma.donation.update({
      where: { DonationID: donationID },
      data: { Status: "Declined" },
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to decline donation" }), { status: 500 });
  }
}
