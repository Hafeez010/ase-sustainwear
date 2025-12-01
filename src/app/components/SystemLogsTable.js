"use client";

export default function SystemLogsTable({ logs }) {
  return (
    <div className="flex-1 overflow-x-auto border rounded-lg shadow bg-white">
      <table className="min-w-full border-collapse border border-green-300">
        <thead className="bg-gray-200 text-black font-bold text-center">
          <tr>
            <th className="px-4 py-2 border border-green-300">Timestamp</th>
            <th className="px-4 py-2 border border-green-300">User</th>
            <th className="px-4 py-2 border border-green-300">Role</th>
            <th className="px-4 py-2 border border-green-300">Action</th>
            <th className="px-4 py-2 border border-green-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-green-50 text-black"}
            >
              <td className="px-4 py-2 border border-green-300">{log.time}</td>
              <td className="px-4 py-2 border border-green-300">{log.user}</td>
              <td className="px-4 py-2 border border-green-300">{log.role}</td>
              <td className="px-4 py-2 border border-green-300">{log.action}</td>
              <td className="px-4 py-2 border border-green-300">{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
