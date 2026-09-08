import { useMemo, useState } from "react";

const initialResults = [
  {
    id: 1,
    studentId: "STU001",
    name: "Sujit Sah",
    roll: "101",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
    obtained: 410,
    fullMarks: 500,
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
    obtained: 374,
    fullMarks: 500,
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
    obtained: 68,
    fullMarks: 100,
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
    obtained: 350,
    fullMarks: 500,
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
    obtained: 335,
    fullMarks: 500,
    percentage: 67,
    grade: "B",
    status: "Pending",
  },
];

function PublishResults() {
  const [results, setResults] = useState(initialResults);

  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");

  const [selectedIds, setSelectedIds] = useState([]);

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        result.name.toLowerCase().includes(searchText) ||
        result.studentId.toLowerCase().includes(searchText) ||
        result.roll.toLowerCase().includes(searchText);

      const matchesSemester =
        !semesterFilter ||
        result.semester === semesterFilter;

      const matchesProgram =
        !programFilter ||
        result.program === programFilter;

      const matchesStatus =
        !statusFilter ||
        result.status === statusFilter;

      return (
        matchesSearch &&
        matchesSemester &&
        matchesProgram &&
        matchesStatus
      );
    });
  }, [
    results,
    search,
    semesterFilter,
    programFilter,
    statusFilter,
  ]);

  const pendingCount = results.filter(
    (result) => result.status === "Pending"
  ).length;

  const publishedCount = results.filter(
    (result) => result.status === "Published"
  ).length;

  const totalCount = results.length;

  const publicationProgress =
    totalCount > 0
      ? ((publishedCount / totalCount) * 100).toFixed(1)
      : 0;

  const allFilteredSelected =
    filteredResults.length > 0 &&
    filteredResults.every((result) =>
      selectedIds.includes(result.id)
    );

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const filteredIds = filteredResults.map(
      (result) => result.id
    );

    if (allFilteredSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !filteredIds.includes(id))
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...filteredIds]),
      ]);
    }
  };

  const publishSelected = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one result.");
      return;
    }

    const confirmed = window.confirm(
      `Publish ${selectedIds.length} selected result(s)?`
    );

    if (!confirmed) return;

    setResults((prev) =>
      prev.map((result) =>
        selectedIds.includes(result.id)
          ? {
              ...result,
              status: "Published",
            }
          : result
      )
    );

    setSelectedIds([]);
  };

  const unpublishSelected = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one result.");
      return;
    }

    const confirmed = window.confirm(
      `Move ${selectedIds.length} selected result(s) back to Pending?`
    );

    if (!confirmed) return;

    setResults((prev) =>
      prev.map((result) =>
        selectedIds.includes(result.id)
          ? {
              ...result,
              status: "Pending",
            }
          : result
      )
    );

    setSelectedIds([]);
  };

  const publishSingle = (id) => {
    const confirmed = window.confirm(
      "Publish this result?"
    );

    if (!confirmed) return;

    setResults((prev) =>
      prev.map((result) =>
        result.id === id
          ? {
              ...result,
              status: "Published",
            }
          : result
      )
    );

    setSelectedIds((prev) =>
      prev.filter((item) => item !== id)
    );
  };

  const unpublishSingle = (id) => {
    const confirmed = window.confirm(
      "Move this result back to Pending?"
    );

    if (!confirmed) return;

    setResults((prev) =>
      prev.map((result) =>
        result.id === id
          ? {
              ...result,
              status: "Pending",
            }
          : result
      )
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSemesterFilter("");
    setProgramFilter("");
    setStatusFilter("");
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm font-medium text-blue-600">
            Examination Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Publish Results
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review and publish student examination results.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={publishSelected}
            disabled={selectedIds.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✓ Publish Selected
          </button>

          <button
            onClick={unpublishSelected}
            disabled={selectedIds.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ↩ Unpublish
          </button>

        </div>

      </div>

      {/* Information Banner */}
      <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

        <div className="flex gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            ℹ
          </div>

          <div>
            <h3 className="font-semibold text-blue-900">
              Before publishing
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-700">
              Please review student marks, percentage and
              grades carefully. Published results will be
              available to students through the public Result
              Portal.
            </p>
          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Results
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            All examination results
          </p>

        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-500">
            {pendingCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Waiting for publication
          </p>

        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Published
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {publishedCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Available to students
          </p>

        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Publication Progress
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {publicationProgress}%
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${publicationProgress}%`,
              }}
            />
          </div>

        </div>

      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

          {/* Search */}
          <div className="lg:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search Student
            </label>

            <div className="relative">

              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, Student ID or Roll No..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* Semester */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Semester
            </label>

            <select
              value={semesterFilter}
              onChange={(e) =>
                setSemesterFilter(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All Semesters</option>
              <option>3rd Semester</option>
              <option>4th Semester</option>
              <option>5th Semester</option>
              <option>6th Semester</option>
            </select>

          </div>

          {/* Program */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Program
            </label>

            <select
              value={programFilter}
              onChange={(e) =>
                setProgramFilter(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All Programs</option>

              <option value="Bachelor of Information Technology">
                BIT
              </option>

              <option value="Bachelor of Computer Application">
                BCA
              </option>
            </select>

          </div>

          {/* Status */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Published">Published</option>
            </select>

          </div>

        </div>

        {(search ||
          semesterFilter ||
          programFilter ||
          statusFilter) && (
          <div className="mt-4 flex justify-end">

            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>

      {/* Selection Bar */}
      {selectedIds.length > 0 && (
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm font-medium text-blue-800">
            {selectedIds.length} result
            {selectedIds.length !== 1 ? "s" : ""} selected
          </p>

          <div className="flex gap-2">

            <button
              onClick={publishSelected}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Publish
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Clear Selection
            </button>

          </div>

        </div>
      )}

      {/* Results Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <h2 className="font-semibold text-slate-900">
            Results for Publication
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredResults.length} result
            {filteredResults.length !== 1 ? "s" : ""} found
          </p>

        </div>

        {filteredResults.length === 0 ? (

          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">
              ✓
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No results require action
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no results matching the selected filters.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-[1100px] w-full text-left">

              <thead className="bg-slate-50">

                <tr>

                  <th className="w-12 px-5 py-4">

                    <input
                      type="checkbox"
                      checked={allFilteredSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Semester
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Marks
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Percentage
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Grade
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredResults.map((result) => (

                  <tr
                    key={result.id}
                    className={`transition hover:bg-slate-50 ${
                      selectedIds.includes(result.id)
                        ? "bg-blue-50/50"
                        : ""
                    }`}
                  >

                    {/* Checkbox */}
                    <td className="px-5 py-4">

                      <input
                        type="checkbox"
                        checked={selectedIds.includes(
                          result.id
                        )}
                        onChange={() =>
                          toggleSelection(result.id)
                        }
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />

                    </td>

                    {/* Student */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                          {result.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {result.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {result.studentId} • Roll{" "}
                            {result.roll}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Semester */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {result.semester}
                    </td>

                    {/* Marks */}
                    <td className="px-5 py-4">

                      <span className="font-semibold text-slate-900">
                        {result.obtained}
                      </span>

                      <span className="text-slate-400">
                        {" "}
                        / {result.fullMarks}
                      </span>

                    </td>

                    {/* Percentage */}
                    <td className="px-5 py-4">

                      <span className="font-semibold text-slate-900">
                        {result.percentage}%
                      </span>

                    </td>

                    {/* Grade */}
                    <td className="px-5 py-4">

                      <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-600">
                        {result.grade}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          result.status === "Published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {result.status}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end">

                        {result.status === "Pending" ? (

                          <button
                            onClick={() =>
                              publishSingle(result.id)
                            }
                            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                          >
                            Publish
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              unpublishSingle(result.id)
                            }
                            className="rounded-lg border border-orange-200 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50"
                          >
                            Unpublish
                          </button>

                        )}

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default PublishResults;