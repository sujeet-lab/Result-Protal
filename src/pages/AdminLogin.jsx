import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("adminLoggedIn") === "true";

    if (isLoggedIn) {
      navigate("/admin/dashboard", {
        replace: true,
      });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Demo login
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");

      if (rememberMe) {
        localStorage.setItem("adminRememberMe", "true");
      } else {
        localStorage.removeItem("adminRememberMe");
      }

      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
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
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l6.16-3.42A12.083 12.083 0 0118 16.5c-3.314 1.657-8.686 1.657-12 0a12.083 12.083 0 01-.16-5.92L12 14z"
                  />
                </svg>
              </div>

              <span className="text-xl font-bold">
                Result Portal
              </span>
            </div>

            <div className="mt-20">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-200">
                Administration
              </p>

              <h1 className="text-4xl font-extrabold leading-tight">
                Manage student
                <br />
                results easily.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-blue-100">
                Access the administration panel to manage students,
                subjects, results and publish academic results securely.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-3 text-sm text-blue-100">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            Secure Admin Access
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-10 lg:p-12">

          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
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
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
              </svg>
            </div>

            <span className="text-xl font-bold text-slate-900">
              Result Portal
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              ADMIN PANEL
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Welcome back 👋
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Login to access your administration dashboard.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M10.29 3.86l-7.82 14a2 2 0 001.74 3h15.58a2 2 0 001.74-3l-7.82-14a2 2 0 00-3.42 0z"
                />
              </svg>

              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-4 8"
                  />
                </svg>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11V7a3 3 0 00-6 0v4m-2 0h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                  />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between gap-4">

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>

            </div>

            {/* Login */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
            >
              Login to Dashboard

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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Demo Credentials
            </p>

            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>
                Email:{" "}
                <span className="font-semibold text-slate-800">
                  admin@example.com
                </span>
              </p>

              <p>
                Password:{" "}
                <span className="font-semibold text-slate-800">
                  admin123
                </span>
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              ← Back to Result Portal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;