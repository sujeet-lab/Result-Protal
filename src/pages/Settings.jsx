import { useState } from "react";

function Settings() {
  const [activeTab, setActiveTab] = useState("institution");

  const [institution, setInstitution] = useState({
    name: "Lumbini ICT College",
    shortName: "LUC",
    address: "Kathmandu, Nepal",
    email: "info@luc.edu.np",
    phone: "+977 9800000000",
    website: "https://example.com",
  });

  const [resultSettings, setResultSettings] = useState({
    resultTitle: "Semester Examination Result",
    academicYear: "2026",
    semester: "5th Semester",
    passingPercentage: 40,
    publishAutomatically: false,
    allowStudentPrint: true,
  });

  const [notifications, setNotifications] = useState({
    resultPublished: true,
    newStudent: true,
    pendingResult: true,
    emailNotification: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const tabs = [
    {
      id: "institution",
      name: "Institution",
      icon: "🏫",
    },
    {
      id: "results",
      name: "Result Settings",
      icon: "📋",
    },
    {
      id: "grading",
      name: "Grading System",
      icon: "🎓",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: "🔔",
    },
    {
      id: "security",
      name: "Security",
      icon: "🔐",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-blue-600">
          Administration
        </p>

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your result portal configuration and preferences.
        </p>
      </div>

      {/* Save Message */}
      {saved && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
            ✓
          </span>

          Settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

            <div className="mb-3 px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Settings
              </p>
            </div>

            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-lg">
                    {tab.icon}
                  </span>

                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9">

          {/* Institution */}
          {activeTab === "institution" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Institution Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the information displayed on the result portal.
                </p>
              </div>

              <div className="space-y-6 p-6">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Institution Name
                    </label>

                    <input
                      type="text"
                      value={institution.name}
                      onChange={(e) =>
                        setInstitution({
                          ...institution,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Short Name
                    </label>

                    <input
                      type="text"
                      value={institution.shortName}
                      onChange={(e) =>
                        setInstitution({
                          ...institution,
                          shortName: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Address
                    </label>

                    <input
                      type="text"
                      value={institution.address}
                      onChange={(e) =>
                        setInstitution({
                          ...institution,
                          address: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      value={institution.email}
                      onChange={(e) =>
                        setInstitution({
                          ...institution,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone
                    </label>

                    <input
                      type="text"
                      value={institution.phone}
                      onChange={(e) =>
                        setInstitution({
                          ...institution,
                          phone: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Website
                    </label>

                    <input
                      type="text"
                      value={institution.website}
                      onChange={(e) =>
                        setInstitution({
                          ...institution,
                          website: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                </div>

                <div className="flex justify-end border-t border-slate-100 pt-6">
                  <button
                    onClick={handleSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Result Settings */}
          {activeTab === "results" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Result Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Configure examination result publishing options.
                </p>
              </div>

              <div className="space-y-6 p-6">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Result Title
                    </label>

                    <input
                      type="text"
                      value={resultSettings.resultTitle}
                      onChange={(e) =>
                        setResultSettings({
                          ...resultSettings,
                          resultTitle: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Academic Year
                    </label>

                    <input
                      type="text"
                      value={resultSettings.academicYear}
                      onChange={(e) =>
                        setResultSettings({
                          ...resultSettings,
                          academicYear: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Default Semester
                    </label>

                    <select
                      value={resultSettings.semester}
                      onChange={(e) =>
                        setResultSettings({
                          ...resultSettings,
                          semester: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Passing Percentage
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        value={resultSettings.passingPercentage}
                        onChange={(e) =>
                          setResultSettings({
                            ...resultSettings,
                            passingPercentage: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        %
                      </span>
                    </div>
                  </div>

                </div>

                <div className="space-y-3">

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">
                        Automatically publish results
                      </p>

                      <p className="text-sm text-slate-500">
                        Publish results automatically after submission.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={resultSettings.publishAutomatically}
                      onChange={(e) =>
                        setResultSettings({
                          ...resultSettings,
                          publishAutomatically: e.target.checked,
                        })
                      }
                      className="h-5 w-5 accent-blue-600"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">
                        Allow students to print results
                      </p>

                      <p className="text-sm text-slate-500">
                        Students can print their published result.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={resultSettings.allowStudentPrint}
                      onChange={(e) =>
                        setResultSettings({
                          ...resultSettings,
                          allowStudentPrint: e.target.checked,
                        })
                      }
                      className="h-5 w-5 accent-blue-600"
                    />
                  </label>

                </div>

                <div className="flex justify-end border-t border-slate-100 pt-6">
                  <button
                    onClick={handleSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Grading System */}
          {activeTab === "grading" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Grading System
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Grade ranges used for calculating student results.
                </p>
              </div>

              <div className="p-6">

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">

                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Grade
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Percentage
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Description
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {[
                        ["A+", "90 - 100", "Outstanding"],
                        ["A", "80 - 89", "Excellent"],
                        ["B+", "70 - 79", "Very Good"],
                        ["B", "60 - 69", "Good"],
                        ["C+", "50 - 59", "Satisfactory"],
                        ["C", "40 - 49", "Pass"],
                        ["F", "Below 40", "Fail"],
                      ].map((grade) => (
                        <tr
                          key={grade[0]}
                          className="hover:bg-slate-50"
                        >
                          <td className="px-5 py-4">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                              {grade[0]}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm font-medium text-slate-700">
                            {grade[1]}%
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600">
                            {grade[2]}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                grade[0] === "F"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-emerald-50 text-emerald-600"
                              }`}
                            >
                              {grade[0] === "F"
                                ? "Fail"
                                : "Active"}
                            </span>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>

                <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <span className="text-lg">ℹ️</span>

                    <div>
                      <p className="font-medium text-blue-800">
                        Grading Information
                      </p>

                      <p className="mt-1 text-sm text-blue-700">
                        These grade ranges are currently used when
                        calculating student results.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Notification Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose which system notifications you want to receive.
                </p>
              </div>

              <div className="space-y-3 p-6">

                {[
                  {
                    key: "resultPublished",
                    title: "Result Published",
                    description:
                      "Notify when a result is successfully published.",
                  },
                  {
                    key: "newStudent",
                    title: "New Student",
                    description:
                      "Notify when a new student is added.",
                  },
                  {
                    key: "pendingResult",
                    title: "Pending Result",
                    description:
                      "Notify when results are waiting for publication.",
                  },
                  {
                    key: "emailNotification",
                    title: "Email Notifications",
                    description:
                      "Receive important system notifications by email.",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-5 hover:bg-slate-50"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications[item.key]}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="h-5 w-5 accent-blue-600"
                    />
                  </label>
                ))}

                <div className="flex justify-end border-t border-slate-100 pt-6">
                  <button
                    onClick={handleSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Security Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Change your administrator password and account security.
                </p>
              </div>

              <div className="space-y-5 p-6">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <span>⚠️</span>

                    <div>
                      <p className="font-medium text-amber-800">
                        Security Tip
                      </p>

                      <p className="mt-1 text-sm text-amber-700">
                        Use a strong password containing letters,
                        numbers, and special characters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-6">
                  <button
                    onClick={handleSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Update Password
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Settings;