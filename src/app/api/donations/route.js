import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { SubmittedAt: "desc" },
    });
    return new Response(JSON.stringify(donations), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch donations" }), { status: 500 });
  }
}
