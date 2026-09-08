import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const students = [
  {
    id: "STU001",
    name: "Sujit Sah",
    roll: "101",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: "STU002",
    name: "Ram Kumar",
    roll: "102",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: "STU003",
    name: "Hari Prasad",
    roll: "103",
    semester: "4th Semester",
    program: "Bachelor of Computer Application",
  },
  {
    id: "STU004",
    name: "Anita Sharma",
    roll: "104",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: "STU005",
    name: "Ramesh Thapa",
    roll: "105",
    semester: "3rd Semester",
    program: "Bachelor of Computer Application",
  },
];

const subjects = [
  {
    id: 1,
    code: "BIT501",
    name: "System Analysis and Design",
    fullMarks: 100,
    passMarks: 40,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 2,
    code: "BIT502",
    name: "Database Management System",
    fullMarks: 100,
    passMarks: 40,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 3,
    code: "BIT503",
    name: "Web Development",
    fullMarks: 100,
    passMarks: 40,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 4,
    code: "BIT504",
    name: "Computer Networks",
    fullMarks: 100,
    passMarks: 40,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 5,
    code: "BIT505",
    name: "Software Engineering",
    fullMarks: 100,
    passMarks: 40,
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: 6,
    code: "BCA401",
    name: "Object Oriented Programming",
    fullMarks: 100,
    passMarks: 40,
    semester: "4th Semester",
    program: "Bachelor of Computer Application",
  },
];

const initialResults = [
  {
    id: 1,
    studentId: "STU001",
    marks: {
      BIT501: 85,
      BIT502: 78,
      BIT503: 90,
      BIT504: 82,
      BIT505: 75,
    },
    status: "Published",
  },
  {
    id: 2,
    studentId: "STU002",
    marks: {
      BIT501: 75,
      BIT502: 72,
      BIT503: 80,
      BIT504: 77,
      BIT505: 70,
    },
    status: "Published",
  },
  {
    id: 3,
    studentId: "STU003",
    marks: {
      BCA401: 68,
    },
    status: "Pending",
  },
  {
    id: 4,
    studentId: "STU004",
    marks: {
      BIT501: 70,
      BIT502: 65,
      BIT503: 75,
      BIT504: 72,
      BIT505: 68,
    },
    status: "Pending",
  },
];

const getGrade = (percentage) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C+";
  if (percentage >= 40) return "C";
  return "F";
};

const getResultInfo = (result) => {
  const student = students.find(
    (item) => item.id === result.studentId
  );

  const studentSubjects = subjects.filter(
    (subject) =>
      subject.semester === student?.semester &&
      subject.program === student?.program
  );

  const selectedSubjects = studentSubjects.filter(
    (subject) => result.marks[subject.code] !== undefined
  );

  const fullMarks = selectedSubjects.reduce(
    (total, subject) => total + subject.fullMarks,
    0
  );

  const obtainedMarks = selectedSubjects.reduce(
    (total, subject) =>
      total + Number(result.marks[subject.code] || 0),
    0
  );

  const percentage =
    fullMarks > 0
      ? ((obtainedMarks / fullMarks) * 100).toFixed(2)
      : "0.00";

  const failed = selectedSubjects.some(
    (subject) =>
      Number(result.marks[subject.code] || 0) <
      subject.passMarks
  );

  return {
    student,
    selectedSubjects,
    fullMarks,
    obtainedMarks,
    percentage: Number(percentage),
    grade: failed ? "F" : getGrade(Number(percentage)),
    result: failed ? "FAIL" : "PASS",
  };
};

const emptyForm = {
  studentId: "",
  marks: {},
  status: "Pending",
};

function Results() {
  const [results, setResults] = useState(initialResults);

  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const enrichedResults = useMemo(() => {
    return results.map((result) => ({
      ...result,
      info: getResultInfo(result),
    }));
  }, [results]);

  const filteredResults = useMemo(() => {
    return enrichedResults.filter((item) => {
      const student = item.info.student;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        student?.name.toLowerCase().includes(searchText) ||
        student?.id.toLowerCase().includes(searchText) ||
        student?.roll.toLowerCase().includes(searchText);

      const matchesSemester =
        !semesterFilter ||
        student?.semester === semesterFilter;

      const matchesProgram =
        !programFilter ||
        student?.program === programFilter;

      const matchesStatus =
        !statusFilter ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesSemester &&
        matchesProgram &&
        matchesStatus
      );
    });
  }, [
    enrichedResults,
    search,
    semesterFilter,
    programFilter,
    statusFilter,
  ]);

  const openAddModal = () => {
    setEditingResult(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (result) => {
    setEditingResult(result);

    setFormData({
      studentId: result.studentId,
      marks: { ...result.marks },
      status: result.status,
    });

    setShowModal(true);
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;

    setFormData({
      studentId,
      marks: {},
      status: "Pending",
    });
  };

  const handleMarkChange = (subjectCode, value) => {
    setFormData((prev) => ({
      ...prev,
      marks: {
        ...prev.marks,
        [subjectCode]: value,
      },
    }));
  };

  const selectedStudent = students.find(
    (student) => student.id === formData.studentId
  );

  const availableSubjects = selectedStudent
    ? subjects.filter(
        (subject) =>
          subject.semester === selectedStudent.semester &&
          subject.program === selectedStudent.program
      )
    : [];

  const calculateFormTotal = () => {
    return availableSubjects.reduce(
      (total, subject) =>
        total + Number(formData.marks[subject.code] || 0),
      0
    );
  };

  const calculateFormFullMarks = () => {
    return availableSubjects.reduce(
      (total, subject) => total + subject.fullMarks,
      0
    );
  };

  const formPercentage =
    calculateFormFullMarks() > 0
      ? (
          (calculateFormTotal() / calculateFormFullMarks()) *
          100
        ).toFixed(2)
      : "0.00";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentId) {
      alert("Please select a student.");
      return;
    }

    if (availableSubjects.length === 0) {
      alert("No subjects available for this student.");
      return;
    }

    for (const subject of availableSubjects) {
      const mark = Number(formData.marks[subject.code]);

      if (
        formData.marks[subject.code] === undefined ||
        formData.marks[subject.code] === ""
      ) {
        alert(`Please enter marks for ${subject.name}.`);
        return;
      }

      if (mark < 0 || mark > subject.fullMarks) {
        alert(
          `${subject.name}: marks must be between 0 and ${subject.fullMarks}.`
        );
        return;
      }
    }

    if (editingResult) {
      setResults((prev) =>
        prev.map((result) =>
          result.id === editingResult.id
            ? {
                ...result,
                studentId: formData.studentId,
                marks: formData.marks,
                status: formData.status,
              }
            : result
        )
      );
    } else {
      const newResult = {
        id: Date.now(),
        studentId: formData.studentId,
        marks: formData.marks,
        status: formData.status,
      };

      setResults((prev) => [...prev, newResult]);
    }

    setShowModal(false);
    setEditingResult(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmed) return;

    setResults((prev) =>
      prev.filter((result) => result.id !== id)
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSemesterFilter("");
    setProgramFilter("");
    setStatusFilter("");
  };

  const totalResults = results.length;

  const publishedResults = results.filter(
    (result) => result.status === "Published"
  ).length;

  const pendingResults = results.filter(
    (result) => result.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium text-blue-600">
            Academic Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Result Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage student marks, grades and examination results.
          </p>
        </div>

        <button
          onClick={openAddModal}
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

          Add Result
        </button>

      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Results
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {totalResults}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Published
          </p>

          <h3 className="mt-2 text-2xl font-bold text-emerald-600">
            {publishedResults}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h3 className="mt-2 text-2xl font-bold text-orange-500">
            {pendingResults}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Showing
          </p>

          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {filteredResults.length}
          </h3>
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

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, Student ID or Roll No..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

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
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
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
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>

      {/* Results Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Student Results
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredResults.length} result
            {filteredResults.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredResults.length === 0 ? (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
              📊
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No results found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-[1100px] w-full text-left">

              <thead className="bg-slate-50">

                <tr>

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
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredResults.map((item) => (

                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Student */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                          {item.info.student?.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.info.student?.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.studentId} • Roll{" "}
                            {item.info.student?.roll}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Semester */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.info.student?.semester}
                    </td>

                    {/* Marks */}
                    <td className="px-5 py-4">

                      <span className="font-semibold text-slate-900">
                        {item.info.obtainedMarks}
                      </span>

                      <span className="text-slate-400">
                        {" "}
                        / {item.info.fullMarks}
                      </span>

                    </td>

                    {/* Percentage */}
                    <td className="px-5 py-4">

                      <span className="font-semibold text-slate-900">
                        {item.info.percentage}%
                      </span>

                    </td>

                    {/* Grade */}
                    <td className="px-5 py-4">

                      <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-600">
                        {item.info.grade}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <Link
                          to={`/result/${item.studentId}`}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          View
                        </Link>

                        <button
                          onClick={() =>
                            openEditModal({
                              id: item.id,
                              studentId: item.studentId,
                              marks: item.marks,
                              status: item.status,
                            })
                          }
                          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">

          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingResult
                    ? "Edit Result"
                    : "Add New Result"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter marks for each subject.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-5 sm:p-6"
            >

              {/* Student */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Student *
                </label>

                <select
                  value={formData.studentId}
                  onChange={handleStudentChange}
                  disabled={Boolean(editingResult)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                >

                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (
                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.id} - {student.name} - Roll{" "}
                      {student.roll}
                    </option>
                  ))}

                </select>

              </div>

              {/* Student Info */}
              {selectedStudent && (
                <div className="grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-slate-500">
                      Student ID
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedStudent.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Semester
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedStudent.semester}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Program
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedStudent.program}
                    </p>
                  </div>

                </div>
              )}

              {/* Subjects */}
              {selectedStudent && (
                <div>

                  <div className="mb-3">
                    <h3 className="font-semibold text-slate-900">
                      Subject Marks
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Enter obtained marks for each subject.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-slate-200">

                    <div className="overflow-x-auto">

                      <table className="w-full min-w-[650px]">

                        <thead className="bg-slate-50">

                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                              Subject
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                              Full Marks
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                              Pass Marks
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                              Obtained
                            </th>
                          </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100">

                          {availableSubjects.map(
                            (subject) => (
                              <tr key={subject.id}>

                                <td className="px-4 py-3">

                                  <p className="text-sm font-medium text-slate-900">
                                    {subject.name}
                                  </p>

                                  <p className="mt-1 text-xs text-blue-600">
                                    {subject.code}
                                  </p>

                                </td>

                                <td className="px-4 py-3 text-sm text-slate-600">
                                  {subject.fullMarks}
                                </td>

                                <td className="px-4 py-3 text-sm text-slate-600">
                                  {subject.passMarks}
                                </td>

                                <td className="px-4 py-3">

                                  <input
                                    type="number"
                                    min="0"
                                    max={subject.fullMarks}
                                    value={
                                      formData.marks[
                                        subject.code
                                      ] ?? ""
                                    }
                                    onChange={(e) =>
                                      handleMarkChange(
                                        subject.code,
                                        e.target.value
                                      )
                                    }
                                    placeholder="0"
                                    className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                  />

                                </td>

                              </tr>
                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                  </div>

                </div>
              )}

              {/* Summary */}
              {selectedStudent &&
                availableSubjects.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Full Marks
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {calculateFormFullMarks()}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-xs text-blue-600">
                        Obtained
                      </p>

                      <p className="mt-1 text-xl font-bold text-blue-700">
                        {calculateFormTotal()}
                      </p>
                    </div>

                    <div className="rounded-xl bg-purple-50 p-4">
                      <p className="text-xs text-purple-600">
                        Percentage
                      </p>

                      <p className="mt-1 text-xl font-bold text-purple-700">
                        {formPercentage}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-4">
                      <p className="text-xs text-emerald-600">
                        Grade
                      </p>

                      <p className="mt-1 text-xl font-bold text-emerald-700">
                        {getGrade(Number(formPercentage))}
                      </p>
                    </div>

                  </div>
                )}

              {/* Status */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Result Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Published">
                    Published
                  </option>
                </select>

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
                  {editingResult
                    ? "Update Result"
                    : "Save Result"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Results;