import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12.5%",
      label: "from last month",
      icon: (
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
            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-3a4 4 0 100-8 4 4 0 000 8zm6-2a3 3 0 10-2.83-4M18 16a4 4 0 00-2-3.46"
          />
        </svg>
      ),
      color: "blue",
    },
    {
      title: "Total Subjects",
      value: "42",
      change: "+4",
      label: "new this semester",
      icon: (
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      color: "purple",
    },
    {
      title: "Published Results",
      value: "1,180",
      change: "94.5%",
      label: "of total students",
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "green",
    },
    {
      title: "Pending Results",
      value: "68",
      change: "5.5%",
      label: "awaiting publication",
      icon: (
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
            d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "orange",
    },
  ];

  const recentResults = [
    {
      id: "STU001",
      name: "Sujit Sah",
      roll: "101",
      semester: "5th",
      percentage: "85%",
      grade: "A",
      status: "Published",
    },
    {
      id: "STU002",
      name: "Ram Kumar",
      roll: "102",
      semester: "5th",
      percentage: "78%",
      grade: "B+",
      status: "Published",
    },
    {
      id: "STU003",
      name: "Hari Prasad",
      roll: "103",
      semester: "5th",
      percentage: "91%",
      grade: "A+",
      status: "Published",
    },
    {
      id: "STU004",
      name: "Anita Sharma",
      roll: "104",
      semester: "5th",
      percentage: "72%",
      grade: "B+",
      status: "Pending",
    },
    {
      id: "STU005",
      name: "Ramesh Thapa",
      roll: "105",
      semester: "5th",
      percentage: "67%",
      grade: "B",
      status: "Published",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Administration
            </p>

            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Welcome back, Admin. Here's what's happening today.
            </p>
          </div>

          <Link
            to="/admin/results"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>

            Add Result
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    stat.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : stat.color === "purple"
                      ? "bg-purple-50 text-purple-600"
                      : stat.color === "green"
                      ? "bg-green-50 text-green-600"
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  {stat.icon}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs">
                <span
                  className={`font-bold ${
                    stat.color === "orange"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {stat.change}
                </span>

                <span className="text-slate-400">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Recent Results */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Results
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest student result activities
                </p>
              </div>

              <Link
                to="/admin/results"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Student
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Roll
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Semester
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Result
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentResults.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                            {student.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {student.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {student.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {student.roll}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {student.semester}
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {student.percentage}
                          </p>

                          <p className="text-xs font-semibold text-blue-600">
                            Grade {student.grade}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            student.status === "Published"
                              ? "bg-green-50 text-green-600"
                              : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

            <h2 className="font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Frequently used admin actions
            </p>

            <div className="mt-5 space-y-3">

              <Link
                to="/admin/students"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
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
                      d="M18 20a6 6 0 00-12 0m6-10a4 4 0 100-8 4 4 0 000 8zm6 2a3 3 0 10-2.83-4"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Manage Students
                  </p>

                  <p className="text-xs text-slate-500">
                    Add or edit students
                  </p>
                </div>

                <span className="ml-auto text-slate-300 transition group-hover:text-blue-600">
                  →
                </span>
              </Link>

              <Link
                to="/admin/subjects"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-purple-200 hover:bg-purple-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white">
                  📚
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Manage Subjects
                  </p>

                  <p className="text-xs text-slate-500">
                    Add and update subjects
                  </p>
                </div>

                <span className="ml-auto text-slate-300 transition group-hover:text-purple-600">
                  →
                </span>
              </Link>

              <Link
                to="/admin/results"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-green-200 hover:bg-green-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white">
                  📋
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Manage Results
                  </p>

                  <p className="text-xs text-slate-500">
                    Enter student marks
                  </p>
                </div>

                <span className="ml-auto text-slate-300 transition group-hover:text-green-600">
                  →
                </span>
              </Link>

              <Link
                to="/admin/publish"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-orange-200 hover:bg-orange-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white">
                  🚀
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Publish Results
                  </p>

                  <p className="text-xs text-slate-500">
                    Publish pending results
                  </p>
                </div>

                <span className="ml-auto text-slate-300 transition group-hover:text-orange-600">
                  →
                </span>
              </Link>

            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Publication Progress */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Result Publication
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current semester progress
                </p>
              </div>

              <span className="text-xl font-extrabold text-blue-600">
                94.5%
              </span>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[94.5%] rounded-full bg-blue-600" />
            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>1,180 published</span>
              <span>68 remaining</span>
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              System Status
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-sm font-bold text-green-700">
                    Database
                  </span>
                </div>

                <p className="mt-2 text-xs text-green-600">
                  Operational
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-sm font-bold text-green-700">
                    Website
                  </span>
                </div>

                <p className="mt-2 text-xs text-green-600">
                  Operational
                </p>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;