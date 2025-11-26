import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Missing userId" }),
        { status: 400 }
      );
    }

    const donations = await prisma.donation.findMany({
      where: { UserID: userId },
      orderBy: { SubmittedAt: "desc" },
    });

    return new Response(JSON.stringify(donations), { status: 200 });

  } catch (error) {
    console.error("History API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
