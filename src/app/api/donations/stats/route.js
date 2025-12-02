import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    const donationsMade = await prisma.donation.count({
      where: { UserID: userId }
    });

    const totalItems = await prisma.donation.aggregate({
      _sum: { Quantity: true },
      where: { UserID: userId }
    });

    return new Response(
      JSON.stringify({
        donationsMade,
        totalItems: totalItems._sum.Quantity || 0
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Stats API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
