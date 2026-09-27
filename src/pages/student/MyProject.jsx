
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Calendar,
    UserCheck,
    CheckCircle,
    Clock,
    AlertCircle,
    TrendingUp,
    FolderKanban
} from "lucide-react";


function MyProject() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const PROJECT_API = "http://localhost:5278/api/Projects";
    const USER_API = "http://localhost:5278/api/Users";


    // =========================================================
    // FETCH STUDENT PROJECTS
    // =========================================================

    useEffect(() => {
        fetchMyProjects();
    }, []);


    const fetchMyProjects = async () => {

        try {

            setLoading(true);
            setError("");


            // =====================================================
            // 1. GET LOGGED-IN USER FROM LOCAL STORAGE
            // =====================================================

            const storedUser =
                localStorage.getItem("user") ||
                localStorage.getItem("currentUser") ||
                localStorage.getItem("loggedInUser");


            let loggedInUser = null;


            if (storedUser) {

                try {

                    loggedInUser = JSON.parse(storedUser);

                } catch (parseError) {

                    console.log("User JSON parse error:", parseError);

                }

            }


            const loginEmail =
                loggedInUser?.email ||
                loggedInUser?.Email ||
                localStorage.getItem("email") ||
                localStorage.getItem("userEmail");


            const loginName =
                loggedInUser?.name ||
                loggedInUser?.fullName ||
                loggedInUser?.FullName ||
                localStorage.getItem("name") ||
                localStorage.getItem("userName");


            console.log("Logged-in Email:", loginEmail);
            console.log("Logged-in Name:", loginName);


            // =====================================================
            // 2. GET ALL USERS
            // =====================================================

            const userResponse = await axios.get(USER_API);


            let users = userResponse.data;


            if (!Array.isArray(users)) {

                if (Array.isArray(users?.data)) {

                    users = users.data;

                } else if (Array.isArray(users?.users)) {

                    users = users.users;

                } else {

                    users = [];

                }

            }


            console.log("Users:", users);


            // =====================================================
            // 3. FIND LOGGED-IN STUDENT
            // =====================================================

            const currentStudent = users.find((user) => {

                const email =
                    user.email ||
                    user.Email ||
                    "";


                const name =
                    user.fullName ||
                    user.FullName ||
                    user.name ||
                    user.Name ||
                    "";


                const emailMatch =
                    loginEmail &&
                    String(email).trim().toLowerCase() ===
                    String(loginEmail).trim().toLowerCase();


                const nameMatch =
                    loginName &&
                    String(name).trim().toLowerCase() ===
                    String(loginName).trim().toLowerCase();


                return emailMatch || nameMatch;

            });


            console.log("Current Student:", currentStudent);


            // =====================================================
            // 4. STUDENT NOT FOUND
            // =====================================================

            if (!currentStudent) {

                setError("Student record not found.");
                setProjects([]);

                return;

            }


            // =====================================================
            // 5. GET STUDENT ID
            // =====================================================

            const studentId =
                currentStudent.userId ??
                currentStudent.UserId ??
                currentStudent.studentId ??
                currentStudent.StudentId;


            console.log("Student ID:", studentId);


            if (!studentId) {

                setError("Student ID not found.");
                setProjects([]);

                return;

            }


            // =====================================================
            // 6. GET ALL PROJECTS
            // =====================================================

            const projectResponse =
                await axios.get(PROJECT_API);


            let allProjects = projectResponse.data;


            if (!Array.isArray(allProjects)) {

                if (Array.isArray(allProjects?.data)) {

                    allProjects = allProjects.data;

                } else if (Array.isArray(allProjects?.projects)) {

                    allProjects = allProjects.projects;

                } else {

                    allProjects = [];

                }

            }


            console.log("All Projects:", allProjects);


            // =====================================================
            // 7. FILTER PROJECTS FOR CURRENT STUDENT
            // =====================================================

            const myProjects = allProjects.filter((project) => {

                const projectStudentId =
                    project.studentId ??
                    project.StudentId;


                return (
                    Number(projectStudentId) ===
                    Number(studentId)
                );

            });


            console.log("My Projects:", myProjects);


            // =====================================================
            // 8. ADD FACULTY NAME
            // =====================================================

            const projectsWithFaculty = myProjects.map((project) => {

                const facultyId =
                    project.facultyId ??
                    project.FacultyId;


                const faculty = users.find((user) => {

                    const userId =
                        user.userId ??
                        user.UserId ??
                        user.facultyId ??
                        user.FacultyId;


                    return (
                        Number(userId) ===
                        Number(facultyId)
                    );

                });


                const facultyName =
                    faculty?.fullName ||
                    faculty?.FullName ||
                    faculty?.name ||
                    faculty?.Name ||
                    "Faculty Not Found";


                return {
                    ...project,
                    facultyName
                };

            });


            console.log(
                "My Projects With Faculty:",
                projectsWithFaculty
            );


            // =====================================================
            // 9. SET PROJECTS
            // =====================================================

            setProjects(projectsWithFaculty);

        }

        catch (err) {

            console.error(
                "MyProject Error:",
                err
            );


            if (err.response) {

                setError(
                    `API Error: ${err.response.status}`
                );

            } else {

                setError(
                    "Unable to connect with backend."
                );

            }


            setProjects([]);

        }

        finally {

            setLoading(false);

        }

    };


    // =========================================================
    // STATUS BADGE
    // =========================================================

    const getStatusBadge = (status) => {

        const statusNumber = Number(status);


        if (statusNumber === 2) {

            return (
                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1 border border-success-subtle">

                    <CheckCircle size={14} />

                    Completed

                </span>
            );

        }


        if (statusNumber === 1) {

            return (
                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1 border border-primary-subtle">

                    <Clock size={14} />

                    In Progress

                </span>
            );

        }


        return (
            <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1 border border-warning-subtle">

                <AlertCircle size={14} />

                Pending

            </span>
        );

    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {

            return "Not available";

        }


        const parsedDate = new Date(date);


        if (isNaN(parsedDate.getTime())) {

            return "Not available";

        }


        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="container-fluid px-0 py-5">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    >
                    </div>


                    <p className="text-muted">
                        Loading your project...
                    </p>

                </div>

            </div>
        );

    }


    // =========================================================
    // MAIN UI
    // =========================================================

    return (

        <div className="container-fluid px-0 py-3">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                <div>

                    <h4 className="mb-1 fw-semibold text-dark fs-5">
                        My Assigned Project
                    </h4>


                    <p
                        className="text-muted mb-0"
                        style={{
                            fontSize: "0.875rem"
                        }}
                    >
                        View your assigned project details,
                        faculty guide, timeline and progress.
                    </p>

                </div>


                <div className="d-flex align-items-center gap-2">

                    <FolderKanban
                        size={22}
                        className="text-primary"
                    />


                    <span className="text-muted small">

                        {projects.length} Project
                        {projects.length !== 1 ? "s" : ""}

                    </span>

                </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="alert alert-danger rounded-0 border-0">

                    <AlertCircle
                        size={18}
                        className="me-2"
                    />

                    {error}

                </div>

            )}


            {/* =================================================
                NO PROJECT
            ================================================= */}

            {!error && projects.length === 0 && (

                <div className="card border-0 shadow-sm rounded-0">

                    <div className="card-body text-center py-5">

                        <FolderKanban
                            size={50}
                            className="text-muted mb-3"
                        />


                        <h5 className="fw-semibold">
                            No Project Assigned
                        </h5>


                        <p className="text-muted mb-0">
                            You currently don't have any
                            project assigned.
                        </p>

                    </div>

                </div>

            )}


            {/* =================================================
                PROJECT LIST
            ================================================= */}

            {projects.map((project, index) => {


                const title =
                    project.projectTitle ||
                    project.ProjectTitle ||
                    "Untitled Project";


                const description =
                    project.description ||
                    project.Description ||
                    "No description available.";


                const facultyName =
                    project.facultyName ||
                    "Faculty Not Found";


                const startDate =
                    project.startDate ||
                    project.StartDate;


                const endDate =
                    project.endDate ||
                    project.EndDate;


                const assignedDate =
                    project.assignedDate ||
                    project.AssignedDate;


                const progress =
                    Number(
                        project.progressPercentage ??
                        project.ProgressPercentage ??
                        0
                    );


                const totalTasks =
                    project.totalTasks ??
                    project.TotalTasks ??
                    0;


                const completedTasks =
                    project.completedTasks ??
                    project.CompletedTasks ??
                    0;


                return (

                    <div
                        className="card border-0 shadow-sm rounded-0 bg-white mb-4"
                        key={
                            project.projectId ||
                            project.ProjectId ||
                            index
                        }
                    >


                        <div className="card-body p-4 p-lg-5">


                            {/* =====================================
                                PROJECT TITLE
                            ===================================== */}

                            <div className="d-flex justify-content-between align-items-start mb-4">

                                <div>

                                    <span
                                        className="text-uppercase text-success fw-medium d-block mb-1"
                                        style={{
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.08em"
                                        }}
                                    >
                                        Project Title
                                    </span>


                                    <h3
                                        className="fw-semibold text-dark mb-0"
                                        style={{
                                            fontSize: "1.3rem"
                                        }}
                                    >
                                        {title}
                                    </h3>

                                </div>


                                {getStatusBadge(
                                    project.projectStatus ??
                                    project.ProjectStatus
                                )}

                            </div>


                            {/* =====================================
                                DESCRIPTION
                            ===================================== */}

                            <div className="mb-4">

                                <p
                                    className="text-secondary mb-0"
                                    style={{
                                        lineHeight: "1.7",
                                        fontSize: "0.95rem"
                                    }}
                                >
                                    {description}
                                </p>

                            </div>


                            <hr className="text-muted opacity-10 my-4" />


                            {/* =====================================
                                DETAILS
                            ===================================== */}

                            <div className="row g-4 mb-4">


                                {/* FACULTY */}

                                <div className="col-sm-6 col-lg-3">

                                    <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                        <div
                                            className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium"
                                            style={{
                                                fontSize: "0.8rem"
                                            }}
                                        >

                                            <UserCheck
                                                size={16}
                                                className="text-primary"
                                            />

                                            Faculty Guide

                                        </div>


                                        <div
                                            className="fw-medium text-dark"
                                            style={{
                                                fontSize: "0.9rem"
                                            }}
                                        >
                                            Prof. {facultyName}
                                        </div>

                                    </div>

                                </div>


                                {/* ASSIGNED DATE */}

                                <div className="col-sm-6 col-lg-3">

                                    <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                        <div
                                            className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium"
                                            style={{
                                                fontSize: "0.8rem"
                                            }}
                                        >

                                            <Calendar
                                                size={16}
                                                className="text-warning"
                                            />

                                            Assigned Date

                                        </div>


                                        <div className="fw-medium text-dark">

                                            {formatDate(
                                                assignedDate
                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* START DATE */}

                                <div className="col-sm-6 col-lg-3">

                                    <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                        <div
                                            className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium"
                                            style={{
                                                fontSize: "0.8rem"
                                            }}
                                        >

                                            <Calendar
                                                size={16}
                                                className="text-success"
                                            />

                                            Start Date

                                        </div>


                                        <div className="fw-medium text-dark">

                                            {formatDate(
                                                startDate
                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* END DATE */}

                                <div className="col-sm-6 col-lg-3">

                                    <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                        <div
                                            className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium"
                                            style={{
                                                fontSize: "0.8rem"
                                            }}
                                        >

                                            <Calendar
                                                size={16}
                                                className="text-danger"
                                            />

                                            End Date

                                        </div>


                                        <div className="fw-medium text-dark">

                                            {formatDate(
                                                endDate
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =====================================
                                TASKS
                            ===================================== */}

                            <div className="row g-4 mb-4">


                                {/* TOTAL TASKS */}

                                <div className="col-md-6">

                                    <div className="p-3 border bg-light">

                                        <div className="text-muted small">
                                            Total Tasks
                                        </div>


                                        <div className="fs-5 fw-semibold">
                                            {totalTasks}
                                        </div>

                                    </div>

                                </div>


                                {/* COMPLETED TASKS */}

                                <div className="col-md-6">

                                    <div className="p-3 border bg-light">

                                        <div className="text-muted small">
                                            Completed Tasks
                                        </div>


                                        <div className="fs-5 fw-semibold text-success">
                                            {completedTasks}
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <hr className="text-muted opacity-10 my-4" />


                            {/* =====================================
                                PROGRESS
                            ===================================== */}

                            <div>

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <span
                                        className="fw-medium text-dark d-flex align-items-center gap-2"
                                        style={{
                                            fontSize: "0.875rem"
                                        }}
                                    >

                                        <TrendingUp
                                            size={16}
                                            className="text-primary"
                                        />

                                        Overall Progress

                                    </span>


                                    <span className="fw-semibold text-primary">

                                        {progress}%

                                    </span>

                                </div>


                                <div
                                    className="progress bg-light rounded-0"
                                    style={{
                                        height: "6px"
                                    }}
                                >

                                    <div
                                        className="progress-bar bg-primary rounded-0"
                                        style={{
                                            width: `${Math.min(
                                                Math.max(progress, 0),
                                                100
                                            )}%`
                                        }}
                                    >
                                    </div>

                                </div>

                            </div>


                        </div>

                    </div>

                );

            })}


        </div>

    );

}


export default MyProject;

