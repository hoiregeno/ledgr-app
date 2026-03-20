import { getData } from "../utils/storage";

function Dashboard() {
  const sales = getData("sales");
  const expenses = getData("expenses");
  const debts = getData("debts");
  const inventory = getData("inventory");

  const totalSales = sales.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const totalDebts = debts.reduce((acc, item) => acc + item.amount, 0);
  const totalInventory = inventory.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0,
  );

  const netProfit = totalSales - totalExpenses;

  const CARDS = [
    { id: 1, label: "Total Revenue", value: totalSales },
    { id: 2, label: "Total Expenses", value: totalExpenses },
    { id: 3, label: "Total Debts", value: totalDebts },
    { id: 4, label: "Inventory", value: totalInventory },
    { id: 5, label: "Net Profit", value: netProfit },
  ];

  return (
    <div>
      {CARDS.map(({ id, label, value }) => (
        <div key={id}>
          <h2>{label}</h2>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
