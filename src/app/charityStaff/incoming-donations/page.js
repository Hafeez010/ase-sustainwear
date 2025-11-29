"use client";

import { useState, useEffect } from "react";
import SidebarStaff from "../../components/SidebarStaff";

export default function IncomingDonations() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch donations on mount
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations");
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      }
    };
    fetchDonations();
  }, []);

  const approveDonation = async (id) => {
  try {
    const res = await fetch("/api/donations/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ donationID: id }),
    });

    if (!res.ok) {
      console.error("Approve failed");
      return;
    }

    // Get the response from backend
    const data = await res.json();

    // Remove the approved donation from the list
    setDonations((prev) =>
      prev.filter((d) => d.DonationID !== data.donationID)
    );

  } catch (err) {
    console.error(err);
  }
};

  // Decline donation: updates status in place
  const declineDonation = async (id) => {
    try {
      const res = await fetch("/api/donations/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donationID: id }),
      });

      if (!res.ok) {
        console.error("Decline failed");
        return;
      }

      const data = await res.json();

      setDonations((prev) =>
        prev.map((d) =>
          d.DonationID === data.DonationID
            ? { ...d, Status: "Declined" }
            : d
        )
      );
    } catch (err) {
      console.error(err);
    }
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
                <tr key={d.DonationID}>
                  <td className="border border-black px-4 py-2">{d.DonationID}</td>
                  <td className="border border-black px-4 py-2">{d.Name}</td>
                  <td className="border border-black px-4 py-2">{d.Quantity}</td>
                  <td className="border border-black px-4 py-2">{d.Status}</td>

                  <td className="border border-black px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
                      >
                        View
                      </button>

                      <button
                        onClick={() => approveDonation(d.DonationID)}
                        disabled={d.Status !== "Pending"}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200 disabled:opacity-50"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => declineDonation(d.DonationID)}
                        disabled={d.Status !== "Pending"}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200 disabled:opacity-50"
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

      {/* ---------------- VIEW MODAL ---------------- */}
      {selectedDonation && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Donation Details</h2>

            <p><strong>ID:</strong> {selectedDonation.DonationID}</p>
            <p><strong>Donor:</strong> {selectedDonation.Name}</p>
            <p><strong>Status:</strong> {selectedDonation.Status}</p>
            <p className="mt-4 font-semibold">Item:</p>
            <p>{selectedDonation.Type} (Quantity: {selectedDonation.Quantity})</p>

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
