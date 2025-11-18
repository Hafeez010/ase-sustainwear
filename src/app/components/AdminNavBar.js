"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavBar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", href: "/admin-dashboard" },
    { name: "User Management", href: "/user-management" },
    { name: "Reports & Analytics", href: "/reports" },
    { name: "System Logs", href: "/system-logs" },
  ];

  return (
    <nav className="flex gap-4 justify-center mb-10">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition relative ${
              isActive
                ? "text-blue-600 border-blue-400"
                : "text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-500 rounded-t-sm" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
