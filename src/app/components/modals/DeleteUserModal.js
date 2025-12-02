"use client";

export default function DeleteUserModal({ user, onClose }) {
  const handleDelete = () => {
    console.log("DELETE:", user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-red-700">Delete User</h2>

        <p className="mb-6 text-red-600">
          This action is permanent. Delete <b>{user.name}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-700 text-white"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
