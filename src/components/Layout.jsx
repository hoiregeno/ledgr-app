import { NavLink, Outlet } from "react-router-dom";

const LINKS = [
  { id: 1, to: "dashboard", label: "Dashboard" },
  { id: 2, to: "sales", label: "Sales" },
  { id: 3, to: "expenses", label: "Expenses" },
  { id: 4, to: "debts", label: "Debts" },
  { id: 5, to: "inventory", label: "Inventory" },
];

function Layout() {
  return (
    <div>
      <nav>
        <h1>Ledgr</h1>
        <ul>
          {LINKS.map(({ id, to, label }) => (
            <li key={id}>
              <NavLink to={`/${to}`}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
