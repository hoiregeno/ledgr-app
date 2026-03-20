import useTransactions from "../hooks/useTransactions";

function SummaryCards({ transactions }) {
  const {
    totalRevenue,
    totalExpense,
    totalDebt,
    totalRepaid,
    outstanding,
    netBalance,
  } = useTransactions(transactions);

  return <div>SummaryCards</div>;
}

export default SummaryCards;
