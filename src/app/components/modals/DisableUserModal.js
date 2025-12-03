"use client";

export default function DisableUserModal({ user, onClose }) {

  const handleDisable = () => {
    console.log("DISABLE:", user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-red-600">Disable User</h2>

        <p className="mb-6">
          Are you sure you want to disable <b>{user.name}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          
          <button
            onClick={handleDisable}
            className="px-4 py-2 rounded bg-yellow-600 text-white"
          >
            Disable
          </button>
        </div>

      </div>
    </div>
  );
}
