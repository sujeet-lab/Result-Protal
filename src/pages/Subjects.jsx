import { useMemo, useState } from "react";

const initialSubjects = [
  {
    id: 1,
    code: "BIT501",
    name: "System Analysis and Design",
    fullMarks: 100,
    passMarks: 40,
    creditHours: 3,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 2,
    code: "BIT502",
    name: "Database Management System",
    fullMarks: 100,
    passMarks: 40,
    creditHours: 3,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 3,
    code: "BIT503",
    name: "Web Development",
    fullMarks: 100,
    passMarks: 40,
    creditHours: 3,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 4,
    code: "BIT504",
    name: "Computer Networks",
    fullMarks: 100,
    passMarks: 40,
    creditHours: 3,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 5,
    code: "BCA401",
    name: "Object Oriented Programming",
    fullMarks: 100,
    passMarks: 40,
    creditHours: 3,
    semester: "4th Semester",
    program: "Bachelor of Computer Application",
  },
  {
    id: 6,
    code: "BCA402",
    name: "Operating System",
    fullMarks: 100,
    passMarks: 40,
    creditHours: 3,
    semester: "4th Semester",
    program: "Bachelor of Computer Application",
  },
];

const emptyForm = {
  code: "",
  name: "",
  fullMarks: "100",
  passMarks: "40",
  creditHours: "3",
  semester: "5th Semester",
  program: "Bachelor of Information Technology",
};

function Subjects() {
  const [subjects, setSubjects] = useState(initialSubjects);

  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // Filter subjects
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        subject.code.toLowerCase().includes(searchText) ||
        subject.name.toLowerCase().includes(searchText);

      const matchesSemester =
        !semesterFilter || subject.semester === semesterFilter;

      const matchesProgram =
        !programFilter || subject.program === programFilter;

      return matchesSearch && matchesSemester && matchesProgram;
    });
  }, [subjects, search, semesterFilter, programFilter]);

  // Open Add Modal
  const handleAdd = () => {
    setEditingSubject(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (subject) => {
    setEditingSubject(subject);

    setFormData({
      code: subject.code,
      name: subject.name,
      fullMarks: String(subject.fullMarks),
      passMarks: String(subject.passMarks),
      creditHours: String(subject.creditHours),
      semester: subject.semester,
      program: subject.program,
    });

    setShowModal(true);
  };

  // Form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save subject
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.code.trim() ||
      !formData.name.trim() ||
      !formData.fullMarks ||
      !formData.passMarks ||
      !formData.creditHours
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (Number(formData.passMarks) > Number(formData.fullMarks)) {
      alert("Pass marks cannot be greater than full marks.");
      return;
    }

    if (editingSubject) {
      // Update
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === editingSubject.id
            ? {
                ...subject,
                ...formData,
                fullMarks: Number(formData.fullMarks),
                passMarks: Number(formData.passMarks),
                creditHours: Number(formData.creditHours),
              }
            : subject
        )
      );
    } else {
      // Add
      const newSubject = {
        id: Date.now(),
        ...formData,
        fullMarks: Number(formData.fullMarks),
        passMarks: Number(formData.passMarks),
        creditHours: Number(formData.creditHours),
      };

      setSubjects((prev) => [...prev, newSubject]);
    }

    setShowModal(false);
    setEditingSubject(null);
    setFormData(emptyForm);
  };

  // Delete subject
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    setSubjects((prev) =>
      prev.filter((subject) => subject.id !== id)
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setSemesterFilter("");
    setProgramFilter("");
  };

  const totalCredits = subjects.reduce(
    (total, subject) => total + Number(subject.creditHours),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Academic Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Subject Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage subjects, marks, credits and academic programs.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
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

          Add Subject
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Subjects
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {subjects.length}
              </h3>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              📚
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {filteredSubjects.length}
              </h3>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              ✓
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Programs
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {
                  new Set(
                    subjects.map((subject) => subject.program)
                  ).size
                }
              </h3>
            </div>

            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              🎓
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Credits
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {totalCredits}
              </h3>
            </div>

            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              ⭐
            </div>
          </div>
        </div>

      </div>

      {/* Search & Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          {/* Search */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search Subject
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
                placeholder="Search by subject code or name..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
              <option value="7th Semester">7th Semester</option>
              <option value="8th Semester">8th Semester</option>
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

        </div>

        {(search || semesterFilter || programFilter) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* Subject Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Subject List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredSubjects.length} subject
            {filteredSubjects.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredSubjects.length === 0 ? (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
              📚
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No subjects found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter options.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-[1100px] w-full text-left">

              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subject
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Program
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Semester
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Marks
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Credit
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredSubjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Subject */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                          {subject.code.substring(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {subject.name}
                          </p>

                          <p className="mt-1 text-xs font-medium text-blue-600">
                            {subject.code}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Program */}
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                        {subject.program.includes("Information")
                          ? "BIT"
                          : "BCA"}
                      </span>
                    </td>

                    {/* Semester */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {subject.semester}
                    </td>

                    {/* Marks */}
                    <td className="px-5 py-4">

                      <div className="text-sm">
                        <span className="font-semibold text-slate-900">
                          {subject.fullMarks}
                        </span>

                        <span className="mx-1 text-slate-400">
                          /
                        </span>

                        <span className="text-slate-500">
                          Pass {subject.passMarks}
                        </span>
                      </div>

                    </td>

                    {/* Credit */}
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-700">
                        {subject.creditHours}
                      </span>
                      <span className="ml-1 text-xs text-slate-400">
                        hrs
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => handleEdit(subject)}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(subject.id)}
                          className="rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingSubject
                    ? "Edit Subject"
                    : "Add New Subject"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the subject information below.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 sm:p-6"
            >

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Subject Code */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Subject Code *
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g. BIT506"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Subject Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Subject Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter subject name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Full Marks */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Marks *
                  </label>

                  <input
                    type="number"
                    name="fullMarks"
                    value={formData.fullMarks}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Pass Marks */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Pass Marks *
                  </label>

                  <input
                    type="number"
                    name="passMarks"
                    value={formData.passMarks}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Credit Hours */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Credit Hours *
                  </label>

                  <input
                    type="number"
                    name="creditHours"
                    value={formData.creditHours}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Semester */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Semester *
                  </label>

                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                {/* Program */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Program *
                  </label>

                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Bachelor of Information Technology">
                      Bachelor of Information Technology
                    </option>

                    <option value="Bachelor of Computer Application">
                      Bachelor of Computer Application
                    </option>
                  </select>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  {editingSubject
                    ? "Update Subject"
                    : "Save Subject"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Subjects;