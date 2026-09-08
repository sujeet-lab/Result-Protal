import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const student = {
  id: "STU001",
  name: "Sujit Sah",
  rollNumber: "101",
  program: "Bachelor of Information Technology",
  semester: "5th Semester",
};

const subjects = [
  {
    code: "BIT501",
    name: "System Analysis and Design",
    fullMarks: 100,
    passMarks: 40,
    obtainedMarks: 85,
  },
  {
    code: "BIT502",
    name: "Database Management System",
    fullMarks: 100,
    passMarks: 40,
    obtainedMarks: 78,
  },
  {
    code: "BIT503",
    name: "Web Development",
    fullMarks: 100,
    passMarks: 40,
    obtainedMarks: 90,
  },
  {
    code: "BIT504",
    name: "Computer Networks",
    fullMarks: 100,
    passMarks: 40,
    obtainedMarks: 82,
  },
  {
    code: "BIT505",
    name: "Software Engineering",
    fullMarks: 100,
    passMarks: 40,
    obtainedMarks: 75,
  },
];

function getGrade(mark) {
  if (mark >= 90) return "A+";
  if (mark >= 80) return "A";
  if (mark >= 70) return "B+";
  if (mark >= 60) return "B";
  if (mark >= 50) return "C+";
  if (mark >= 40) return "C";
  return "F";
}

function ResultDetail() {
  const { studentId } = useParams();

  const result = useMemo(() => {
    const totalMarks = subjects.reduce(
      (total, subject) => total + subject.obtainedMarks,
      0
    );

    const fullMarks = subjects.reduce(
      (total, subject) => total + subject.fullMarks,
      0
    );

    const percentage = (totalMarks / fullMarks) * 100;

    const passed = subjects.every(
      (subject) => subject.obtainedMarks >= subject.passMarks
    );

    return {
      totalMarks,
      fullMarks,
      percentage,
      grade: getGrade(percentage),
      status: passed ? "PASS" : "FAIL",
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 px-3 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-5 print:hidden">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>

            Back to Search
          </Link>
        </div>

        {/* ================= HEADER ================= */}
        <div className="mb-8 text-center print:mb-5">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 print:hidden">

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
                d="M4 4h16v16H4z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 8h8M8 12h8M8 16h4"
              />
            </svg>

          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            ACADEMIC RESULT
          </h1>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-blue-600" />

          <p className="mt-3 text-sm text-slate-500">
            Result Published
          </p>

        </div>


        {/* ================= RESULT CARD ================= */}
        <div
          id="result-card"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* ================= STUDENT INFORMATION ================= */}
          <div className="border-b border-slate-200 p-5 sm:p-7">

            <div className="grid gap-5 md:grid-cols-2">

              {/* Student Details */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.5 20a6.5 6.5 0 0 1 13 0"
                      />
                    </svg>

                  </div>

                  <h2 className="font-bold text-slate-800">
                    Student Information
                  </h2>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <InfoItem
                    label="Student ID"
                    value={studentId?.toUpperCase() || student.id}
                  />

                  <InfoItem
                    label="Roll Number"
                    value={student.rollNumber}
                  />

                  <InfoItem
                    label="Name"
                    value={student.name}
                  />

                  <InfoItem
                    label="Semester"
                    value={student.semester}
                  />

                </div>

              </div>


              {/* Program */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6.5 12 3l9 3.5L12 10 3 6.5Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 8.5v5c0 1.7 2.7 3.5 6 3.5s6-1.8 6-3.5v-5"
                      />
                    </svg>

                  </div>

                  <h2 className="font-bold text-slate-800">
                    Academic Information
                  </h2>

                </div>

                <div className="space-y-4">

                  <InfoItem
                    label="Program"
                    value={student.program}
                  />

                  <InfoItem
                    label="Semester"
                    value={student.semester}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* ================= SUBJECT TABLE ================= */}
          <div className="p-5 sm:p-7">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Subject-wise Result
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Marks and grades obtained in each subject
                </p>
              </div>

              <div className="hidden rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 sm:block">
                {result.status}
              </div>

            </div>


            {/* Table wrapper for mobile */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">

              <table className="w-full min-w-[760px] border-collapse text-sm">

                <thead>
                  <tr className="bg-slate-900 text-left text-xs uppercase tracking-wide text-white">

                    <th className="px-4 py-4 text-center">
                      S.N.
                    </th>

                    <th className="px-4 py-4">
                      Subject
                    </th>

                    <th className="px-4 py-4 text-center">
                      Full Marks
                    </th>

                    <th className="px-4 py-4 text-center">
                      Pass Marks
                    </th>

                    <th className="px-4 py-4 text-center">
                      Obtained
                    </th>

                    <th className="px-4 py-4 text-center">
                      Grade
                    </th>

                    <th className="px-4 py-4 text-center">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {subjects.map((subject, index) => {
                    const passed =
                      subject.obtainedMarks >= subject.passMarks;

                    return (
                      <tr
                        key={subject.code}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >

                        <td className="px-4 py-4 text-center font-medium text-slate-500">
                          {index + 1}
                        </td>

                        <td className="px-4 py-4">

                          <div className="font-semibold text-slate-800">
                            {subject.name}
                          </div>

                          <div className="mt-1 text-xs text-slate-400">
                            {subject.code}
                          </div>

                        </td>

                        <td className="px-4 py-4 text-center text-slate-600">
                          {subject.fullMarks}
                        </td>

                        <td className="px-4 py-4 text-center text-slate-600">
                          {subject.passMarks}
                        </td>

                        <td className="px-4 py-4 text-center font-bold text-slate-900">
                          {subject.obtainedMarks}
                        </td>

                        <td className="px-4 py-4 text-center">

                          <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                            {getGrade(subject.obtainedMarks)}
                          </span>

                        </td>

                        <td className="px-4 py-4 text-center">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              passed
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {passed ? "Pass" : "Fail"}
                          </span>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

            {/* Mobile scroll hint */}
            <p className="mt-2 text-center text-[11px] text-slate-400 sm:hidden">
              ← Swipe horizontally to view all columns →
            </p>

          </div>


          {/* ================= SUMMARY ================= */}
          <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7">

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

              {/* Total Marks */}
              <SummaryCard
                label="Total Marks"
                value={result.totalMarks}
                icon="marks"
              />

              {/* Full Marks */}
              <SummaryCard
                label="Full Marks"
                value={result.fullMarks}
                icon="full"
              />

              {/* Percentage */}
              <SummaryCard
                label="Percentage"
                value={`${result.percentage.toFixed(2)}%`}
                icon="percentage"
              />

              {/* Grade */}
              <SummaryCard
                label="Grade"
                value={result.grade}
                icon="grade"
              />

            </div>


            {/* Result Status */}
            <div className="mt-5 flex items-center justify-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">

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
                    d="m5 12 4 4L19 6"
                  />
                </svg>

              </div>

              <div className="text-center">

                <p className="text-xs font-medium text-green-600">
                  Overall Result
                </p>

                <p className="text-base font-bold text-green-700">
                  Result: {result.status}
                </p>

              </div>

            </div>


            {/* Print Button */}
            <div className="mt-6 flex justify-center print:hidden">

              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5h-2M6 14h12v7H6v-7Z"
                  />
                </svg>

                Print Result

              </button>

            </div>

          </div>

        </div>


        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-slate-400 print:hidden">
          This is an electronically generated academic result.
        </p>

      </div>
    </main>
  );
}


/* ================= INFO ITEM ================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}


/* ================= SUMMARY CARD ================= */

function SummaryCard({ label, value, icon }) {
  const icons = {
    marks: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 19V5m0 14h16M8 16v-4m4 4V8m4 8v-6"
        />
      </svg>
    ),

    full: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h4"
        />
      </svg>
    ),

    percentage: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m7 17 10-10M8 8h.01M16 16h.01"
        />
      </svg>
    ),

    grade: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"
        />
      </svg>
    ),
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm sm:p-5">

      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icons[icon]}
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        {value}
      </p>

    </div>
  );
}

export default ResultDetail;