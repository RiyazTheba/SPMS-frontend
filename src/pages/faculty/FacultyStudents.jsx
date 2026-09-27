
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Mail,
  Phone,
  Search,
  FolderKanban
} from "lucide-react";

function FacultyStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const USERS_API = "http://localhost:5278/api/Users";
  const USER_ROLES_API = "http://localhost:5278/api/UserRoles";
  const PROJECTS_API = "http://localhost:5278/api/Projects";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Get Users
      const usersResponse = await axios.get(
        USERS_API,
        { headers }
      );

      // Get User Roles
      const rolesResponse = await axios.get(
        USER_ROLES_API,
        { headers }
      );

      // Get Projects
      const projectsResponse = await axios.get(
        PROJECTS_API,
        { headers }
      );

      const users = usersResponse.data;
      const userRoles = rolesResponse.data;
      const projects = projectsResponse.data;

      // Only Student users
      const studentUsers = users.filter((user) => {
        const role = userRoles.find(
          (ur) => ur.userId === user.userId
        );

        return (
          role &&
          role.roleName?.toLowerCase() === "student"
        );
      });

      // Add project title using studentId
      const studentData = studentUsers.map((student) => {

        const studentProject = projects.find(
          (project) =>
            Number(project.studentId) ===
            Number(student.userId)
        );

        return {
          studentId: student.userId,
          fullName: student.fullName,
          email: student.email,
          mobileNumber: student.mobileNumber,

          projectTitle:
            studentProject?.projectTitle ||
            "No Project Assigned",
        };
      });

      setStudents(studentData);
      setLoading(false);

    } catch (error) {
      console.error(
        "Error fetching students:",
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
  const filteredStudents = students.filter(
    (student) =>
      student.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      student.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      student.mobileNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      student.projectTitle
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
            Students
          </h4>

          <p
            className="text-muted mb-0"
            style={{
              fontSize: "0.85rem",
            }}
          >
            View students and their assigned projects.
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
            placeholder="Search student or project..."
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

      {/* TABLE */}
      <div
        className="card border-0 shadow-sm"
        style={{
          backgroundColor: "var(--spms-card)",
          borderRadius: "0px",
          border: "1px solid var(--spms-border)",
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
                  Student Name
                </th>

                <th className="py-3">
                  Email
                </th>

                <th className="py-3">
                  Mobile Number
                </th>

                <th className="py-3">
                  Assigned Project
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4"
                  >
                    Loading students...
                  </td>
                </tr>

              ) : filteredStudents.length > 0 ? (

                filteredStudents.map((student) => (

                  <tr
                    key={student.studentId}
                  >

                    {/* ID */}
                    <td className="px-3 fw-semibold">
                      #{student.studentId}
                    </td>

                    {/* NAME */}
                    <td>

                      <div className="fw-semibold d-flex align-items-center gap-2">

                        <Users
                          size={16}
                          className="text-primary"
                        />

                        {student.fullName}

                      </div>

                    </td>

                    {/* EMAIL */}
                    <td>

                      <span
                        className="d-inline-flex align-items-center gap-1 text-muted"
                        style={{
                          fontSize: "0.85rem",
                        }}
                      >

                        <Mail size={13} />

                        {student.email}

                      </span>

                    </td>

                    {/* MOBILE */}
                    <td>

                      <span
                        className="d-inline-flex align-items-center gap-1 text-muted"
                        style={{
                          fontSize: "0.85rem",
                        }}
                      >

                        <Phone size={13} />

                        {student.mobileNumber}

                      </span>

                    </td>

                    {/* PROJECT */}
                    <td>

                      <span
                        className="d-inline-flex align-items-center gap-2 fw-medium"
                      >

                        <FolderKanban
                          size={16}
                          className="text-info"
                        />

                        {student.projectTitle}

                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-4 text-muted"
                  >
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

