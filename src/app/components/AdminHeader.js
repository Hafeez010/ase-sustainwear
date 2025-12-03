"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // Placeholder: replace with actual logout logic
    console.log("Logout clicked");
    // e.g., clear auth token / session and redirect
    router.push("/login");
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
