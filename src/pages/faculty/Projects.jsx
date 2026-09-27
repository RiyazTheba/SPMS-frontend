
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FolderKanban, Eye, Search } from "lucide-react";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const PROJECTS_API = "http://localhost:5278/api/Projects";

  useEffect(() => {
    fetchFacultyProjects();
  }, []);

  const fetchFacultyProjects = async () => {
    try {

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("JWT token not found");
        setLoading(false);
        return;
      }

      // JWT decode
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      // JWT ma userId
      const facultyId =
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      console.log("Logged Faculty ID:", facultyId);

      // Get all projects
      const response = await axios.get(
        PROJECTS_API,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allProjects = response.data;

      console.log("All Projects:", allProjects);

      // Faculty ID match
      const facultyProjects = allProjects.filter(
        (project) =>
          Number(project.facultyId) === Number(facultyId)
      );

      console.log(
        "Faculty Projects:",
        facultyProjects
      );

      setProjects(facultyProjects);
      setLoading(false);

    } catch (error) {

      console.error(
        "Error fetching faculty projects:",
        error
      );

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );
      }

      setLoading(false);
    }
  };

  // Search
  const filteredProjects = projects.filter(
    (project) =>
      project.projectTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      project.studentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      project.studentEmail
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="container-fluid py-2"
      style={{
        color: "var(--spms-text)",
      }}
    >

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <div>

          <h4 className="mb-1 fs-5 fw-bold">
            Guided Projects
          </h4>

          <p
            className="text-muted mb-0"
            style={{
              fontSize: "0.85rem",
            }}
          >
            Projects assigned under your guidance.
          </p>

        </div>

        {/* SEARCH */}
        <div
          className="input-group input-group-sm"
          style={{
            width: "280px",
          }}
        >

          <span
            className="input-group-text"
            style={{
              borderRadius: "0px",
            }}
          >
            <Search size={16} />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search project or student..."
            style={{
              borderRadius: "0px",
            }}
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

      </div>

      {/* PROJECT TABLE */}
      <div
        className="card border-0 shadow-sm"
        style={{
          backgroundColor: "var(--spms-card)",
          borderRadius: "0px",
          border:
            "1px solid var(--spms-border)",
        }}
      >

        <div className="table-responsive">

          <table
            className="table table-hover align-middle mb-0"
            style={{
              fontSize: "0.9rem",
            }}
          >

            <thead
              style={{
                backgroundColor:
                  "var(--spms-heading)",
                color: "var(--spms-text)",
              }}
            >

              <tr>

                <th className="py-3 px-3">
                  #ID
                </th>

                <th className="py-3">
                  Project Title
                </th>

                <th className="py-3">
                  Student Name
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Progress
                </th>

                <th className="py-3 text-end px-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-4"
                  >
                    Loading projects...
                  </td>

                </tr>

              ) : filteredProjects.length > 0 ? (

                filteredProjects.map(
                  (project) => (

                    <tr
                      key={project.projectId}
                    >

                      {/* ID */}
                      <td className="px-3 fw-semibold">

                        #{project.projectId}

                      </td>

                      {/* PROJECT */}
                      <td>

                        <div className="fw-semibold d-flex align-items-center gap-2">

                          <FolderKanban
                            size={16}
                            className="text-info"
                          />

                          {project.projectTitle}

                        </div>

                        {project.studentEmail && (
                          <small className="text-muted">
                            {project.studentEmail}
                          </small>
                        )}

                      </td>

                      {/* STUDENT */}
                      <td>

                        {project.studentName ||
                          project.studentId ||
                          "N/A"}

                      </td>

                      {/* STATUS */}
                      <td>

                        <span
                          className={`badge px-2 py-1 ${
                            project.projectStatus === 2 ||
                            project.status === "Completed"
                              ? "bg-success"
                              : project.projectStatus === 1 ||
                                project.status === "In Progress"
                              ? "bg-info text-dark"
                              : "bg-warning text-dark"
                          }`}
                          style={{
                            borderRadius: "0px",
                            fontWeight: 500,
                          }}
                        >

                          {project.projectStatus === 2
                            ? "Completed"
                            : project.projectStatus === 1
                            ? "In Progress"
                            : project.status || "Pending"}

                        </span>

                      </td>

                      {/* PROGRESS */}
                      <td style={{ width: "150px" }}>

                        {project.progressPercentage !== undefined ? (

                          <div className="d-flex align-items-center gap-2">

                            <div
                              className="progress w-100"
                              style={{
                                height: "6px",
                                borderRadius: "0px",
                              }}
                            >

                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{
                                  width: `${project.progressPercentage}%`,
                                }}
                              />

                            </div>

                            <small className="text-muted">
                              {project.progressPercentage}%
                            </small>

                          </div>

                        ) : (

                          <span className="text-muted">
                            -
                          </span>

                        )}

                      </td>

                      {/* ACTION */}
                      <td className="text-end px-3">

                        <button
                          className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                          style={{
                            borderRadius: "0px",
                          }}
                          onClick={() =>
                            alert(
                              `Reviewing project: ${project.projectTitle}`
                            )
                          }
                        >

                          <Eye size={14} />

                          Review

                        </button>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-4 text-muted"
                  >
                    No projects assigned to you.
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

