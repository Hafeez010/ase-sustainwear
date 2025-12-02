"use client";

import { useState } from "react";
import AdminNavBar from "@/app/components/AdminNavBar";
import UserTable from "@/app/components/UserTable";
import SummaryBox from "@/app/components/SummaryBox";

import EditUserModal from "@/app/components/modals/EditUserModal";
import DisableUserModal from "@/app/components/modals/DisableUserModal";
import DeleteUserModal from "@/app/components/modals/DeleteUserModal";
import ResetPasswordModal from "@/app/components/modals/ResetPasswordModal";

export default function UserManagement() {
  const [activeModal, setActiveModal] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(null);

  // Placeholder sample data with IDs
  const users = [
    { id: 1, name: "User 1", role: "Staff", status: "active" },
    { id: 2, name: "User 2", role: "Donor", status: "active" },
    { id: 3, name: "User 3", role: "Admin", status: "disabled" },
    { id: 4, name: "User 4", role: "Staff", status: "active" },
    { id: 5, name: "User 5", role: "Donor", status: "disabled" },
    { id: 6, name: "User 6", role: "Staff", status: "active" },
  ];

  const openModal = (type, user) => {
    setSelectedUser(user);
    setActiveModal(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setActiveModal(null);
  };

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      
      <h1 className="text-5xl font-extrabold mb-4 text-black text-center">
        User Management
      </h1>

      <AdminNavBar activeTab="User Management" />

      <div className="flex flex-col md:flex-row justify-center gap-10 w-full max-w-5xl mt-10">
        
        <UserTable
          users={users}
          onEdit={(u) => openModal("edit", u)}
          onDisable={(u) => openModal("disable", u)}
          onDelete={(u) => openModal("delete", u)}
          onResetPassword={(u) => openModal("reset", u)}
        />

        <SummaryBox totalUsers={28} totalRequests={17} totalActions={50} />
      </div>

      {/* ALL MODALS */}
      {activeModal === "edit" && (
        <EditUserModal user={selectedUser} onClose={closeModal} />
      )}

      {activeModal === "disable" && (
        <DisableUserModal user={selectedUser} onClose={closeModal} />
      )}

      {activeModal === "delete" && (
        <DeleteUserModal user={selectedUser} onClose={closeModal} />
      )}

      {activeModal === "reset" && (
        <ResetPasswordModal user={selectedUser} onClose={closeModal} />
      )}
    </main>
  );
}
