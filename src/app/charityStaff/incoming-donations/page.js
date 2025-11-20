'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function IncomingDonations() {
    const router = useRouter();
    const pathname = usePathname();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        // MOCK DATA instead of fetch('/api/donations')
        setDonations([
            { id: "D001", donorName: "Sarah Tan", items: ["Shirt", "Pants"], status: "Pending" },
            { id: "D002", donorName: "John Lee", items: ["Jacket"], status: "Approved" },
            { id: "D003", donorName: "Emma Wong", items: ["Shoes", "T-Shirt"], status: "Pending" }
        ]);
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 flex">

            {/* SIDEBAR */}
            <nav className="w-64 bg-white border-r-2 border-black p-6 flex flex-col space-y-4">
                <h2 className="text-xl font-bold mb-2">SustainWear</h2>

                <button
                    onClick={() => router.push('/charityStaff')}
                    className={`text-left px-3 py-2 border border-black rounded-md 
                        ${pathname === '/charityStaff' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => router.push('/charityStaff/incoming-donations')}
                    className={`text-left px-3 py-2 border border-black rounded-md 
                        ${pathname === '/charityStaff/incoming-donations' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                >
                    Incoming Donations
                </button>

                <button
                    onClick={() => router.push('/charityStaff/inventory')}
                    className={`text-left px-3 py-2 border border-black rounded-md 
                        ${pathname === '/charityStaff/inventory' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                >
                    Inventory
                </button>
            </nav>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">Incoming Donations</h1>

                <div className="bg-white border border-black rounded-lg p-6 shadow-md">
                    <table className="w-full border border-black">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-black px-4 py-2">Donation ID</th>
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
                                        <button className="px-3 py-1 border border-black rounded-md hover:bg-gray-200">
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {donations.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No donations yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </main>
    );
}

