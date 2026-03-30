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
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <nav className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-6 gap-8">
        <h1 className="text-blue-500 text-2xl font-bold tracking-widest">
          LEDGR
        </h1>
        <ul className="flex flex-col gap-2">
          {LINKS.map(({ id, to, label }) => (
            <li key={id}>
              <NavLink
                to={`/${to}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
