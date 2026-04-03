import { getData, resetData } from "../utils/storage";

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
    {
      id: 1,
      label: "Total Revenue",
      value: totalSales,
      color: "text-green-400",
    },
    {
      id: 2,
      label: "Total Expenses",
      value: totalExpenses,
      color: "text-red-400",
    },
    {
      id: 3,
      label: "Total Debts",
      value: totalDebts,
      color: "text-yellow-400",
    },
    {
      id: 4,
      label: "Stock Value",
      value: totalInventory,
      color: "text-blue-400",
    },
    {
      id: 5,
      label: "Net Profit",
      value: netProfit,
      color: netProfit >= 0 ? "text-green-400" : "text-red-400",
    },
  ];

  return (
    <div className="flex flex-col gap-8 min-h-full justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Your hustle at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-auto">
        {CARDS.map(({ id, label, value, color }) => (
          <div
            key={id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-2"
          >
            <span className="text-gray-400 text-sm">{label}</span>
            <span className={`text-2xl font-bold ${color}`}>
              K{Number(value).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t-2 border-dashed border-t-gray-600">
        <button
          onClick={resetData}
          className=" text-gray-600 hover:text-red-400 text-sm transition-colors"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
