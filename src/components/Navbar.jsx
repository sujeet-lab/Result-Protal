import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 shadow-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5.5 12 2l9 3.5-9 3.5L3 5.5Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 7.2v5.1c0 2.1 2.7 4.2 6 4.2s6-2.1 6-4.2V7.2"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 6v6"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-base font-bold tracking-wide sm:text-lg">
              RESULT PORTAL
            </h1>

            <p className="hidden text-[10px] text-slate-400 sm:block">
              Academic Result System
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">

          <Link
            to="/"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/search"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            Search Result
          </Link>

          <Link
            to="/admin/login"
            className="ml-2 rounded-lg border border-blue-400/50 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/30 transition hover:bg-blue-500 hover:shadow-lg"
          >
            Admin Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-slate-200 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/search"
              onClick={() => setIsMenuOpen(false)}
              className="mt-1 block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Search Result
            </Link>

            <Link
              to="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Admin Login
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;