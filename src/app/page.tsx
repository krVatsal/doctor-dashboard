
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Patient Directory</h1>
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="Search by name, issue, or email..."
            className="border rounded px-3 py-2 w-64"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <select
            className="border rounded px-3 py-2"
            value={medicalIssue}
            onChange={(e) => { setMedicalIssue(e.target.value); setPage(1); }}
          >
            <option value="">All Medical Issues</option>
            {medicalIssues.map((issue) => (
              <option key={issue} value={issue}>{issue}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="patient_name">Name</option>
            <option value="age">Age</option>
            <option value="medical_issue">Medical Issue</option>
          </select>
          <button
            className="border rounded px-3 py-2"
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          >
            Order: {order === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Age</th>
                  <th className="p-2 text-left">Medical Issue</th>
                  <th className="p-2 text-left">Address</th>
                  <th className="p-2 text-left">Phone Number</th>
                  <th className="p-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.patient_id} className="border-b">
                    <td className="p-2">{p.patient_id}</td>
                    <td className="p-2">{p.patient_name}</td>
                    <td className="p-2">{p.age}</td>
                    <td className="p-2">{p.medical_issue}</td>
                    <td className="p-2">{p.contact[0]?.address || "N/A"}</td>
                    <td className="p-2">{p.contact[0]?.number || "N/A"}</td>
                    <td className="p-2">{p.contact[0]?.email || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <span>
            Showing {PAGE_SIZE * (page - 1) + 1} - {Math.min(PAGE_SIZE * page, total)} of {total}
          </span>
          <div className="flex gap-2">
            <button
              className="border rounded px-3 py-1"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              className="border rounded px-3 py-1"
              disabled={PAGE_SIZE * page >= total}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
