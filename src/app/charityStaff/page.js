"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CharityStaffDashboard() {
    const router = useRouter();

    // Sample dashboard data (replace with backend later)
    const [recentDonations, setRecentDonations] = useState([]);
    const [inventoryOverview, setInventoryOverview] = useState([]);

    useEffect(() => {
        // Example data — remove when connecting API
        setRecentDonations([
            { id: "D001", donor: "Sarah Tan", date: "28/10/2025", items: 8, status: "Pending" },
            { id: "D002", donor: "John Lee", date: "26/10/2025", items: 4, status: "Approved" },
            { id: "D003", donor: "Emma Wong", date: "25/10/2025", items: 6, status: "Pending" },
        ]);

        setInventoryOverview([
            { id: "C101", category: "Shirts", quantity: 124, condition: "Good" },
            { id: "C205", category: "Pants", quantity: 87, condition: "Good" },
            { id: "C330", category: "Jackets", quantity: 42, condition: "Mixed" },
        ]);
    }, []);

    return (
        <main className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r-2 border-black flex flex-col">
                <div className="p-6 border-b-2 border-black">
                    <h1 className="text-xl font-bold">SustainWear</h1>
                    <p className="text-sm text-gray-600">Charity Staff Dashboard</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => router.push("/charityStaff")}
                        className="w-full text-left px-4 py-2 rounded-md bg-gray-300 font-semibold"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => router.push("/charityStaff/incoming-donations")}
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
                    >
                        Incoming Donations
                    </button>

                    <button
                        onClick={() => router.push("/charityStaff/inventory")}
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
                    >
                        Inventory
                    </button>

                    <button
                        onClick={() => router.push("/charityStaff/distribution-records")}
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
                    >
                        Distribution Records
                    </button>

                    <button
                        onClick={() => router.push("/charityStaff/reports")}
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
                    >
                        Reports / Analytics
                    </button>

                    <button
                        onClick={() => router.push("/charityStaff/settings")}
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
                    >
                        Profile / Settings
                    </button>
                </nav>

                <div className="p-4 border-t-2 border-black">
                    <button
                        onClick={() => router.push("/")}
                        className="w-full border border-black py-2 rounded-md hover:bg-gray-200 transition font-semibold"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <section className="flex-1 p-10">

                {/* PAGE TITLE */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-2 border border-black rounded-md focus:outline-none"
                    />
                </div>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-white border-2 border-black rounded-lg p-6 shadow">
                        <h3 className="font-bold text-xl mb-2">Pending Donations</h3>
                        <p className="text-3xl font-bold">{recentDonations.filter(d => d.status === "Pending").length}</p>
                    </div>

                    <div className="bg-white border-2 border-black rounded-lg p-6 shadow">
                        <h3 className="font-bold text-xl mb-2">Total Inventory Items</h3>
                        <p className="text-3xl font-bold">
                            {inventoryOverview.reduce((sum, item) => sum + item.quantity, 0)}
                        </p>
                    </div>

                    <div className="bg-white border-2 border-black rounded-lg p-6 shadow">
                        <h3 className="font-bold text-xl mb-2">Approved Donations</h3>
                        <p className="text-3xl font-bold">{recentDonations.filter(d => d.status === "Approved").length}</p>
                    </div>
                </div>

                {/* RECENT DONATIONS TABLE */}
                <div className="bg-white border border-black rounded-lg p-6 shadow mb-10">
                    <h3 className="text-lg font-bold mb-4">Recent Donations</h3>

                    <table className="w-full border-collapse border border-black text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-black px-4 py-2">ID</th>
                                <th className="border border-black px-4 py-2">Donor</th>
                                <th className="border border-black px-4 py-2">Date</th>
                                <th className="border border-black px-4 py-2">Items</th>
                                <th className="border border-black px-4 py-2">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentDonations.map((d) => (
                                <tr key={d.id}>
                                    <td className="border border-black px-4 py-2">{d.id}</td>
                                    <td className="border border-black px-4 py-2">{d.donor}</td>
                                    <td className="border border-black px-4 py-2">{d.date}</td>
                                    <td className="border border-black px-4 py-2">{d.items}</td>
                                    <td className="border border-black px-4 py-2">{d.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* INVENTORY OVERVIEW TABLE */}
                <div className="bg-white border border-black rounded-lg p-6 shadow">
                    <h3 className="text-lg font-bold mb-4">Inventory Overview</h3>

                    <table className="w-full border-collapse border border-black text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-black px-4 py-2">ID</th>
                                <th className="border border-black px-4 py-2">Category</th>
                                <th className="border border-black px-4 py-2">Quantity</th>
                                <th className="border border-black px-4 py-2">Condition</th>
                            </tr>
                        </thead>

                        <tbody>
                            {inventoryOverview.map((i) => (
                                <tr key={i.id}>
                                    <td className="border border-black px-4 py-2">{i.id}</td>
                                    <td className="border border-black px-4 py-2">{i.category}</td>
                                    <td className="border border-black px-4 py-2">{i.quantity}</td>
                                    <td className="border border-black px-4 py-2">{i.condition}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>
        </main>
    );
}

