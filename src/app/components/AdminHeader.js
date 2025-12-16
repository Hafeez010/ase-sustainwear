"use client";

import { signOut } from "next-auth/react";

export default function AdminHeader() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">SustainWear</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </header>
  );
}
