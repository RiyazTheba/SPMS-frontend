import React, { useState } from "react";
import { FolderKanban, CheckCircle, Clock, Eye, Search } from "lucide-react";

function Projects() {
  
  const [projects, setProjects] = useState([
    {
      projectId: 101,
      projectTitle: "Student Project Management System",
      studentName: "Aarav Patel",
      studentEmail: "aarav.patel@example.com",
      status: "In Progress",
      submissionDate: "2026-09-15",
      progress: 60,
    },
    {
      projectId: 102,
      projectTitle: "E-Commerce Web Application",
      studentName: "Priya Sharma",
      studentEmail: "priya.sharma@example.com",
      status: "Pending Review",
      submissionDate: "2026-08-25",
      progress: 90,
    },
    {
      projectId: 103,
      projectTitle: "Smart Attendance System",
      studentName: "Rohan Mehta",
      studentEmail: "rohan.mehta@example.com",
      status: "Completed",
      submissionDate: "2026-07-10",
      progress: 100,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (p) =>
      p.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-2" style={{ color: "var(--spms-text)" }}>
      
      {/* --- HEADER --- */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="mb-1 fs-5 fw-bold">Guided Projects</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
            List of student projects assigned under your guidance.
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
            placeholder="Search project or student..."
            style={{ borderRadius: "0px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- PROJECTS TABLE --- */}
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
                <th className="py-3">Project Title</th>
                <th className="py-3">Student Name</th>
                <th className="py-3">Status</th>
                <th className="py-3">Progress</th>
                <th className="py-3 text-end px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.projectId}>
                    <td className="px-3 fw-semibold">#{project.projectId}</td>
                    <td>
                      <div className="fw-semibold">{project.projectTitle}</div>
                      <small className="text-muted">{project.studentEmail}</small>
                    </td>
                    <td>{project.studentName}</td>
                    <td>
                      <span
                        className={`badge px-2 py-1 ${
                          project.status === "Completed"
                            ? "bg-success"
                            : project.status === "In Progress"
                            ? "bg-info text-dark"
                            : "bg-warning text-dark"
                        }`}
                        style={{ borderRadius: "0px", fontWeight: 500 }}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td style={{ width: "150px" }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress w-100" style={{ height: "6px", borderRadius: "0px" }}>
                          <div
                            className={`progress-bar ${
                              project.progress === 100 ? "bg-success" : "bg-primary"
                            }`}
                            role="progressbar"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <small className="text-muted">{project.progress}%</small>
                      </div>
                    </td>
                    <td className="text-end px-3">
                      <button
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                        style={{ borderRadius: "0px" }}
                        onClick={() => alert(`Reviewing project: ${project.projectTitle}`)}
                      >
                        <Eye size={14} /> Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No projects found.
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

export default Projects;