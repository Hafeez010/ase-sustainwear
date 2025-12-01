"use client";

import { useState } from "react";
import SidebarStaff from "../../components/SidebarStaff";

export default function ProfileSettings() {
  // Mock user data
  const [profile, setProfile] = useState({
    name: "Nurul Aisyah",
    email: "aisyah@sustainwear.org",
    phone: "012-3456789",
    role: "Charity Staff",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <SidebarStaff active="settings" />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Profile / Settings</h1>

        {/* PROFILE INFO SECTION */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-black rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-black rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-black rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Role</label>
              <input
                value={profile.role}
                disabled
                className="w-full px-3 py-2 border border-black rounded-md bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Save Changes
          </button>
        </div>

        {/* PASSWORD SECTION */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium mb-1">Current Password</label>
              <input
                name="current"
                type="password"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-black rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">New Password</label>
              <input
                name="newPass"
                type="password"
                value={passwords.newPass}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-black rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Confirm New Password</label>
              <input
                name="confirm"
                type="password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-black rounded-md"
              />
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Update Password
          </button>
        </div>
      </section>
    </main>
  );
}
