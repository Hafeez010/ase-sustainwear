"use client";

export default function SummaryBox({ totalUsers, totalRequests, totalActions }) {
  return (
    <div className="w-full md:w-1/3 bg-white border rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold mb-3 text-center border-b pb-2">
        Summary
      </h2>

      <ul className="space-y-2 text-left">
        <li className="flex justify-between">
          <span className="font-bold">Total Users:</span> <span>{totalUsers}</span>
        </li>

        <li className="flex justify-between">
          <span className="font-bold">Total Requests:</span> <span>{totalRequests}</span>
        </li>

        <li className="flex justify-between">
          <span className="font-bold">Total Actions:</span> <span>{totalActions}</span>
        </li>
      </ul>
    </div>
  );
}
