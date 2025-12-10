import prisma from "@/lib/prisma";
import { logAction } from "@/lib/logAction";

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, type, condition, description, userId, quantity } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not logged in" }), {
        status: 401,
      });
    }
await logAction({
  userId,
  action: `Submitted donation (${type}) x${quantity}`,
});

    // ⭐ Fetch user name from database
    const user = await prisma.user.findUnique({
      where: { UserID: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const donorName = `${user.FirstName} ${user.LastName}`;

    // ⭐ Create donation
    const donation = await prisma.donation.create({
      data: {
        Name: donorName,                     // auto-filled from user table
        Phone: phone || null,
        Type: type,
        Condition: condition,
        Description: description || null,
        Quantity: Number(quantity),
        Status: "Pending",
        UserID: userId,
      },
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
