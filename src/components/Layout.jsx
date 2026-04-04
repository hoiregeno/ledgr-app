import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const LINKS = [
  { id: 1, to: "dashboard", label: "Dashboard" },
  { id: 2, to: "sales", label: "Sales" },
  { id: 3, to: "expenses", label: "Expenses" },
  { id: 4, to: "debts", label: "Debts" },
  { id: 5, to: "inventory", label: "Inventory" },
];

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed lg:static inset-y-0 left-0 z-20 w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-6 gap-8 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-between">
          <h1 className="text-blue-500 text-2xl font-bold tracking-widest">
            LEDGR
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {LINKS.map(({ id, to, label }) => (
            <li key={id}>
              <NavLink
                to={`/${to}`}
                onClick={() => setIsOpen(false)}
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
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar — mobile only */}
        <header className="lg:hidden flex items-center px-4 py-3 bg-gray-900 border-b border-gray-800">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            ☰
          </button>
          <span className="ml-4 text-blue-500 font-bold tracking-widest">
            LEDGR
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
