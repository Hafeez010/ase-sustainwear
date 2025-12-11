import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { logAction } from "@/lib/logAction";

// ---------------------------------------------
// UPDATE USER
// ---------------------------------------------
export async function PUT(req, context) {
  try {
    // Fix: await params
    const { id } = await context.params;

    // Extract adminId + fields being updated
    const { adminId, FirstName, LastName, Role } = await req.json();

    if (!adminId) {
      return NextResponse.json(
        { error: "adminId missing in request" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { UserID: id },
      data: { FirstName, LastName, Role },
    });

    // Log action
    await logAction({
      userId: adminId,
      action: `Updated user ${updatedUser.UserID} (${updatedUser.Role})`,
      status: "Success",
    });

    return NextResponse.json(updatedUser);
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
export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    const { adminId } = await req.json();

    if (!adminId) {
      return NextResponse.json(
        { error: "adminId missing in request" },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { UserID: id },
    });

    await logAction({
      userId: adminId,
      action: `Deleted user ${deletedUser.UserID}`,
      status: "Success",
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
