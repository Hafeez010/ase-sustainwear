"use client";

export default function PendingBarChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow min-h-[250px]">
      <h2 className="text-lg font-bold mb-2">Donation Progress</h2>

      {data.map((item, i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">{item.label}</span>
            <span className="text-gray-700">{item.value}%</span>
          </div>

          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="h-4 rounded-full"
              style={{ width: `${item.value}%`, backgroundColor: "#F59E0B" }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
