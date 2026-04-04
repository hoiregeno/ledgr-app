import { useState } from "react";
import { getData, addEntry, updateEntry, exportToCSV } from "../utils/storage";

function Debts() {
  const [debts, setDebts] = useState(getData("debts"));
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    status: "",
  });

  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDebts = debts.filter(
    (item) => statusFilter === "all" || item.status === statusFilter,
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    if (!form.name || !form.amount || !form.date || !form.status) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    const newDebt = { id: Date.now(), ...form, amount: Number(form.amount) };
    addEntry("debts", newDebt);
    setDebts([...debts, newDebt]);
    setForm({ name: "", amount: "", date: "", status: "" });
  }

  function handleToggle(id) {
    const current = debts.find((item) => item.id === id);
    const newStatus = current.status === "settled" ? "unsettled" : "settled";
    updateEntry("debts", id, { status: newStatus });
    setDebts(
      debts.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Debts</h1>
        <p className="text-gray-400 text-sm mt-1">Track who owes you money</p>
      </div>

      {/* Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Person's name"
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
        </div>

        {/* Radio buttons */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <input
              type="radio"
              name="status"
              value="settled"
              onChange={handleChange}
            />
            Settled
          </label>
          <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
            <input
              type="radio"
              name="status"
              value="unsettled"
              onChange={handleChange}
            />
            Unsettled
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-fit transition-colors"
        >
          Add Debt
        </button>
      </div>

      <div className="flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2"
        >
          <option value="all">Select status</option>
          <option value="settled">settled</option>
          <option value="unsettled">unsettled</option>
        </select>

        <button
          onClick={() => exportToCSV(debts, "debts.csv")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {filteredDebts.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No debts entries yet.
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDebts.map((debt) => (
                <tr
                  key={debt.id}
                  className="border-b border-gray-800 last:border-0"
                >
                  <td className="text-white text-sm px-4 py-3 capitalize">
                    {debt.name}
                  </td>
                  <td className="text-yellow-400 text-sm px-4 py-3">
                    K{debt.amount.toFixed(2)}
                  </td>
                  <td className="text-white text-sm px-4 py-3">{debt.date}</td>
                  <td className="text-sm px-4 py-3">
                    <button
                      onClick={() => handleToggle(debt.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        debt.status === "settled"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {debt.status}
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

export default Debts;
