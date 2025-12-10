import prisma from "@/lib/prisma";

export async function logAction({ userId = null, action, status = "Success" }) {
  try {
    await prisma.systemLog.create({
      data: {
        UserID: userId,
        Action: action,
        Status: status,
      },
    });
  } catch (error) {
    console.error("SYSTEM LOGGING ERROR:", error);
  }
}
