import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "Sujit Sah",
      roll: "101",
      email: "sujit@example.com",
      phone: "9800000001",
      program: "Bachelor of Information Technology",
      semester: "5th Semester",
    },
    {
      id: "STU002",
      name: "Ram Kumar",
      roll: "102",
      email: "ram@example.com",
      phone: "9800000002",
      program: "Bachelor of Information Technology",
      semester: "5th Semester",
    },
    {
      id: "STU003",
      name: "Hari Prasad",
      roll: "103",
      email: "hari@example.com",
      phone: "9800000003",
      program: "Bachelor of Computer Application",
      semester: "4th Semester",
    },
    {
      id: "STU004",
      name: "Anita Sharma",
      roll: "104",
      email: "anita@example.com",
      phone: "9800000004",
      program: "Bachelor of Information Technology",
      semester: "5th Semester",
    },
    {
      id: "STU005",
      name: "Ramesh Thapa",
      roll: "105",
      email: "ramesh@example.com",
      phone: "9800000005",
      program: "Bachelor of Computer Application",
      semester: "3rd Semester",
    },
    {
      id: "STU006",
      name: "Priya Rai",
      roll: "106",
      email: "priya@example.com",
      phone: "9800000006",
      program: "Bachelor of Information Technology",
      semester: "6th Semester",
    },
  ]);

  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("All Semesters");
  const [program, setProgram] = useState("All Programs");

  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    email: "",
    phone: "",
    program: "Bachelor of Information Technology",
    semester: "5th Semester",
  });

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchText) ||
        student.id.toLowerCase().includes(searchText) ||
        student.roll.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText);

      const matchesSemester =
        semester === "All Semesters" ||
        student.semester === semester;

      const matchesProgram =
        program === "All Programs" ||
        student.program === program;

      return (
        matchesSearch &&
        matchesSemester &&
        matchesProgram
      );
    });
  }, [students, search, semester, program]);

  // Open Add Modal
  const handleAddStudent = () => {
    setEditingStudent(null);

    setFormData({
      name: "",
      roll: "",
      email: "",
      phone: "",
      program: "Bachelor of Information Technology",
      semester: "5th Semester",
    });

    setShowModal(true);
  };

  // Open Edit Modal
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      roll: student.roll,
      email: student.email,
      phone: student.phone,
      program: student.program,
      semester: student.semester,
    });

    setShowModal(true);
  };

  // Form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save Student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingStudent) {
      setStudents(
        students.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                ...formData,
              }
            : student
        )
      );
    } else {
      const newStudent = {
        id: `STU${String(students.length + 1).padStart(3, "0")}`,
        ...formData,
      };

      setStudents([...students, newStudent]);
    }

    setShowModal(false);
  };

  // Delete Student
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  // Reset filters
  const clearFilters = () => {
    setSearch("");
    setSemester("All Semesters");
    setProgram("All Programs");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Page Container */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-600"
              >
                Dashboard
              </Link>

              <span>/</span>

              <span className="text-slate-800">
                Students
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Student Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage student information and academic details.
            </p>
          </div>

          <button
            onClick={handleAddStudent}
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

            Add Student
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Students
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {students.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Showing Students
            </p>

            <p className="mt-2 text-3xl font-extrabold text-blue-600">
              {filteredStudents.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Active Records
            </p>

            <p className="mt-2 text-3xl font-extrabold text-green-600">
              {students.length}
            </p>
          </div>

        </div>

        {/* Search & Filters */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

          <div className="grid gap-4 lg:grid-cols-4">

            {/* Search */}
            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Search Student
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
                    d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, ID, roll or email..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Semester */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Semester
              </label>

              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option>All Semesters</option>
                <option>1st Semester</option>
                <option>2nd Semester</option>
                <option>3rd Semester</option>
                <option>4th Semester</option>
                <option>5th Semester</option>
                <option>6th Semester</option>
                <option>7th Semester</option>
                <option>8th Semester</option>
              </select>
            </div>

            {/* Program */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Program
              </label>

              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option>All Programs</option>
                <option>
                  Bachelor of Information Technology
                </option>
                <option>
                  Bachelor of Computer Application
                </option>
              </select>
            </div>

          </div>

          {/* Clear */}
          {(search ||
            semester !== "All Semesters" ||
            program !== "All Programs") && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Student Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">

            <div>
              <h2 className="font-bold text-slate-900">
                All Students
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredStudents.length} student
                {filteredStudents.length !== 1 ? "s" : ""} found
              </p>
            </div>

          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px] text-left">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Roll No.
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Program
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Semester
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      {/* Student */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {student.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {student.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {student.id}
                            </p>

                            <p className="text-xs text-slate-400">
                              {student.email}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Roll */}
                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {student.roll}
                      </td>

                      {/* Program */}
                      <td className="max-w-[240px] px-5 py-4 text-sm text-slate-600">
                        {student.program}
                      </td>

                      {/* Semester */}
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                          {student.semester}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {student.phone}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">

                          {/* View */}
                          <Link
                            to={`/result/${student.id}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                            title="View Result"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                              />
                            </svg>
                          </Link>

                          {/* Edit */}
                          <button
                            onClick={() =>
                              handleEditStudent(student)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                            title="Edit"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 8.5-8.5z"
                              />
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDelete(student.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10"
                              />
                            </svg>
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto max-w-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <svg
                            className="h-7 w-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                            />
                          </svg>
                        </div>

                        <h3 className="mt-4 font-bold text-slate-800">
                          No students found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or filters.
                        </p>

                        <button
                          onClick={clearFilters}
                          className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Clear filters
                        </button>

                      </div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingStudent
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter the student's academic information.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                ✕
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Roll + Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Roll Number
                  </label>

                  <input
                    type="text"
                    name="roll"
                    value={formData.roll}
                    onChange={handleChange}
                    placeholder="e.g. 107"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Program + Semester */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Program
                  </label>

                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option>
                      Bachelor of Information Technology
                    </option>

                    <option>
                      Bachelor of Computer Application
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Semester
                  </label>

                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option>1st Semester</option>
                    <option>2nd Semester</option>
                    <option>3rd Semester</option>
                    <option>4th Semester</option>
                    <option>5th Semester</option>
                    <option>6th Semester</option>
                    <option>7th Semester</option>
                    <option>8th Semester</option>
                  </select>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  {editingStudent
                    ? "Update Student"
                    : "Add Student"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Students;