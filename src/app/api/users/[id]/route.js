import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(req, { params }) {
  const id = params.id;

  try {
    const body = await req.json();
    const { FirstName, LastName, Role } = body;

    const updated = await prisma.user.update({
      where: { UserID: id },
      data: { FirstName, LastName, Role },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT update user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------
// DELETE USER
// ---------------------------------------------
export async function DELETE(req, { params }) {
  const id = params.id;

  try {
    await prisma.user.delete({
      where: { UserID: id },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE user error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
