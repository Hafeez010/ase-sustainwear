"use client";

import { useState } from "react";

export default function EditUserModal({ user, onClose }) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    console.log("SAVE EDIT:", { id: user.id, name, role });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">Edit User</h2>

        <label className="block mb-2 text-sm font-medium">Name</label>
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Role</label>
        <select
          className="w-full border rounded px-3 py-2 mb-6"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Staff</option>
          <option>Donor</option>
          <option>Admin</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
