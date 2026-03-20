import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Debts, Expenses, Inventory, Sales } from "./pages/index";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="debts" element={<Debts />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="sales" element={<Sales />} />
      </Route>
    </Routes>
  );
}

export default App;
