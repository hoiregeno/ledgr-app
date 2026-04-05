import { useState } from "react";
import { addEntry, getData, updateEntry, exportToCSV } from "../utils/storage";

function Sales() {
  const [sales, setSales] = useState(getData("sales"));
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
    status: "",
  });
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSales = sales.filter(
    (item) =>
      (categoryFilter === "all" || item.category === categoryFilter) &&
      (statusFilter === "all" || item.status === statusFilter),
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    if (
      !form.name ||
      !form.amount ||
      !form.date ||
      !form.category ||
      !form.status
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newSale = {
      id: Date.now(),
      ...form,
      name: form.name.trim(),
      amount: Number(form.amount),
    };

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
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Sales</h1>
        <p className="text-gray-400 text-sm mt-1">Track your sales entries</p>
      </div>

      {/* Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Customer name"
            className="bg-gray-800 text-white border border-transparent focus:border-gray-500 placeholder-gray-500 rounded-lg px-4 py-2 w-full outline-hidden"
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount (K)"
            className="bg-gray-800 text-white border border-transparent focus:border-gray-500 placeholder-gray-500 rounded-lg px-4 py-2 w-full outline-hidden"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-transparent focus:border-gray-500 rounded-lg px-4 py-2 w-full outline-hidden"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 w-full outline-hidden"
          >
            <option value="">Select category</option>
            <option value="Betelnut">Betelnut</option>
            <option value="Cigarettes">Cigarettes</option>
            <option value="Sweets">Sweets</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Radio buttons */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <input
              type="radio"
              name="status"
              value="paid"
              onChange={handleChange}
            />
            Paid
          </label>
          <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <input
              type="radio"
              name="status"
              value="unpaid"
              onChange={handleChange}
            />
            Unpaid
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-fit transition-colors"
        >
          Add Sale
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-hidden"
        >
          <option value="all">All Categories</option>
          <option value="Betelnut">Betelnut</option>
          <option value="Cigarettes">Cigarettes</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-hidden"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <button
          onClick={() => exportToCSV(sales, "sales.csv")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
        {filteredSales.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No sales entries yet.
          </p>
        ) : (
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
                <th className="text-gray-400 text-sm px-4 py-3 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b border-gray-800 last:border-0"
                >
                  <td className="text-white text-sm px-4 py-3 capitalize">
                    {sale.name}
                  </td>
                  <td className="text-white text-sm px-4 py-3">
                    K{sale.amount.toFixed(2)}
                  </td>
                  <td className="text-white text-sm px-4 py-3">{sale.date}</td>
                  <td className="text-white text-sm px-4 py-3">
                    {sale.category}
                  </td>
                  <td className="text-sm px-4 py-3">
                    <button
                      onClick={() => handleToggle(sale.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        sale.status === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {sale.status}
                    </button>
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

export default Sales;
