import { useState } from "react";
import { addEntry, getData, updateEntry } from "../utils/storage";

function Sales() {
  const [sales, setSales] = useState(getData("sales"));
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
    status: "",
  });

  // Updates the form state as the user types
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Creates a new entry and saves it to localStorage
  function handleSubmit() {
    const newSale = { id: Date.now(), ...form };
    addEntry("sales", newSale);
    setSales([...sales, newSale]);
    setForm({ name: "", amount: "", date: "", category: "", status: "" });
  }

  function handleToggle(id) {
    const current = sales.find((item) => item.id === id);
    const newStatus = current.status === "paid" ? "unpaid" : "paid";

    updateEntry("sales", id, { status: newStatus });
    setSales(
      sales.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
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
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select category</option>
        <option value="Betelnut">Betelnut</option>
        <option value="Cigarettes">Cigarettes</option>
        <option value="Other">Other</option>
      </select>

      <label>
        <input
          type="radio"
          name="status"
          value="paid"
          onChange={handleChange}
        />
        Paid
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value="unpaid"
          onChange={handleChange}
        />
        Unpaid
      </label>

      <button onClick={handleSubmit}>Add Sale</button>

      {/* Sales list */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.name}</td>
              <td>K{sale.amount}</td>
              <td>{sale.date}</td>
              <td>{sale.category}</td>
              <td>
                <button onClick={() => handleToggle(sale.id)}>
                  {sale.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
