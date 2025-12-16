"use client";

export default function AdminHeader() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">SustainWear</h1>

      <a
        href="http://localhost:3000/login"
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
      >
        Logout
      </a>
    </header>
  );
}
