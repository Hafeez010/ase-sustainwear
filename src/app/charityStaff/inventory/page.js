"use client";

import { useState, useEffect } from "react";
import SidebarStaff from "../../components/SidebarStaff";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // View modal
  const [allocateItem, setAllocateItem] = useState(null); // Allocate modal
  const [addItemOpen, setAddItemOpen] = useState(false); // Add item modal
  const [distributionRecords, setDistributionRecords] = useState([]);

  useEffect(() => {
    // MOCK INVENTORY DATA
    setInventory([
      { id: "C101", category: "Shirts", condition: "Good", quantity: 124, status: "Available" },
      { id: "C205", category: "Pants", condition: "Good", quantity: 87, status: "Available" },
      { id: "C330", category: "Jackets", condition: "Mixed", quantity: 42, status: "Low" },
    ]);
  }, []);

  // HANDLE ALLOCATION SUBMIT
  const handleAllocateSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const recipient = formData.get("recipient");
    const qty = parseInt(formData.get("quantity"), 10);

    // Update inventory quantity
    setInventory((prev) =>
      prev.map((item) =>
        item.id === allocateItem.id
          ? {
              ...item,
              quantity: item.quantity - qty,
              status: item.quantity - qty <= 50 ? "Low" : "Available",
            }
          : item
      )
    );

    // Add new distribution record
    setDistributionRecords((prev) => [
      ...prev,
      {
        id: "R" + String(prev.length + 1).padStart(3, "0"),
        itemID: allocateItem.id,
        recipient: recipient,
        quantity: qty,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setAllocateItem(null); // Close modal
  };

  // HANDLE ADD ITEM SUBMIT
  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newItem = {
      id: formData.get("id"),
      category: formData.get("category"),
      condition: formData.get("condition"),
      quantity: parseInt(formData.get("quantity")),
      status: formData.get("status"),
    };

    setInventory((prev) => [...prev, newItem]);
    setAddItemOpen(false);
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <SidebarStaff active="inventory" />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Inventory</h1>

        <div className="mb-6 flex justify-between">
          <input
            type="text"
            placeholder="Search inventory..."
            className="px-3 py-2 w-64 border border-black rounded-md"
          />

          {/* ADD ITEM BUTTON */}
          <button
            onClick={() => setAddItemOpen(true)}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            + Add Item
          </button>
        </div>

        {/* INVENTORY TABLE */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
          <table className="w-full border border-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-black px-4 py-2">ID</th>
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
                    <div className="flex gap-2">

                      {/* VIEW BUTTON */}
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
                      >
                        View
                      </button>

                      {/* EDIT BUTTON (future feature) */}
                      <button className="px-3 py-1 border border-black rounded-md hover:bg-gray-200">
                        Edit
                      </button>

                      {/* ALLOCATE BUTTON */}
                      <button
                        onClick={() => setAllocateItem(item)}
                        className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
                      >
                        Allocate
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------- VIEW MODAL ---------------- */}
      {selectedItem && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Inventory Item Details</h2>

            <p><strong>ID:</strong> {selectedItem.id}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Condition:</strong> {selectedItem.condition}</p>
            <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
            <p><strong>Status:</strong> {selectedItem.status}</p>

            <button
              onClick={() => setSelectedItem(null)}
              className="mt-6 px-6 py-2 border border-black rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------------- ALLOCATE MODAL ---------------- */}
      {allocateItem && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Allocate Item for Distribution</h2>

            <form onSubmit={handleAllocateSubmit}>
              <p><strong>Item:</strong> {allocateItem.category} ({allocateItem.id})</p>
              <p><strong>Available:</strong> {allocateItem.quantity}</p>

              <label className="block mt-4 mb-1 font-semibold">Recipient</label>
              <input
                name="recipient"
                required
                className="w-full px-3 py-2 border border-black rounded-md"
              />

              <label className="block mt-4 mb-1 font-semibold">Quantity to Allocate</label>
              <input
                name="quantity"
                type="number"
                min="1"
                max={allocateItem.quantity}
                required
                className="w-full px-3 py-2 border border-black rounded-md"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setAllocateItem(null)}
                  className="px-4 py-2 border border-black rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Allocate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- ADD ITEM MODAL ---------------- */}
      {addItemOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-4">Add New Inventory Item</h2>

            <form onSubmit={handleAddItemSubmit}>

              <label className="block mb-1 font-semibold">Item ID</label>
              <input
                name="id"
                required
                className="w-full px-3 py-2 border border-black rounded-md"
              />

              <label className="block mt-4 mb-1 font-semibold">Category</label>
              <input
                name="category"
                required
                className="w-full px-3 py-2 border border-black rounded-md"
              />

              <label className="block mt-4 mb-1 font-semibold">Condition</label>
              <select
                name="condition"
                required
                className="w-full px-3 py-2 border border-black rounded-md"
              >
                <option>Good</option>
                <option>Fair</option>
                <option>Mixed</option>
                <option>Poor</option>
              </select>

              <label className="block mt-4 mb-1 font-semibold">Quantity</label>
              <input
                name="quantity"
                type="number"
                min="1"
                required
                className="w-full px-3 py-2 border border-black rounded-md"
              />

              <label className="block mt-4 mb-1 font-semibold">Status</label>
              <select
                name="status"
                required
                className="w-full px-3 py-2 border border-black rounded-md"
              >
                <option>Available</option>
                <option>Low</option>
                <option>Out of Stock</option>
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setAddItemOpen(false)}
                  className="px-4 py-2 border border-black rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Add Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}



