
"use client";
import { useEffect, useState } from "react";

type Patient = {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: Array<{ address: string | null; number: string | null; email: string | null }>;
  medical_issue: string;
};

const PAGE_SIZE = 20;

// Medical issue color mapping
const getMedicalIssueColor = (issue: string) => {
  const colors: { [key: string]: string } = {
    fever: "bg-red-100 text-red-800",
    headache: "bg-orange-100 text-orange-800",
    "sore throat": "bg-yellow-100 text-yellow-800",
    "sprained ankle": "bg-green-100 text-green-800",
    rash: "bg-red-100 text-red-800",
    sinusitis: "bg-green-100 text-green-800",
    "ear infection": "bg-blue-100 text-blue-800",
    "allergic reaction": "bg-purple-100 text-purple-800",
    "stomach ache": "bg-orange-100 text-orange-800",
    "broken arm": "bg-gray-100 text-gray-800",
  };
  return colors[issue] || "bg-gray-100 text-gray-800";
};

export default function PatientDirectory() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [medicalIssue, setMedicalIssue] = useState("");
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({
      page: page.toString(),
      limit: PAGE_SIZE.toString(),
      search,
      medical_issue: medicalIssue,
      sort,
      order,
    });
    fetch(`/api/patients?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.data);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [page, search, medicalIssue, sort, order]);

  // Unique medical issues for filter dropdown
  const medicalIssues = Array.from(new Set(patients.map((p) => p.medical_issue))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Patient Directory</h1>
          <p className="text-blue-100">{total} Patient Found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* View Toggle */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              viewMode === "table"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
          <button
            className={`px-4 py-2 font-medium ml-6 ${
              viewMode === "card"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setViewMode("card")}
          >
            Card View
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-700 text-gray-200 rounded-lg px-4 py-2 pl-10 w-64"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select
              className="border rounded-lg px-4 py-2 bg-white text-gray-700"
              value={medicalIssue}
              onChange={(e) => { setMedicalIssue(e.target.value); setPage(1); }}
            >
              <option value="">All Medical Issues</option>
              {medicalIssues.map((issue) => (
                <option key={issue} value={issue}>{issue}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              className="border rounded-lg px-3 py-2 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="patient_name">Name</option>
              <option value="age">Age</option>
              <option value="medical_issue">Medical Issue</option>
            </select>
            <button
              className="border rounded-lg px-3 py-2 text-sm"
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
            >
              {order === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <>
            {viewMode === "table" ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical Issue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email ID</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((p) => (
                      <tr key={p.patient_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ID-{p.patient_id.toString().padStart(4, '0')}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-gray-600">
                                {p.patient_name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{p.patient_name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMedicalIssueColor(p.medical_issue)}`}>
                            {p.medical_issue}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.contact[0]?.address || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.contact[0]?.number || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{p.contact[0]?.email || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {patients.map((p) => (
                  <div key={p.patient_id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {p.patient_name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600">
                        Age {p.age}
                      </button>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">{p.patient_name}</h3>
                    <p className="text-sm text-gray-600 mb-3">ID-{p.patient_id.toString().padStart(4, '0')}</p>
                    
                    <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mb-4 ${getMedicalIssueColor(p.medical_issue)}`}>
                      {p.medical_issue}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{p.contact[0]?.address || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{p.contact[0]?.number || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-blue-600">{p.contact[0]?.email || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-8">
              <span className="text-sm text-gray-600">
                Showing {PAGE_SIZE * (page - 1) + 1} - {Math.min(PAGE_SIZE * page, total)} of {total}
              </span>
              <div className="flex gap-2">
                <button
                  className="border rounded-lg px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed bg-black hover:bg-gray-800"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">Page {page}</span>
                <button
                  className="border rounded-lg px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed  bg-black hover:bg-gray-800"
                  disabled={PAGE_SIZE * page >= total}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
