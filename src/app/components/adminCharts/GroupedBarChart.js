"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GroupedBarChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow min-h-[250px]">
      <h2 className="text-lg font-bold mb-2">Active Users vs Pending Approvals</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activeUsers" fill="#3B82F6" />
          <Bar dataKey="pendingApprovals" fill="#F97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
