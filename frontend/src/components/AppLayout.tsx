import { NavLink, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <aside className="border-b border-slate-200 bg-white p-4 md:min-h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
            T
          </div>
          <div>
            <h1 className="font-bold tracking-tight">TeamFlow</h1>
            <p className="text-xs text-slate-500">Team workspace</p>
          </div>
        </div>

        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          <NavLink to="/projects" end className={navClass}>
            Projects
          </NavLink>
          <NavLink to="/projects/new" className={navClass}>
            Create project
          </NavLink>
        </nav>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Signed in as
          </p>
          <p className="truncate px-3 text-sm font-semibold">
            {user?.name ?? "User"}
          </p>
          <p className="mb-4 truncate px-3 text-xs text-slate-500">
            {user?.email}
          </p>

          <Button variant="secondary" className="w-full" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <p className="text-sm text-slate-500">Your workspace</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
