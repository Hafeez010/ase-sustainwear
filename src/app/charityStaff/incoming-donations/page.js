"use client";

import { useState, useEffect } from "react";
import SidebarStaff from "../../components/SidebarStaff";

export default function IncomingDonations() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null); // modal data

  useEffect(() => {
    // MOCK DATA
    setDonations([
      {
        id: "D001",
        donorName: "Sarah Tan",
        items: ["Shirt", "Pants"],
        status: "Pending"
      },
      {
        id: "D002",
        donorName: "John Lee",
        items: ["Jacket"],
        status: "Approved"
      },
      {
        id: "D003",
        donorName: "Emma Wong",
        items: ["Shoes"],
        status: "Pending"
      }
    ]);
  }, []);

  // Handle Approve
  const approveDonation = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Approved" } : d))
    );
  };

  // Handle Decline
  const declineDonation = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Declined" } : d))
    );
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <SidebarStaff active="incoming" />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Incoming Donations</h1>

        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
          <table className="w-full border border-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-black px-4 py-2">ID</th>
                <th className="border border-black px-4 py-2">Donor</th>
                <th className="border border-black px-4 py-2">Items</th>
                <th className="border border-black px-4 py-2">Status</th>
                <th className="border border-black px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((d) => (
                <tr key={d.id}>
                  <td className="border border-black px-4 py-2">{d.id}</td>
                  <td className="border border-black px-4 py-2">{d.donorName}</td>
                  <td className="border border-black px-4 py-2">{d.items.length}</td>
                  <td className="border border-black px-4 py-2">{d.status}</td>

                  <td className="border border-black px-4 py-2">
                    <div className="flex gap-2">

                      {/* VIEW BUTTON */}
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
                      >
                        View
                      </button>

                      {/* APPROVE BUTTON */}
                      <button
                        onClick={() => approveDonation(d.id)}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
                      >
                        Approve
                      </button>

                      {/* DECLINE BUTTON */}
                      <button
                        onClick={() => declineDonation(d.id)}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
                      >
                        Decline
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

              {donations.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Incoming Donations Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- VIEW MODAL ---------- */}
      {selectedDonation && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-4">Donation Details</h2>

            <p><strong>ID:</strong> {selectedDonation.id}</p>
            <p><strong>Donor:</strong> {selectedDonation.donorName}</p>
            <p><strong>Status:</strong> {selectedDonation.status}</p>
            <p className="mt-4 font-semibold">Items:</p>

            <ul className="list-disc pl-6">
              {selectedDonation.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedDonation(null)}
              className="mt-6 px-6 py-2 border border-black rounded-md hover:bg-gray-200"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </main>
  );
}

