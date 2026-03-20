import { useEffect, useState } from "react";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data) => {
    setTransactions((t) => {
      // Spread the incoming data into the new object
      const newTransaction = { id: crypto.randomUUID(), ...data };

      // Return a NEW ARRAY with newTransaction at the front
      return [newTransaction, ...t];
    });
  };

  const editTransaction = (id, data) => {
    setTransactions((t) =>
      // Loop through every transaction. If it's the one I'm looking for, replace it with updated data. Otherwise leave it alone.
      t.map((transaction) =>
        transaction.id === id ? { ...transaction, ...data } : transaction,
      ),
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((t) => t.filter((transaction) => transaction.id !== id));
  };

  return { transactions, addTransaction, editTransaction, deleteTransaction };
};
