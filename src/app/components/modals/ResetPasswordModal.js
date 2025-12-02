"use client";

export default function ResetPasswordModal({ user, onClose }) {

  const handleReset = () => {
    console.log("RESET PASSWORD:", user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <p className="mb-6">
          Send a password reset email/link to <b>{user.name}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Send Reset
          </button>
        </div>

      </div>
    </div>
  );
}
