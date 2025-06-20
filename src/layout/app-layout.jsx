import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Home" },
  { path: "/setting", label: "Settings" },
];

function AppLayout({ children, title = "Dashboard" }) {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-white">
      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-blue-800 shadow-lg transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block`}
      >
        <div className="p-4 text-xl font-bold border-b border-blue-700 flex justify-between items-center">
          <span>{title}</span>
          <button
            onClick={toggleDarkMode}
            className="text-white hidden lg:block"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="md:hidden bg-blue-800 p-4 flex justify-between items-center shadow-lg">
          <span className="font-bold text-lg">{title}</span>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="text-white">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <main className="p-6 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
