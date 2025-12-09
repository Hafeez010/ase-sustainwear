"use client";

import { useState, useEffect } from "react";
import AdminNavBar from "@/app/components/AdminNavBar";
import UserTable from "@/app/components/UserTable";
import SummaryBox from "@/app/components/SummaryBox";
import EditUserModal from "@/app/components/modals/EditUserModal";
import DeleteUserModal from "@/app/components/modals/DeleteUserModal";


export default function UserManagement() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH USERS ----------------
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch users");

        const formatted = data.users.map((u) => ({
          id: u.UserID,
          FirstName: u.FirstName,
          LastName: u.LastName,
          name: `${u.FirstName} ${u.LastName}`,
          role: u.Role,
          status: "active",
        }));

        setUsers(formatted);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // ---------------- MODAL HANDLERS ----------------
  const openModal = (type, user) => {
    setSelectedUser(user);
    setActiveModal(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setActiveModal(null);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.UserID ? {
        ...u,
        FirstName: updatedUser.FirstName,
        LastName: updatedUser.LastName,
        name: `${updatedUser.FirstName} ${updatedUser.LastName}`,
        role: updatedUser.Role,
      } : u))
    );
  };
  const handleUserDeleted = (deletedId) => {
  setUsers((prev) => prev.filter((u) => u.id !== deletedId));
};


  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-6 bg-gray-50 text-gray-800">

      {/* HEADER ROW */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          User Management
        </h2>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium">
          Logout
        </button>
      </div>

      {/* NAV BAR */}
      <AdminNavBar activeTab="User Management" />

      {/* SUMMARY BOX */}
      <div className="w-full max-w-5xl mb-8">
        <SummaryBox 
          totalUsers={users.length}
          totalRequests={0}
          totalActions={0}
        />
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <p className="text-gray-600 mt-10">Loading users...</p>
      ) : (
        <div className="w-full max-w-5xl">
          <UserTable
            users={users}
            onEdit={(u) => openModal("edit", u)}
            onDelete={(u) => openModal("delete", u)}
          />
        </div>
      )}

      {/* EDIT USER MODAL */}
      {activeModal === "edit" && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={closeModal}
          onUpdated={handleUserUpdated}
        />
      )}

      {activeModal === "delete" && selectedUser && (
  <DeleteUserModal
    user={selectedUser}
    onClose={closeModal}
    onDeleted={handleUserDeleted}
  />
)}

    </main>
  );
}
