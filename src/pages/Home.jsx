import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!studentId.trim()) {
      alert("Please enter your Student ID");
      return;
    }

    navigate(`/search?studentId=${studentId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-slate-900">

        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-800" />

          {/* Decorative circles */}
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">

          <div className="w-full max-w-3xl text-center">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Academic Result Portal
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to{" "}
              <span className="text-blue-400">
                Result Portal
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Check your academic results online quickly, easily,
              and securely from anywhere.
            </p>

            {/* Search Card */}
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-white p-5 shadow-2xl sm:p-7">

              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Search Your Result
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter your Student ID to view your result
                </p>
              </div>

              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-3 sm:flex-row"
              >

                {/* Student ID */}
                <div className="relative flex-1">

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="h-5 w-5 text-slate-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h.01M9 9h.01M9 13h6m-7.5 4h9A2.5 2.5 0 0 0 19 14.5v-5A2.5 2.5 0 0 0 16.5 7h-9A2.5 2.5 0 0 0 5 9.5v5A2.5 2.5 0 0 0 7.5 17Z"
                      />
                    </svg>
                  </div>

                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter Student ID"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                    />
                  </svg>

                  Search Result

                </button>

              </form>
            </div>

          </div>
        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="mx-auto mb-10 max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Simple & Convenient
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything You Need
            </h2>

            <p className="mt-3 text-slate-600">
              Access your academic results with just a few clicks.
            </p>

          </div>


          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                  />
                </svg>

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Easy Search
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Search your academic result quickly using your
                unique Student ID.
              </p>

            </div>


            {/* Card 2 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19V9m5 10V5m5 14v-7m5 7V3"
                  />
                </svg>

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Detailed Result
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                View subject-wise marks, grades, percentage,
                and overall performance.
              </p>

            </div>


            {/* Card 3 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6v-7Z"
                  />
                </svg>

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Print Result
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Easily print or save your academic result
                for official use.
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-12 text-center shadow-xl sm:px-12">

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Check Your Result?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Enter your Student ID and access your latest
            academic result instantly.
          </p>

          <button
            onClick={() => {
              document
                .querySelector("input")
                ?.focus();
            }}
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
          >
            Search My Result
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
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
              </svg>

            </div>

            <span className="text-sm font-bold text-slate-800">
              RESULT PORTAL
            </span>

          </div>

          <p className="text-center text-xs text-slate-500">
            © 2026 Result Portal. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;