import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, type, condition, description, userId, quantity } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not logged in" }), {
        status: 401,
      });
    }

    if (!type || !condition) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        Name: name,
        Phone: phone || null,
        Type: type,
        Condition: condition,
        Description: description || null,
        Quantity: quantity ? Number(quantity) : 1,
        Status: "Pending",
        UserID: userId,
      }
    });

    return new Response(
      JSON.stringify({ message: "Donation submitted", donation }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Donation Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
