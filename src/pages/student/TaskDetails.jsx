
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    CheckCircle,
    Clock,
    AlertCircle,
    Calendar,
    Flag,
    ArrowRight,
    TrendingUp,
    ArrowLeft,
    Award,
    MessageSquare,
    FolderKanban
} from "lucide-react";


// ======================================================
// TASK DETAILS
// ======================================================

function TaskDetails({ task, projectTitle, onBack }) {

    const getStatusBadge = (status) => {

        const value = Number(status);

        if (value === 3) {
            return (
                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-0">
                    <CheckCircle size={14} className="me-1" />
                    Completed
                </span>
            );
        }

        if (value === 2) {
            return (
                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-0">
                    <Clock size={14} className="me-1" />
                    In Progress
                </span>
            );
        }

        return (
            <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-0">
                <AlertCircle size={14} className="me-1" />
                Pending
            </span>
        );
    };


    const getPriority = (priority) => {

        const value = Number(priority);

        if (value === 3) {
            return (
                <span className="text-danger fw-medium">
                    High
                </span>
            );
        }

        if (value === 2) {
            return (
                <span className="text-warning fw-medium">
                    Medium
                </span>
            );
        }

        return (
            <span className="text-success fw-medium">
                Low
            </span>
        );
    };


    const formatDate = (date) => {

        if (!date) {
            return "Not Specified";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };


    return (
        <div className="container-fluid px-0 py-3">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                <div className="d-flex align-items-center gap-3">

                    <button
                        className="btn btn-outline-secondary rounded-0 btn-sm d-flex align-items-center gap-1"
                        onClick={onBack}
                    >
                        <ArrowLeft size={16} />
                        Back to Tasks
                    </button>

                    <div>

                        <h4 className="mb-1 fw-semibold text-dark fs-5">
                            Task Details
                        </h4>

                        <p
                            className="text-muted mb-0"
                            style={{ fontSize: "0.875rem" }}
                        >
                            Task #{task.taskId}
                        </p>

                    </div>

                </div>

                <div>
                    {getStatusBadge(task.status)}
                </div>

            </div>


            {/* PROJECT */}

            <div className="card border-0 shadow-sm rounded-0 mb-4">

                <div className="card-body p-3">

                    <div className="d-flex align-items-center gap-2">

                        <FolderKanban
                            size={18}
                            className="text-primary"
                        />

                        <span className="text-muted">
                            Project:
                        </span>

                        <span className="fw-semibold text-dark">
                            {projectTitle}
                        </span>

                    </div>

                </div>

            </div>


            {/* TASK INFORMATION */}

            <div className="card border-0 shadow-sm rounded-0 bg-white">

                <div className="card-body p-4 p-lg-5">

                    {/* TITLE */}

                    <div className="mb-4">

                        <span
                            className="text-uppercase text-primary fw-medium d-block mb-1"
                            style={{
                                fontSize: "0.7rem",
                                letterSpacing: "0.08em"
                            }}
                        >
                            Task Title
                        </span>

                        <h3
                            className="fw-semibold text-dark mb-3"
                            style={{ fontSize: "1.3rem" }}
                        >
                            {task.taskTitle}
                        </h3>

                        <p
                            className="text-secondary mb-0"
                            style={{
                                lineHeight: "1.7",
                                fontSize: "0.95rem"
                            }}
                        >
                            {task.taskDescription ||
                                "No description available."}
                        </p>

                    </div>


                    <hr className="text-muted opacity-10 my-4" />


                    {/* INFORMATION GRID */}

                    <div className="row g-4 mb-4">

                        {/* PRIORITY */}

                        <div className="col-sm-6 col-lg-3">

                            <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium">

                                    <Flag
                                        size={16}
                                        className="text-warning"
                                    />

                                    Priority

                                </div>

                                {getPriority(task.priority)}

                            </div>

                        </div>


                        {/* SCORE */}

                        <div className="col-sm-6 col-lg-3">

                            <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium">

                                    <Award
                                        size={16}
                                        className="text-primary"
                                    />

                                    Score

                                </div>

                                <div className="fw-medium text-dark">

                                    {task.earnedScore ?? "--"}
                                    {" / "}
                                    {task.assignedScore ?? 0}
                                    {" Marks"}

                                </div>

                            </div>

                        </div>


                        {/* START DATE */}

                        <div className="col-sm-6 col-lg-3">

                            <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium">

                                    <Calendar
                                        size={16}
                                        className="text-success"
                                    />

                                    Start Date

                                </div>

                                <div className="fw-medium text-dark">

                                    {formatDate(task.startDate)}

                                </div>

                            </div>

                        </div>


                        {/* DUE DATE */}

                        <div className="col-sm-6 col-lg-3">

                            <div className="p-3 bg-light bg-opacity-50 border border-light h-100">

                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium">

                                    <Calendar
                                        size={16}
                                        className="text-danger"
                                    />

                                    Due Date

                                </div>

                                <div className="fw-medium text-dark">

                                    {formatDate(task.dueDate)}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PROGRESS */}

                    <div className="mb-4">

                        <div className="d-flex justify-content-between align-items-center mb-2">

                            <span
                                className="fw-medium text-dark d-flex align-items-center gap-2"
                                style={{ fontSize: "0.875rem" }}
                            >

                                <TrendingUp
                                    size={16}
                                    className="text-primary"
                                />

                                Task Progress

                            </span>

                            <span className="fw-semibold text-primary">

                                {task.progress ?? 0}%

                            </span>

                        </div>


                        <div
                            className="progress bg-light rounded-0"
                            style={{ height: "6px" }}
                        >

                            <div
                                className="progress-bar bg-primary rounded-0"
                                style={{
                                    width: `${task.progress ?? 0}%`
                                }}
                            />

                        </div>

                    </div>


                    {/* FACULTY REMARKS */}

                    {task.facultyRemarks && (

                        <div className="p-3 bg-light border-start border-4 border-primary">

                            <div className="d-flex align-items-center gap-2 text-dark fw-medium mb-2">

                                <MessageSquare
                                    size={16}
                                    className="text-primary"
                                />

                                Faculty Remarks

                            </div>

                            <p className="text-secondary mb-0">

                                {task.facultyRemarks}

                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}


// ======================================================
// MAIN COMPONENT
// ======================================================

function TaskListDashboard() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedTask, setSelectedTask] = useState(null);

    const [selectedProjectTitle, setSelectedProjectTitle] =
        useState("");


    // ==================================================
    // API URLS
    // ==================================================

    const USERS_API =
        "http://localhost:5278/api/Users";

    const PROJECTS_API =
        "http://localhost:5278/api/Projects";

    const TASKS_API =
        "http://localhost:5278/api/Tasks";


    // ==================================================
    // LOAD DATA
    // ==================================================

    useEffect(() => {

        loadData();

    }, []);


    const loadData = async () => {

        try {

            setLoading(true);

            setError("");


            // ==========================================
            // GET LOGGED-IN USER
            // ==========================================

            const storedUser =
                localStorage.getItem("user") ||
                localStorage.getItem("currentUser") ||
                localStorage.getItem("loggedInUser");


            let loginUser = null;


            if (storedUser) {

                try {

                    loginUser =
                        JSON.parse(storedUser);

                }
                catch (error) {

                    console.log(
                        "User JSON parse error"
                    );

                }

            }


            const loginEmail =
                loginUser?.email ||
                loginUser?.Email ||
                localStorage.getItem("email") ||
                localStorage.getItem("userEmail");


            const loginName =
                loginUser?.name ||
                loginUser?.Name ||
                loginUser?.fullName ||
                loginUser?.FullName ||
                localStorage.getItem("name") ||
                localStorage.getItem("userName");


            console.log(
                "Logged-in Email:",
                loginEmail
            );

            console.log(
                "Logged-in Name:",
                loginName
            );


            // ==========================================
            // USERS API
            // ==========================================

            const usersResponse =
                await axios.get(USERS_API);


            let users = usersResponse.data;


            if (!Array.isArray(users)) {

                users =
                    users?.data ||
                    users?.users ||
                    [];

            }


            // ==========================================
            // FIND LOGGED-IN STUDENT
            // ==========================================

            const currentUser =
                users.find((user) => {

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
                        email.toLowerCase() ===
                        loginEmail.toLowerCase();


                    const nameMatch =
                        loginName &&
                        name.toLowerCase() ===
                        loginName.toLowerCase();


                    return emailMatch || nameMatch;

                });


            if (!currentUser) {

                setError(
                    "Logged-in student not found in Users API."
                );

                return;

            }


            const studentId =
                currentUser.userId ??
                currentUser.UserId ??
                currentUser.studentId ??
                currentUser.StudentId;


            console.log(
                "Current Student ID:",
                studentId
            );


            // ==========================================
            // PROJECTS API
            // ==========================================

            const projectsResponse =
                await axios.get(PROJECTS_API);


            let allProjects =
                projectsResponse.data;


            if (!Array.isArray(allProjects)) {

                allProjects =
                    allProjects?.data ||
                    allProjects?.projects ||
                    [];

            }


            console.log(
                "Projects API Response:",
                allProjects
            );


            // ==========================================
            // ONLY CURRENT STUDENT PROJECTS
            // ==========================================

            const studentProjects =
                allProjects.filter((project) => {

                    const projectStudentId =
                        project.studentId ??
                        project.StudentId;


                    return (
                        Number(projectStudentId) ===
                        Number(studentId)
                    );

                });


            console.log(
                "My Projects:",
                studentProjects
            );


            // ==========================================
            // TASKS API
            // ==========================================

            const tasksResponse =
                await axios.get(TASKS_API);


            let allTasks =
                tasksResponse.data;


            if (!Array.isArray(allTasks)) {

                allTasks =
                    allTasks?.data ||
                    allTasks?.tasks ||
                    [];

            }


            console.log(
                "Tasks API Response:",
                allTasks
            );


            // ==========================================
            // CONNECT PROJECT → TASK
            // ==========================================

            const finalProjects =
                studentProjects.map((project) => {

                    const projectId =
                        project.projectId ??
                        project.ProjectId;


                    /*
                        Your Tasks API has allocationId.

                        We check possible projectId fields
                        in task also.

                        If task directly contains projectId,
                        it will work immediately.

                        Otherwise allocationId is compared
                        with projectId.
                    */

                    const projectTasks =
                        allTasks.filter((task) => {

                            const taskProjectId =
                                task.projectId ??
                                task.ProjectId;


                            const taskAllocationId =
                                task.allocationId ??
                                task.AllocationId;


                            // Direct projectId relation
                            if (
                                taskProjectId !== undefined &&
                                taskProjectId !== null
                            ) {

                                return (
                                    Number(taskProjectId) ===
                                    Number(projectId)
                                );

                            }


                            // allocationId relation
                            return (
                                Number(taskAllocationId) ===
                                Number(projectId)
                            );

                        });


                    return {

                        ...project,

                        tasks: projectTasks

                    };

                });


            console.log(
                "FINAL PROJECT DATA:",
                finalProjects
            );


            setProjects(finalProjects);

        }
        catch (error) {

            console.error(
                "API ERROR:",
                error
            );

            setError(
                "Something went wrong while loading projects and tasks."
            );

        }
        finally {

            setLoading(false);

        }

    };


    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (

            <div className="container-fluid px-0 py-5">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    />

                    <p className="text-muted mb-0">

                        Loading your projects and tasks...

                    </p>

                </div>

            </div>

        );

    }


    // ==================================================
    // TASK DETAILS
    // ==================================================

    if (selectedTask) {

        return (

            <TaskDetails
                task={selectedTask}
                projectTitle={selectedProjectTitle}
                onBack={() => {

                    setSelectedTask(null);

                    setSelectedProjectTitle("");

                }}
            />

        );

    }


    // ==================================================
    // PAGE
    // ==================================================

    return (

        <div className="container-fluid px-0 py-3">


            {/* PAGE HEADER */}

            <div className="mb-4 pb-3 border-bottom">

                <h4 className="mb-1 fw-semibold text-dark fs-5">

                    My Project Tasks

                </h4>

                <p
                    className="text-muted mb-0"
                    style={{
                        fontSize: "0.875rem"
                    }}
                >

                    View the tasks assigned to your projects.

                </p>

            </div>


            {/* ERROR */}

            {error && (

                <div className="alert alert-danger rounded-0">

                    <AlertCircle
                        size={18}
                        className="me-2"
                    />

                    {error}

                </div>

            )}


            {/* NO PROJECT */}

            {!error &&
                projects.length === 0 && (

                    <div className="card border-0 shadow-sm rounded-0">

                        <div className="card-body text-center py-5">

                            <FolderKanban
                                size={45}
                                className="text-muted mb-3"
                            />

                            <h5 className="fw-semibold">

                                No Project Assigned

                            </h5>

                            <p className="text-muted mb-0">

                                No project is currently
                                assigned to you.

                            </p>

                        </div>

                    </div>

                )}


            {/* PROJECT LIST */}

            {projects.map((project) => {

                const projectId =
                    project.projectId ??
                    project.ProjectId;


                const projectTitle =
                    project.projectTitle ??
                    project.ProjectTitle ??
                    "Untitled Project";


                const projectDescription =
                    project.description ??
                    project.Description ??
                    "";


                const projectTasks =
                    project.tasks || [];


                return (

                    <div
                        key={projectId}
                        className="mb-5"
                    >


                        {/* PROJECT HEADER */}

                        <div className="card border-0 shadow-sm rounded-0 mb-3">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <div
                                            className="text-uppercase text-primary fw-medium mb-1"
                                            style={{
                                                fontSize: "0.7rem",
                                                letterSpacing: "0.08em"
                                            }}
                                        >

                                            Assigned Project

                                        </div>

                                        <h5 className="fw-semibold mb-1">

                                            {projectTitle}

                                        </h5>

                                        {projectDescription && (

                                            <p
                                                className="text-muted mb-0"
                                                style={{
                                                    fontSize:
                                                        "0.85rem"
                                                }}
                                            >

                                                {projectDescription}

                                            </p>

                                        )}

                                    </div>


                                    <span className="badge bg-light text-dark rounded-0">

                                        {projectTasks.length}
                                        {" "}
                                        {projectTasks.length === 1
                                            ? "Task"
                                            : "Tasks"}

                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* TASKS */}

                        {projectTasks.length === 0 ? (

                            <div className="card border-0 shadow-sm rounded-0">

                                <div className="card-body text-center py-4">

                                    <p className="text-muted mb-0">

                                        No tasks assigned
                                        for this project.

                                    </p>

                                </div>

                            </div>

                        ) : (

                            <div className="row g-4">

                                {projectTasks.map((task) => {

                                    const taskId =
                                        task.taskId ??
                                        task.TaskId;


                                    const taskTitle =
                                        task.taskTitle ??
                                        task.TaskTitle ??
                                        "Untitled Task";


                                    const taskDescription =
                                        task.taskDescription ??
                                        task.TaskDescription ??
                                        "";


                                    const status =
                                        task.status ??
                                        task.Status;


                                    const priority =
                                        task.priority ??
                                        task.Priority;


                                    const progress =
                                        Number(
                                            task.progress ??
                                            task.Progress ??
                                            0
                                        );


                                    let priorityText =
                                        "Low";

                                    let priorityColor =
                                        "text-success";


                                    if (
                                        Number(priority) === 3
                                    ) {

                                        priorityText =
                                            "High";

                                        priorityColor =
                                            "text-danger";

                                    }
                                    else if (
                                        Number(priority) === 2
                                    ) {

                                        priorityText =
                                            "Medium";

                                        priorityColor =
                                            "text-warning";

                                    }


                                    return (

                                        <div
                                            className="col-md-6 col-lg-4"
                                            key={taskId}
                                        >

                                            <div className="card border-0 shadow-sm rounded-0 h-100">

                                                <div className="card-body p-4 d-flex flex-column">


                                                    {/* TOP */}

                                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                                        <span
                                                            className="text-muted fw-medium"
                                                            style={{
                                                                fontSize:
                                                                    "0.75rem"
                                                            }}
                                                        >

                                                            TASK #{taskId}

                                                        </span>


                                                        {Number(status) === 3 && (

                                                            <span className="badge bg-success-subtle text-success rounded-0">

                                                                <CheckCircle
                                                                    size={12}
                                                                    className="me-1"
                                                                />

                                                                Completed

                                                            </span>

                                                        )}


                                                        {Number(status) === 2 && (

                                                            <span className="badge bg-primary-subtle text-primary rounded-0">

                                                                <Clock
                                                                    size={12}
                                                                    className="me-1"
                                                                />

                                                                In Progress

                                                            </span>

                                                        )}


                                                        {Number(status) === 1 && (

                                                            <span className="badge bg-warning-subtle text-warning-emphasis rounded-0">

                                                                <AlertCircle
                                                                    size={12}
                                                                    className="me-1"
                                                                />

                                                                Pending

                                                            </span>

                                                        )}

                                                    </div>


                                                    {/* TASK TITLE */}

                                                    <h5
                                                        className="fw-semibold text-dark mb-2"
                                                        style={{
                                                            fontSize:
                                                                "1.05rem"
                                                        }}
                                                    >

                                                        {taskTitle}

                                                    </h5>


                                                    {/* DESCRIPTION */}

                                                    <p
                                                        className="text-secondary mb-3"
                                                        style={{
                                                            fontSize:
                                                                "0.875rem",
                                                            display:
                                                                "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                            overflow:
                                                                "hidden"
                                                        }}
                                                    >

                                                        {taskDescription ||
                                                            "No description available."}

                                                    </p>


                                                    <hr className="text-muted opacity-10 my-2" />


                                                    {/* DATE */}

                                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                                        <div
                                                            className="d-flex align-items-center gap-2 text-muted"
                                                            style={{
                                                                fontSize:
                                                                    "0.8rem"
                                                            }}
                                                        >

                                                            <Calendar
                                                                size={14}
                                                            />

                                                            {task.dueDate ||
                                                                task.DueDate
                                                                ? new Date(
                                                                    task.dueDate ||
                                                                    task.DueDate
                                                                ).toLocaleDateString(
                                                                    "en-IN"
                                                                )
                                                                : "No Deadline"}

                                                        </div>


                                                        {/* PRIORITY */}

                                                        <div
                                                            className={`d-flex align-items-center gap-1 ${priorityColor}`}
                                                            style={{
                                                                fontSize:
                                                                    "0.8rem"
                                                            }}
                                                        >

                                                            <Flag
                                                                size={14}
                                                            />

                                                            {priorityText}

                                                        </div>

                                                    </div>


                                                    {/* PROGRESS */}

                                                    <div className="mb-3">

                                                        <div className="d-flex justify-content-between mb-1">

                                                            <span
                                                                className="text-muted d-flex align-items-center gap-1"
                                                                style={{
                                                                    fontSize:
                                                                        "0.75rem"
                                                                }}
                                                            >

                                                                <TrendingUp
                                                                    size={12}
                                                                />

                                                                Progress

                                                            </span>


                                                            <span
                                                                className="fw-semibold"
                                                                style={{
                                                                    fontSize:
                                                                        "0.8rem"
                                                                }}
                                                            >

                                                                {progress}%

                                                            </span>

                                                        </div>


                                                        <div
                                                            className="progress bg-light rounded-0"
                                                            style={{
                                                                height:
                                                                    "4px"
                                                            }}
                                                        >

                                                            <div
                                                                className="progress-bar bg-primary"
                                                                style={{
                                                                    width:
                                                                        `${progress}%`
                                                                }}
                                                            />

                                                        </div>

                                                    </div>


                                                    {/* VIEW DETAILS */}

                                                    <div className="mt-auto pt-2 border-top">

                                                        <button
                                                            className="btn btn-link text-primary text-decoration-none p-0 d-flex align-items-center gap-1"
                                                            style={{
                                                                fontSize:
                                                                    "0.85rem"
                                                            }}
                                                            onClick={() => {

                                                                setSelectedTask({

                                                                    taskId:
                                                                        taskId,

                                                                    taskTitle:
                                                                        taskTitle,

                                                                    taskDescription:
                                                                        taskDescription,

                                                                    status:
                                                                        status,

                                                                    priority:
                                                                        priority,

                                                                    assignedScore:
                                                                        task.assignedScore ??
                                                                        task.AssignedScore,

                                                                    earnedScore:
                                                                        task.earnedScore ??
                                                                        task.EarnedScore,

                                                                    progress:
                                                                        progress,

                                                                    startDate:
                                                                        task.startDate ??
                                                                        task.StartDate,

                                                                    dueDate:
                                                                        task.dueDate ??
                                                                        task.DueDate,

                                                                    facultyRemarks:
                                                                        task.facultyRemarks ??
                                                                        task.FacultyRemarks

                                                                });


                                                                setSelectedProjectTitle(
                                                                    projectTitle
                                                                );

                                                            }}
                                                        >

                                                            View Details

                                                            <ArrowRight
                                                                size={14}
                                                            />

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        )}

                    </div>

                );

            })}

        </div>

    );

}

export default TaskListDashboard;

