import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const students = [
  {
    id: "STU001",
    rollNumber: "101",
    name: "Sujit Sah",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: "STU002",
    rollNumber: "102",
    name: "Ram Kumar",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
  {
    id: "STU003",
    rollNumber: "103",
    name: "Hari Prasad",
    semester: "5th Semester",
    program: "Bachelor of Information Technology",
  },
];

function SearchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStudentId = searchParams.get("studentId") || "";

  const [studentId, setStudentId] = useState(initialStudentId);
  const [student, setStudent] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const result = students.find(
      (item) => item.id.toLowerCase() === studentId.trim().toLowerCase()
    );

    setStudent(result || null);
    setSearched(true);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Search Result
          </h1>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-blue-600" />

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Enter your Student ID to find your academic result
          </p>

        </div>


        {/* ================= SEARCH CARD ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >

            {/* Input */}
            <div className="flex-1">

              <label
                htmlFor="studentId"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Enter Student ID
              </label>

              <div className="relative">

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
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Example: STU001"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

            </div>


            {/* Search Button */}
            <button
              type="submit"
              className="flex h-[50px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
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

              Search

            </button>

          </form>

        </div>


        {/* ================= SEARCH RESULT ================= */}
        {searched && student && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">

            {/* Success Header */}
            <div className="flex items-center gap-3 border-b border-green-200 bg-green-50 px-5 py-4 sm:px-6">

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

              <div>
                <h2 className="text-sm font-bold text-green-800">
                  Student Found
                </h2>

                <p className="text-xs text-green-700">
                  Result information is available
                </p>
              </div>

            </div>


            {/* Student Information */}
            <div className="p-5 sm:p-7">

              <div className="flex flex-col gap-6 md:flex-row md:items-center">

                {/* Avatar */}
                <div className="flex justify-center md:w-32">

                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-100 ring-8 ring-slate-50">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.3"
                      stroke="currentColor"
                      className="h-20 w-20 text-slate-400"
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

                </div>


                {/* Information */}
                <div className="grid flex-1 gap-x-8 gap-y-5 sm:grid-cols-2">

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Student ID
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {student.id}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Roll Number
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {student.rollNumber}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Name
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {student.name}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Semester
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {student.semester}
                    </p>
                  </div>


                  <div className="sm:col-span-2">

                    <p className="text-xs font-medium text-slate-400">
                      Program
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {student.program}
                    </p>

                  </div>

                </div>

              </div>


              {/* View Full Result */}
              <div className="mt-7 border-t border-slate-100 pt-5">

                <button
                  onClick={() => navigate(`/result/${student.id}`)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 sm:w-auto"
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
                      d="M2.25 12s3.5-6.5 9.75-6.5S21.75 12 21.75 12 18.25 18.5 12 18.5 2.25 12 2.25 12Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  View Full Result

                </button>

              </div>

            </div>

          </div>
        )}


        {/* ================= NOT FOUND ================= */}
        {searched && !student && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">

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
                  d="M12 9v4m0 4h.01M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
                />
              </svg>

            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Student Not Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              No student was found with ID{" "}
              <span className="font-semibold text-slate-700">
                {studentId}
              </span>
              .
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Please check the Student ID and try again.
            </p>

          </div>
        )}


        {/* ================= HELP ================= */}
        {!searched && (
          <div className="mt-6 text-center">

            <p className="text-xs text-slate-400">
              Demo Student IDs:
              <span className="ml-2 font-semibold text-slate-500">
                STU001
              </span>
              ,
              <span className="ml-1 font-semibold text-slate-500">
                STU002
              </span>
              ,
              <span className="ml-1 font-semibold text-slate-500">
                STU003
              </span>
            </p>

          </div>
        )}

      </div>
    </main>
  );
}

export default SearchResult;