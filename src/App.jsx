import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import ResultDetail from "./pages/ResultDetail";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />

        <Route
          path="/search"
          element={<SearchResult />}
        />

        <Route
          path="/result/:studentId"
          element={<ResultDetail />}
        />

        {/* Admin Pages - Coming Soon */}
        <Route
          path="/admin/login"
          element={
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
              <h1 className="text-2xl font-bold text-slate-800">
                Admin Login Coming Soon
              </h1>
            </div>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
              <h1 className="text-2xl font-bold text-slate-800">
                Admin Dashboard Coming Soon
              </h1>
            </div>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
              <div className="text-center">
                <h1 className="text-6xl font-extrabold text-blue-600">
                  404
                </h1>

                <h2 className="mt-3 text-2xl font-bold text-slate-900">
                  Page Not Found
                </h2>

                <p className="mt-2 text-slate-500">
                  The page you are looking for doesn't exist.
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