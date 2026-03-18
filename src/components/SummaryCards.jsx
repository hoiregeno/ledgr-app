import useTransactions from "../hooks/useTransactions";

function SummaryCards({ transactions }) {
  const { totalRevenue, totalExpense, outstanding, netBalance } =
    useTransactions(transactions);

  const cards = [
    { label: "Total Revenue", value: totalRevenue },
    { label: "Total Expense", value: totalExpense },
    { label: "Outstanding", value: outstanding },
    { label: "Net Balance", value: netBalance },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-teal-900 p-4 rounded-xl">
          <p className="text-sm text-teal-400">{card.label}</p>
          <p className="text-2xl font-bold text-white">K{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
