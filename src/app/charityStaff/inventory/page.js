"use client";

import { useState, useEffect } from "react";
import SidebarStaff from "../../components/SidebarStaff";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // View modal
  const [allocateItem, setAllocateItem] = useState(null); // Allocate modal
  const [editItem, setEditItem] = useState(null); // Edit modal
  const [addItemOpen, setAddItemOpen] = useState(false); // Add item modal

  
  const fetchInventory = async () => {
    try {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      setInventory(data);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  
  const handleAllocateSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const inventoryID = allocateItem.InventoryID;
  const recipient = formData.get("recipient");
  const quantity = parseInt(formData.get("quantity"));

  const staffId = typeof window !== "undefined"
    ? localStorage.getItem("userId")
    : null;

  try {
    const res = await fetch("/api/distribution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inventoryID,
        recipient,
        quantity,
        staffId,  
      }),
    });

    if (!res.ok) {
      console.error("Allocation failed");
      return;
    }

    await fetchInventory(); 
    setAllocateItem(null); 

  } catch (err) {
    console.error(err);
  }
};

  
  const handleAddItemSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const body = {
      Category: formData.get("category"),
      Condition: formData.get("condition"),
      Quantity: parseInt(formData.get("quantity")),
      Status: formData.get("status"),
    };

    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) return console.error("Add item failed");

      fetchInventory();
      setAddItemOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  
 const handleEditItemSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const body = {
    Category: formData.get("category"),
    Condition: formData.get("condition"),
    Quantity: parseInt(formData.get("quantity")),
    Status: formData.get("status"),
  };

  try {
    const res = await fetch(`/api/inventory/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editItem.InventoryID, ...body }),
    });

    if (!res.ok) {
      console.error("Edit failed");
      return;
    }

    fetchInventory(); 
    setEditItem(null); 
  } catch (err) {
    console.error(err);
  }
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

          <button
            onClick={() => setAddItemOpen(true)}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            + Add Item
          </button>
        </div>

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
  {inventory
    .filter((item) => item.Status !== "Out of Stock") // 🚀 FRONTEND FILTER
    .map((item) => (
      <tr key={item.InventoryID}>
        <td className="border border-black px-4 py-2">{item.InventoryID}</td>
        <td className="border border-black px-4 py-2">{item.Category}</td>
        <td className="border border-black px-4 py-2">{item.Condition}</td>
        <td className="border border-black px-4 py-2">{item.Quantity}</td>
        <td className="border border-black px-4 py-2">{item.Status}</td>
        <td className="border border-black px-4 py-2">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedItem(item)}
              className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
            >
              View
            </button>

            <button
              onClick={() => setEditItem(item)}
              className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
            >
              Edit
            </button>

            <button
              onClick={() => setAllocateItem(item)}
              className="px-3 py-1 border border-black rounded-md hover:bg-gray-200"
              disabled={item.Quantity <= 0}
            >
              Allocate
            </button>
          </div>
        </td>
      </tr>
    ))}

  {inventory.filter(item => item.Status !== "Out of Stock").length === 0 && (
    <tr>
      <td colSpan="6" className="text-center py-4">
        No Inventory Items Available
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </section>

      
      {selectedItem && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Inventory Item Details</h2>
            <p><strong>ID:</strong> {selectedItem.InventoryID}</p>
            <p><strong>Category:</strong> {selectedItem.Category}</p>
            <p><strong>Condition:</strong> {selectedItem.Condition}</p>
            <p><strong>Quantity:</strong> {selectedItem.Quantity}</p>
            <p><strong>Status:</strong> {selectedItem.Status}</p>
            <p><strong>Description:</strong> {selectedItem.donation.Description}</p>
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-6 px-6 py-2 border border-black rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      
{editItem && (
  <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
    <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Inventory Item</h2>
      <form onSubmit={handleEditItemSubmit}>
        <label className="block mb-1 font-semibold">Category</label>
        <input
          name="category"
          value={editItem.Category}
          onChange={(e) => setEditItem({ ...editItem, Category: e.target.value })}
          required
          className="w-full px-3 py-2 border border-black rounded-md"
        />

        <label className="block mt-4 mb-1 font-semibold">Condition</label>
        <select
          name="condition"
          value={editItem.Condition}
          onChange={(e) => setEditItem({ ...editItem, Condition: e.target.value })}
          required
          className="w-full px-3 py-2 border border-black rounded-md"
        >
          <option>New</option>
          <option>Good</option>
          <option>Used</option>
        </select>

        <label className="block mt-4 mb-1 font-semibold">Quantity</label>
        <input
          name="quantity"
          type="number"
          min="0"
          value={editItem.Quantity}
          onChange={(e) => setEditItem({ ...editItem, Quantity: Number(e.target.value) })}
          required
          className="w-full px-3 py-2 border border-black rounded-md"
        />

        <label className="block mt-4 mb-1 font-semibold">Status</label>
        <select
          name="status"
          value={editItem.Status}
          onChange={(e) => setEditItem({ ...editItem, Status: e.target.value })}
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
            onClick={() => setEditItem(null)}
            className="px-4 py-2 border border-black rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      
      {allocateItem && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Allocate Item</h2>
            <form onSubmit={handleAllocateSubmit}>
              <p><strong>Item:</strong> {allocateItem.Category} ({allocateItem.InventoryID})</p>
              <p><strong>Available:</strong> {allocateItem.Quantity}</p>

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
                max={allocateItem.Quantity}
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

     
      {addItemOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
          <div className="bg-white w-1/3 border-2 border-black rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add New Inventory Item</h2>
            <form onSubmit={handleAddItemSubmit}>
              <label className="block mb-1 font-semibold">Category</label>
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
