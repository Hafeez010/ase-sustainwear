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
    <main className="flex flex-col items-center min-h-screen px-6 py-6 bg-gray-50 text-gray-800">

      {/* HEADER ROW */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        {/* Company Name */}
        <h1 className="text-2xl font-bold text-black">SustainWear</h1>

        {/* Page Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-black flex-1 text-center">
          User Management
        </h2>

        {/* Logout Button */}
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black font-medium">
          Logout
        </button>
      </div>

      {/* NAV BAR */}
      <AdminNavBar activeTab="User Management" />

      {/* Summary Box horizontally above the table */}
      <div className="w-full max-w-5xl mb-8">
        <SummaryBox totalUsers={28} totalRequests={17} totalActions={50} />
      </div>

      {/* User Table full width */}
      <div className="w-full max-w-5xl">
        <UserTable
          users={users}
          onEdit={(u) => openModal("edit", u)}
          onDisable={(u) => openModal("disable", u)}
          onDelete={(u) => openModal("delete", u)}
          onResetPassword={(u) => openModal("reset", u)}
        />
      </div>

      {/* Modals */}
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
