function LedgerTable({ transactions }) {
  return (
    <div className="bg-teal-800 rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-teal-700">
            <th className="text-left p-4 text-sm text-teal-400">Date</th>
            <th className="text-left p-4 text-sm text-teal-400">Type</th>
            <th className="text-left p-4 text-sm text-teal-400">Descripton</th>
            <th className="text-left p-4 text-sm text-teal-400">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-teal-700">
              <td className="p-4 text-sm text-white">{t.date}</td>
              <td className="p-4 text-sm text-white">{t.type}</td>
              <td className="p-4 text-sm text-white">{t.description}</td>
              <td className="p-4 text-sm text-white">{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LedgerTable;
