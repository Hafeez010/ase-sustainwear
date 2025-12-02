"use client";

export default function UserTable({
  users,
  onEdit,
  onDisable,
  onDelete,
  onResetPassword,
}) {
  return (
    <div className="flex-1 overflow-x-auto border rounded-lg shadow bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-black text-center">
            <th className="px-4 py-3 border-b">User</th>
            <th className="px-4 py-3 border-b">Role</th>
            <th className="px-4 py-3 border-b">Status</th>
            <th className="px-4 py-3 border-b">Edit</th>
            <th className="px-4 py-3 border-b">Disable</th>
            <th className="px-4 py-3 border-b">Delete</th>
            <th className="px-4 py-3 border-b">Reset</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, idx) => (
            <tr
              key={u.id}
              className={`text-center ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-2 border-b text-left">
                {u.name}
              </td>

              <td className="px-4 py-2 border-b">{u.role}</td>

              <td className="px-4 py-2 border-b">
                {u.status === "active" ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Disabled</span>
                )}
              </td>

              {/* Edit */}
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => onEdit(u)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition"
                  title="Edit User"
                >
                  ✎
                </button>
              </td>

              {/* Disable */}
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => onDisable(u)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition"
                  title="Disable User"
                >
                  ⚠
                </button>
              </td>

              {/* Delete */}
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => onDelete(u)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition"
                  title="Delete User"
                >
                  🗑
                </button>
              </td>

              {/* Reset Password */}
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => onResetPassword(u)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition"
                  title="Reset Password"
                >
                  🔄
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
