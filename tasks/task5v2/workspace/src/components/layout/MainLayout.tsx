import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Asset Manager</h1>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-6 py-2.5 text-gray-600 hover:bg-gray-200 ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/assets"
            className={({ isActive }) =>
              `block px-6 py-2.5 text-gray-600 hover:bg-gray-200 ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            Assets
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `block px-6 py-2.5 text-gray-600 hover:bg-gray-200 ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            Employees
          </NavLink>
          <NavLink
            to="/assignments"
            className={({ isActive }) =>
              `block px-6 py-2.5 text-gray-600 hover:bg-gray-200 ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            Assignments
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
