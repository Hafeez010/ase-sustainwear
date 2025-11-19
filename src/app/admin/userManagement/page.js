"use client";

import AdminNavBar from "@/app/components/AdminNavBar";
import UserTable from "@/app/components/UserTable";
import SummaryBox from "@/app/components/SummaryBox";

export default function UserManagement() {
  const users = [
    { name: "User 1", role: "Staff" },
    { name: "User 2", role: "Donor" },
    { name: "User 3", role: "Admin" },
    { name: "User 4", role: "Staff" },
    { name: "User 5", role: "Donor" },
    { name: "User 6", role: "Staff" },
  ];

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-extrabold mb-4 text-black text-center">
        User Management
      </h1>

      <AdminNavBar />

      <div className="flex flex-col md:flex-row justify-center gap-10 w-full max-w-5xl">
        <UserTable users={users} />

        <SummaryBox 
          totalUsers={28} 
          totalRequests={17} 
          totalActions={50} 
        />
      </div>
    </main>
  );
}
