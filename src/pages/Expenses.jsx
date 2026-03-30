import { useState } from "react";
import { getData, addEntry } from "../utils/storage";

function Expenses() {
  const [expenses, setExpenses] = useState(getData("expenses"));
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    const newExpense = { id: Date.now(), ...form };
    addEntry("expenses", newExpense);
    setExpenses([...expenses, newExpense]);
    setForm({ name: "", amount: "", date: "", category: "" });
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
        <option value="Restock">Restock</option>
        <option value="Transport">Transport</option>
        <option value="Other">Other</option>
      </select>

      <button onClick={handleSubmit}>Add Expense</button>

      {/* Expense list */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>K{expense.amount}</td>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;
