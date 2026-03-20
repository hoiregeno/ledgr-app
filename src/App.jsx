import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Debts from "./pages/Debts";
import Expenses from "./pages/Expenses";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/debt" element={<Debts />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </div>
  );
}

export default App;
