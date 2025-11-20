'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function InventoryPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        // MOCK DATA ONLY — no API required
        setInventory([
            { id: "C101", category: "Shirts", condition: "Good", quantity: 124, status: "Available" },
            { id: "C205", category: "Pants", condition: "Good", quantity: 87, status: "Available" },
            { id: "C330", category: "Jackets", condition: "Mixed", quantity: 42, status: "Limited" },
            { id: "C450", category: "Shoes", condition: "Good", quantity: 56, status: "Available" },
            { id: "C498", category: "Bags", condition: "Fair", quantity: 22, status: "Low Stock" },
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

                <button
                    onClick={() => router.push('/charityStaff/distribution')}
                    className="text-left px-3 py-2 border border-black rounded-md hover:bg-gray-200"
                >
                    Distribution
                </button>

                <button
                    onClick={() => router.push('/charityStaff/settings')}
                    className="text-left px-3 py-2 border border-black rounded-md hover:bg-gray-200"
                >
                    Profile / Settings
                </button>
            </nav>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">Inventory</h1>

                {/* Search + Add */}
                <div className="mb-6 flex justify-between">
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        className="px-3 py-2 w-64 border border-black rounded-md"
                    />

                    <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                        + Add Item
                    </button>
                </div>

                {/* Inventory Table */}
                <div className="bg-white border border-black rounded-lg p-6 shadow-md">
                    <table className="w-full border border-black">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-black px-4 py-2">Item ID</th>
                                <th className="border border-black px-4 py-2">Category</th>
                                <th className="border border-black px-4 py-2">Condition</th>
                                <th className="border border-black px-4 py-2">Quantity</th>
                                <th className="border border-black px-4 py-2">Status</th>
                                <th className="border border-black px-4 py-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {inventory.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-black px-4 py-2">{item.id}</td>
                                    <td className="border border-black px-4 py-2">{item.category}</td>
                                    <td className="border border-black px-4 py-2">{item.condition}</td>
                                    <td className="border border-black px-4 py-2">{item.quantity}</td>
                                    <td className="border border-black px-4 py-2">{item.status}</td>
                                    <td className="border border-black px-4 py-2">
                                        <button className="px-3 py-1 border border-black rounded-md hover:bg-gray-200">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {inventory.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No items found.
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


