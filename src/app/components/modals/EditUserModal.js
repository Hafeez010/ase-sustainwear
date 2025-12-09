"use client";

import { useState } from "react";

export default function EditUserModal({ user, onClose, onUpdated }) {
  const [firstName, setFirstName] = useState(user.FirstName || "");
  const [lastName, setLastName] = useState(user.LastName || "");
  const [role, setRole] = useState(user.Role || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ FirstName: firstName, LastName: lastName, Role: role }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const updatedUser = await res.json();
      onUpdated(updatedUser); // update parent state
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">Edit User</h2>

        <label className="block mb-2 text-sm font-medium">First Name</label>
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Last Name</label>
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Role</label>
        <select
          className="w-full border rounded px-3 py-2 mb-6"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>user</option>
          <option>charity_staff</option>
          <option>admin</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}
