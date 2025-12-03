"use client";

export default function UserTable({ users, onEdit, onDisable, onDelete, onResetPassword }) {
  return (
    <div className="overflow-x-auto border rounded-lg shadow bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-black text-center">
            <th className="px-4 py-3 border-b w-1/4">User</th>
            <th className="px-4 py-3 border-b w-1/6">Role</th>
            <th className="px-4 py-3 border-b w-1/6">Status</th>
            <th className="px-4 py-3 border-b w-1/12">Edit</th>
            <th className="px-4 py-3 border-b w-1/12">Disable</th>
            <th className="px-4 py-3 border-b w-1/12">Delete</th>
            <th className="px-4 py-3 border-b w-1/12">Reset</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, idx) => (
            <tr
              key={u.id}
              className={`text-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
            >
              <td className="px-4 py-3 border-b text-left">{u.name}</td>
              <td className="px-4 py-3 border-b">{u.role}</td>
              <td className="px-4 py-3 border-b">
                {u.status === "active" ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Disabled</span>
                )}
              </td>

              {/* Action Buttons */}
              <td className="px-4 py-3 border-b">
                <button
                  onClick={() => onEdit(u)}
                  className="w-full py-1 border rounded hover:bg-gray-100 transition"
                >
                  Edit
                </button>
              </td>

              <td className="px-4 py-3 border-b">
                <button
                  onClick={() => onDisable(u)}
                  className="w-full py-1 border rounded hover:bg-gray-100 transition"
                >
                  Disable
                </button>
              </td>

              <td className="px-4 py-3 border-b">
                <button
                  onClick={() => onDelete(u)}
                  className="w-full py-1 border rounded hover:bg-gray-100 transition"
                >
                  Delete
                </button>
              </td>

              <td className="px-4 py-3 border-b">
                <button
                  onClick={() => onResetPassword(u)}
                  className="w-full py-1 border rounded hover:bg-gray-100 transition"
                >
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
