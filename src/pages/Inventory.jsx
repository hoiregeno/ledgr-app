import { useState } from "react";
import { getData, addEntry, exportToCSV } from "../utils/storage";

function Inventory() {
  const [inventory, setInventory] = useState(getData("inventory"));
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unitPrice: "",
    category: "",
  });
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredInventory = inventory.filter(
    (item) => categoryFilter === "all" || item.category === categoryFilter,
  );

  function handleSubmit() {
    if (!form.name || !form.quantity || !form.unitPrice || !form.category) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newInventory = {
      id: Date.now(),
      ...form,
      quantity: Number(form.quantity),
      unitPrice: Number(form.unitPrice),
    };

    addEntry("inventory", newInventory);
    setInventory([...inventory, newInventory]);
    setForm({ name: "", quantity: "", unitPrice: "", category: "" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Inventory</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your stock levels</p>
      </div>

      {/* Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Item name"
            className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 w-full"
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 w-full"
          />
          <input
            type="number"
            name="unitPrice"
            value={form.unitPrice}
            onChange={handleChange}
            placeholder="Unit Price (K)"
            className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 w-full"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 w-full"
          >
            <option value="">Select category</option>
            <option value="Betelnut">Betelnut</option>
            <option value="Cigarettes">Cigarettes</option>
            <option value="Sweets">Sweets</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-fit transition-colors"
        >
          Add Item
        </button>
      </div>

      {/* Filter options */}
      <div className="flex gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2"
        >
          <option value="all">All categories</option>
          <option value="Betelnut">Betelnut</option>
          <option value="Cigarettes">Cigarettes</option>
          <option value="Sweets">Sweets</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={() => exportToCSV(inventory, "inventory.csv")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
        {filteredInventory.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No inventory entries yet.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-gray-400 text-sm px-4 py-3 text-left capitalize">
                  Name
                </th>
                <th className="text-gray-400 text-sm px-4 py-3 text-left">
                  Quantity
                </th>
                <th className="text-gray-400 text-sm px-4 py-3 text-left">
                  Unit Price
                </th>
                <th className="text-gray-400 text-sm px-4 py-3 text-left">
                  Total Value
                </th>
                <th className="text-gray-400 text-sm px-4 py-3 text-left">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-gray-800 last:border-0"
                >
                  <td className="text-white text-sm px-4 py-3 capitalize">
                    {inv.name}
                  </td>
                  <td className="text-white text-sm px-4 py-3">
                    {Math.floor(inv.quantity)}
                  </td>
                  <td className="text-white text-sm px-4 py-3">
                    K{inv.unitPrice.toFixed(2)}
                  </td>
                  <td className="text-blue-400 text-sm px-4 py-3">
                    K{(inv.quantity * inv.unitPrice).toFixed(2)}
                  </td>
                  <td className="text-white text-sm px-4 py-3">
                    {inv.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Inventory;
