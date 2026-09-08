import { useMemo, useState } from "react";

const results = [
  {
    id: 1,
    studentId: "STU001",
    name: "Sujit Sah",
    roll: "101",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
    percentage: 82,
    grade: "A",
    status: "Published",
  },
  {
    id: 2,
    studentId: "STU002",
    name: "Ram Kumar",
    roll: "102",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
    percentage: 74.8,
    grade: "B+",
    status: "Published",
  },
  {
    id: 3,
    studentId: "STU003",
    name: "Hari Prasad",
    roll: "103",
    semester: "4th Semester",
    program: "Bachelor of Computer Application",
    percentage: 68,
    grade: "B",
    status: "Pending",
  },
  {
    id: 4,
    studentId: "STU004",
    name: "Anita Sharma",
    roll: "104",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
    percentage: 70,
    grade: "B+",
    status: "Pending",
  },
  {
    id: 5,
    studentId: "STU005",
    name: "Ramesh Thapa",
    roll: "105",
    semester: "3rd Semester",
    program: "Bachelor of Computer Application",
    percentage: 67,
    grade: "B",
    status: "Pending",
  },
  {
    id: 6,
    studentId: "STU006",
    name: "Priya Rai",
    roll: "106",
    semester: "6th Semester",
    program: "Bachelor of Information Technology",
    percentage: 91,
    grade: "A+",
    status: "Published",
  },
];

const gradeList = ["A+", "A", "B+", "B", "C+", "C", "F"];

function Reports() {
  const [semester, setSemester] = useState("All");
  const [program, setProgram] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const semesterMatch =
        semester === "All" || result.semester === semester;

      const programMatch =
        program === "All" || result.program === program;

      const statusMatch =
        status === "All" || result.status === status;

      return semesterMatch && programMatch && statusMatch;
    });
  }, [semester, program, status]);

  const totalStudents = filteredResults.length;

  const passedStudents = filteredResults.filter(
    (result) => result.percentage >= 40
  ).length;

  const failedStudents = filteredResults.filter(
    (result) => result.percentage < 40
  ).length;

  const passPercentage =
    totalStudents > 0
      ? ((passedStudents / totalStudents) * 100).toFixed(1)
      : 0;

  const averagePercentage =
    totalStudents > 0
      ? (
          filteredResults.reduce(
            (total, result) => total + result.percentage,
            0
          ) / totalStudents
        ).toFixed(1)
      : 0;

  const highestPercentage =
    totalStudents > 0
      ? Math.max(...filteredResults.map((result) => result.percentage))
      : 0;

  const gradeDistribution = gradeList.map((grade) => ({
    grade,
    count: filteredResults.filter(
      (result) => result.grade === grade
    ).length,
  }));

  const semesterData = [
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
  ].map((sem) => {
    const data = filteredResults.filter(
      (result) => result.semester === sem
    );

    const average =
      data.length > 0
        ? (
            data.reduce(
              (sum, result) => sum + result.percentage,
              0
            ) / data.length
          ).toFixed(1)
        : 0;

    return {
      semester: sem,
      students: data.length,
      average,
    };
  });

  const programData = [
    "Bachelor of Information Technology",
    "Bachelor of Computer Application",
  ].map((programName) => {
    const data = filteredResults.filter(
      (result) => result.program === programName
    );

    const passed = data.filter(
      (result) => result.percentage >= 40
    ).length;

    const passRate =
      data.length > 0
        ? ((passed / data.length) * 100).toFixed(1)
        : 0;

    return {
      program: programName,
      students: data.length,
      passRate,
    };
  });

  const handlePrint = () => {
    window.print();
  };

  const clearFilters = () => {
    setSemester("All");
    setProgram("All");
    setStatus("All");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Analytics & Reports
          </p>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Result Reports
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Analyze student performance and examination results.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <span>🖨️</span>
          Print Report
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Report Filters
            </h2>
            <p className="text-sm text-slate-500">
              Filter the report by academic information.
            </p>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Semester */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Semester
            </label>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Semesters</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Program
            </label>

            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Programs</option>
              <option value="Bachelor of Information Technology">
                Bachelor of Information Technology
              </option>
              <option value="Bachelor of Computer Application">
                Bachelor of Computer Application
              </option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Result Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Results</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
            👨‍🎓
          </div>

          <p className="text-sm text-slate-500">
            Total Students
          </p>

          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            {totalStudents}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
            ✓
          </div>

          <p className="text-sm text-slate-500">
            Passed Students
          </p>

          <h3 className="mt-1 text-3xl font-bold text-emerald-600">
            {passedStudents}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl">
            ✕
          </div>

          <p className="text-sm text-slate-500">
            Failed Students
          </p>

          <h3 className="mt-1 text-3xl font-bold text-red-600">
            {failedStudents}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
            %
          </div>

          <p className="text-sm text-slate-500">
            Pass Percentage
          </p>

          <h3 className="mt-1 text-3xl font-bold text-violet-600">
            {passPercentage}%
          </h3>
        </div>

      </div>

      {/* Performance Summary */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Average */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Performance Summary
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-slate-500">
                  Average Percentage
                </span>

                <span className="font-semibold text-slate-900">
                  {averagePercentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${Math.min(
                      Number(averagePercentage),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-slate-500">
                  Pass Rate
                </span>

                <span className="font-semibold text-slate-900">
                  {passPercentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${Number(passPercentage)}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span className="text-sm text-slate-500">
                Highest Percentage
              </span>

              <span className="text-xl font-bold text-blue-600">
                {highestPercentage}%
              </span>
            </div>

          </div>
        </div>

        {/* Grade Distribution */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Grade Distribution
          </h2>

          <div className="mt-6 space-y-4">
            {gradeDistribution.map((item) => {
              const percentage =
                totalStudents > 0
                  ? (item.count / totalStudents) * 100
                  : 0;

              return (
                <div key={item.grade}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      {item.grade}
                    </span>

                    <span className="text-sm font-medium text-slate-600">
                      {item.count} student
                      {item.count !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Semester Report */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Semester-wise Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Student count and average percentage by semester.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Semester
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Students
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Average
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Performance
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {semesterData.map((item) => (
                <tr
                  key={item.semester}
                  className="hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.semester}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {item.students}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {item.average}%
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${Math.min(
                              Number(item.average),
                              100
                            )}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm text-slate-500">
                        {item.average}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Report */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Program-wise Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare results across different academic programs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

          {programData.map((item) => (
            <div
              key={item.program}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.program}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.students} student
                    {item.students !== 1 ? "s" : ""}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                  {item.passRate}%
                </span>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${item.passRate}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Pass rate
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Student Report */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Student Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Detailed result summary of filtered students.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Semester
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Program
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Percentage
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Grade
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredResults.map((result) => (
                <tr
                  key={result.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">
                      {result.name}
                    </div>

                    <div className="text-xs text-slate-500">
                      {result.studentId} • Roll {result.roll}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {result.semester}
                  </td>

                  <td className="max-w-[220px] px-6 py-4 text-sm text-slate-600">
                    {result.program}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900">
                      {result.percentage}%
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
                      {result.grade}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        result.status === "Published"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredResults.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No result found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredResults.length}
          </span>{" "}
          result
          {filteredResults.length !== 1 ? "s" : ""}
        </div>
      </div>

    </div>
  );
}

export default Reports;