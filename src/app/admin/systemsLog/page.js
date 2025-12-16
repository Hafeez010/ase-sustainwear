"use client";

import { useState, useEffect } from "react";
import AdminNavBar from "@/app/components/AdminNavBar";
import SystemLogsTable from "@/app/components/SystemLogsTable";

export default function SystemsLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/api/logs");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch logs");

        setLogs(data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-6 py-6 bg-gray-50 text-gray-800">

      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          System Logs
        </h2>
        <a
          href="http://localhost:3000/login"
          className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium"
        >
          Logout
        </a>
      </div>

      <AdminNavBar activeTab="System Logs" />

      <div className="w-full max-w-6xl mt-10">
        {loading ? (
          <p className="text-gray-600 mt-10">Loading logs...</p>
        ) : (
          <SystemLogsTable logs={logs} />
        )}
      </div>
    </main>
  );
}
