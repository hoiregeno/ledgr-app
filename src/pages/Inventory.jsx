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
    setForm({ name: "", quantity: "", category: "", unitPrice: "" });
  }

  return (
    <div>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Customer name"
      />
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <input
        type="number"
        name="unitPrice"
        value={form.unitPrice}
        onChange={handleChange}
        placeholder="Unit Price"
      />

      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select category</option>
        <option value="Betelnut">Betelnut</option>
        <option value="Cigarettes">Cigarettes</option>
        <option value="Sweets">Sweets</option>
        <option value="Other">Other</option>
      </select>

      <button onClick={handleSubmit}>Add Inventory</button>

      {/* Inventory list */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.name}</td>
              <td>{inv.quantity}</td>
              <td>K{inv.unitPrice}</td>
              <td>{inv.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
