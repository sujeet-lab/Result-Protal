import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Area */}
      <div className="lg:pl-72">

        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              🎓
            </div>

            <span className="font-bold text-slate-900">
              Result Portal
            </span>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
            A
          </div>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:flex">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Admin Panel
            </p>
          </div>

          <div className="flex items-center gap-5">

            {/* Notification */}
            <button className="relative rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                A
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Administrator
                </p>

                <p className="text-xs text-slate-400">
                  Super Admin
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;