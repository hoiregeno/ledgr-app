import { useState } from "react";
import { getData, addEntry, exportToCSV } from "../utils/storage";

function Expenses() {
  const [expenses, setExpenses] = useState(getData("expenses"));
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
  });
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredExpenses = expenses.filter(
    (item) => categoryFilter === "all" || item.category === categoryFilter,
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    if (!form.name || !form.amount || !form.date || !form.category) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newExpense = { id: Date.now(), ...form };
    addEntry("expenses", newExpense);
    setExpenses([...expenses, newExpense]);
    setForm({ name: "", amount: "", date: "", category: "" });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Expenses</h1>
        <p className="text-gray-400 text-sm mt-1">
          Track what you spend on the hustle
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Expense name"
            className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 w-full"
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount (K)"
            className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 w-full"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 w-full"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 w-full"
          >
            <option value="">Select category</option>
            <option value="Restock">Restock</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-fit transition-colors"
        >
          Add Expense
        </button>
      </div>

      <div className="flex gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2"
        >
          <option value="all">All Categories</option>
          <option value="Restock">Restock</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={() => exportToCSV(expenses, "expenses.csv")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Export CSV
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
                Amount
              </th>
              <th className="text-gray-400 text-sm px-4 py-3 text-left">
                Date
              </th>
              <th className="text-gray-400 text-sm px-4 py-3 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-b border-gray-800 last:border-0"
              >
                <td className="text-white text-sm px-4 py-3">{expense.name}</td>
                <td className="text-red-400 text-sm px-4 py-3">
                  K{expense.amount}
                </td>
                <td className="text-white text-sm px-4 py-3">{expense.date}</td>
                <td className="text-white text-sm px-4 py-3">
                  {expense.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
