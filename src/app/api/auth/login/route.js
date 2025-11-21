import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || 'yourSecretKey'; 

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ error: "Username and password are required" }), { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { Username: username },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    const token = jwt.sign(
      {
        userId: user.UserID,
        username: user.Username,
      },
      secret,
      { expiresIn: '1d' }
    );

    return new Response(JSON.stringify({
      message: "Login successful",
      token,
      userId: user.UserID,
      username: user.Username,
      role: user.Role,
    }), { status: 200 });

  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
