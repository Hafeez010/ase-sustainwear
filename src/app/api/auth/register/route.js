import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  const { username, firstName, lastName, dob, password } = await req.json();

  if (!username || !firstName || !lastName || !dob || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await prisma.user.create({
      data: {
        Username: username,
        FirstName: firstName,
        LastName: lastName,
        DateOfBirth: new Date(dob),
        Password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return new Response(JSON.stringify({ error: "User already exists or internal server error" }), { status: 500 });
  }
}
