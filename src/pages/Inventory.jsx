import { useState } from "react";
import { getData, addEntry } from "../utils/storage";

function Inventory() {
  const [inventory, setInventory] = useState(getData("inventory"));
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unitPrice: "",
    category: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    const newInventory = { id: Date.now(), ...form };
    addEntry("inventory", newInventory);
    setInventory([...inventory, newInventory]);
    setForm({ name: "", quantity: "", unitPrice: "", category: "" });
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
        <div className="grid grid-cols-2 gap-4">
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

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-gray-400 text-sm px-4 py-3 text-left">
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
            {inventory.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-gray-800 last:border-0"
              >
                <td className="text-white text-sm px-4 py-3">{inv.name}</td>
                <td className="text-white text-sm px-4 py-3">{inv.quantity}</td>
                <td className="text-white text-sm px-4 py-3">
                  K{inv.unitPrice}
                </td>
                <td className="text-blue-400 text-sm px-4 py-3">
                  K{(inv.quantity * inv.unitPrice).toFixed(2)}
                </td>
                <td className="text-white text-sm px-4 py-3">{inv.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
