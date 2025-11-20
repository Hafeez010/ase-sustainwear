"use client";

export default function UserTable({ users }) {
  return (
    <div className="flex-1 overflow-x-auto border rounded-lg shadow bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-black text-center">
            <th className="px-4 py-3 border-b">User</th>
            <th className="px-4 py-3 border-b">Role</th>
            <th className="px-4 py-3 border-b">✓</th>
            <th className="px-4 py-3 border-b">✕</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, idx) => (
            <tr
              key={idx}
              className={`text-center ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-2 border-b text-left">{u.name}</td>
              <td className="px-4 py-2 border-b">{u.role}</td>
              <td className="px-4 py-2 border-b">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                  ✓
                </button>
              </td>
              <td className="px-4 py-2 border-b">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
