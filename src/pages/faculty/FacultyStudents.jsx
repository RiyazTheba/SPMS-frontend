import React, { useState } from "react";
import { Users, Mail, Phone, Search, FolderKanban } from "lucide-react";

function FacultyStudents() {
  const [students, setStudents] = useState([
    {
      studentId: 1,
      fullName: "Aarav Patel",
      email: "aarav.patel@example.com",
      mobileNumber: "9876543210",
      projectTitle: "Student Project Management System",
      batch: "2026-Batch-A",
    },
    {
      studentId: 2,
      fullName: "Priya Sharma",
      email: "priya.sharma@example.com",
      mobileNumber: "9123456789",
      projectTitle: "E-Commerce Web Application",
      batch: "2026-Batch-A",
    },
    {
      studentId: 3,
      fullName: "Rohan Mehta",
      email: "rohan.mehta@example.com",
      mobileNumber: "9988776655",
      projectTitle: "Smart Attendance System",
      batch: "2026-Batch-B",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-2" style={{ color: "var(--spms-text)" }}>
      
      {/* --- HEADER --- */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="mb-1 fs-5 fw-bold">Assigned Students</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
            List of students working under your guidance and their assigned projects.
          </p>
        </div>

        {/* Search Bar */}
        <div className="input-group input-group-sm" style={{ width: "250px" }}>
          <span className="input-group-text" style={{ borderRadius: "0px" }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search student or project..."
            style={{ borderRadius: "0px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- STUDENTS TABLE --- */}
      <div
        className="card border-0 shadow-sm"
        style={{
          backgroundColor: "var(--spms-card)",
          borderRadius: "0px",
          border: "1px solid var(--spms-border)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.9rem" }}>
            <thead style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)" }}>
              <tr>
                <th className="py-3 px-3">#ID</th>
                <th className="py-3">Student Name</th>
                <th className="py-3">Contact Details</th>
                <th className="py-3">Assigned Project</th>
                <th className="py-3 px-3">Batch</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.studentId}>
                    <td className="px-3 fw-semibold">#{student.studentId}</td>
                    <td>
                      <div className="fw-semibold d-flex align-items-center gap-2">
                        <Users size={16} className="text-primary" />
                        {student.fullName}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="d-inline-flex align-items-center gap-1 text-muted" style={{ fontSize: "0.85rem" }}>
                          <Mail size={13} /> {student.email}
                        </span>
                        <span className="d-inline-flex align-items-center gap-1 text-muted" style={{ fontSize: "0.85rem" }}>
                          <Phone size={13} /> {student.mobileNumber}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-1 fw-medium text-dark">
                        <FolderKanban size={15} className="text-info" />
                        {student.projectTitle}
                      </span>
                    </td>
                    <td className="px-3">
                      <span className="badge bg-secondary" style={{ borderRadius: "0px" }}>
                        {student.batch}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default FacultyStudents;