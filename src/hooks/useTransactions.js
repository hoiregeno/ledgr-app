function useTransactions(transactions) {
  const totalRevenue = transactions
    .filter((t) => t.type === "revenue")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDebt = transactions
    .filter((t) => t.type === "debt")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalRepaid = transactions
    .filter((t) => t.type === "debt_repaid")
    .reduce((acc, t) => acc + t.amount, 0);

  const outstanding = totalDebt - totalRepaid;
  const netBalance = totalRevenue - totalExpense;

  return {
    totalRevenue,
    totalExpense,
    outstanding,
    netBalance,
  };
}

export default useTransactions;
