"use client";

import { useState } from "react";

export default function DeleteUserModal({ user, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      onDeleted(user.id); // remove from frontend state
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Delete User</h2>
        <p className="mb-6">Are you sure you want to delete <strong>{user.name}</strong>?</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
