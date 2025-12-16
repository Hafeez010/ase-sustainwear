"use client";

export default function SummaryBox({ totalUsers, totalRequests, totalActions }) {
  const summaryData = [
    { label: "Total Users", value: totalUsers },
    { label: "Total Requests", value: totalRequests },
    { label: "Total Actions", value: totalActions },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        {summaryData.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 bg-white border rounded-lg shadow p-4 text-center hover:shadow-md transition"
          >
            <h3 className="text-gray-600 text-sm font-medium">{item.label}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
