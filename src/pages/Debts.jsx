import { useState } from "react";
import { getData, addEntry, updateEntry } from "../utils/storage";

function Debts() {
  const [debts, setDebts] = useState(getData("debts"));
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    status: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    const newDebt = { id: Date.now(), ...form };
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

      <label>
        <input
          type="radio"
          name="status"
          value="settled"
          onChange={handleChange}
        />
        Settled
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value="unsettled"
          onChange={handleChange}
        />
        Unsettled
      </label>

      <button onClick={handleSubmit}>Add Debt</button>

      {/* Debt list */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td>{debt.name}</td>
              <td>K{debt.amount}</td>
              <td>{debt.date}</td>
              <td>
                <button onClick={() => handleToggle(debt.id)}>
                  {debt.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Debts;
