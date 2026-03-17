import { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="bg-teal-950 min-h-screen">
      <nav className="py-4 px-6 bg-teal-900 border-b border-teal-800">
        <h1 className="text-2xl font-bold text-white">Ledgr</h1>
      </nav>
      <main></main>
    </div>
  );
}

export default App;
