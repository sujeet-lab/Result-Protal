import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import ResultDetail from "./pages/ResultDetail";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import Results from "./pages/Results";
import PublishResults from "./pages/PublishResults";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Navbar />
              <SearchResult />
            </>
          }
        />

        <Route
          path="/result/:studentId"
          element={
            <>
              <Navbar />
              <ResultDetail />
            </>
          }
        />

        {/* =========================
            ADMIN LOGIN
        ========================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =========================
            PROTECTED ADMIN ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="students"
              element={<Students />}
            />

            <Route
              path="subjects"
              element={<Subjects />}
            />

            <Route
              path="results"
              element={<Results />}
            />

            <Route
              path="publish"
              element={<PublishResults />}
            />

            <Route
              path="reports"
              element={<Reports />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />
          </Route>
        </Route>

        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
              <div className="text-center">
                <h1 className="text-7xl font-black text-blue-600">
                  404
                </h1>

                <p className="mt-3 text-lg text-slate-600">
                  Page not found
                </p>
              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;