import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardCard from "../../components/DashboardCard";

import {
    FolderKanban,
    Clock3,
    CheckCircle,
    TrendingUp,
    PieChart,
    BarChart2
} from "lucide-react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);


function Dashboard() {

    // ==========================================
    // STATE
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [projectCount, setProjectCount] = useState(0);
    const [pendingTasks, setPendingTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [progress, setProgress] = useState(0);


    // ==========================================
    // API
    // ==========================================

    const USERS_API =
        "http://localhost:5278/api/Users";

    const PROJECTS_API =
        "http://localhost:5278/api/Projects";

    const TASKS_API =
        "http://localhost:5278/api/Tasks";


    // ==========================================
    // LOAD DASHBOARD DATA
    // ==========================================

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);


            // ======================================
            // GET LOGIN USER
            // ======================================

            const storedUser =
                localStorage.getItem("user") ||
                localStorage.getItem("currentUser") ||
                localStorage.getItem("loggedInUser");


            let loginUser = null;


            if (storedUser) {

                try {

                    loginUser = JSON.parse(storedUser);

                } catch (error) {

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
                "Dashboard Login Email:",
                loginEmail
            );

            console.log(
                "Dashboard Login Name:",
                loginName
            );


            // ======================================
            // USERS API
            // ======================================

            const usersResponse =
                await axios.get(USERS_API);


            let users = usersResponse.data;


            if (!Array.isArray(users)) {

                users =
                    users?.data ||
                    users?.users ||
                    [];

            }


            // ======================================
            // FIND CURRENT USER
            // ======================================

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

                console.log(
                    "Current user not found"
                );

                return;

            }


            const studentId =
                currentUser.userId ??
                currentUser.UserId ??
                currentUser.studentId ??
                currentUser.StudentId;


            console.log(
                "Dashboard Student ID:",
                studentId
            );


            // ======================================
            // PROJECTS API
            // ======================================

            const projectsResponse =
                await axios.get(PROJECTS_API);


            let projects =
                projectsResponse.data;


            if (!Array.isArray(projects)) {

                projects =
                    projects?.data ||
                    projects?.projects ||
                    [];

            }


            // ======================================
            // CURRENT STUDENT PROJECTS
            // ======================================

            const myProjects =
                projects.filter((project) => {

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
                myProjects
            );


            setProjectCount(
                myProjects.length
            );


            // ======================================
            // TASKS API
            // ======================================

            const tasksResponse =
                await axios.get(TASKS_API);


            let tasks =
                tasksResponse.data;


            if (!Array.isArray(tasks)) {

                tasks =
                    tasks?.data ||
                    tasks?.tasks ||
                    [];

            }


            console.log(
                "All Tasks:",
                tasks
            );


            
            let myTasks = [];



            const tasksHaveStudentId =
                tasks.some((task) =>
                    task.studentId !== undefined ||
                    task.StudentId !== undefined
                );


            if (tasksHaveStudentId) {

                myTasks =
                    tasks.filter((task) => {

                        const taskStudentId =
                            task.studentId ??
                            task.StudentId;


                        return (
                            Number(taskStudentId) ===
                            Number(studentId)
                        );

                    });

            }


            // --------------------------------------
            // CASE 2:
            // Project → Task relation
            // --------------------------------------

            else {

                myTasks =
                    myProjects.flatMap((project) => {

                        const projectId =
                            project.projectId ??
                            project.ProjectId;


                        return tasks.filter((task) => {

                            const taskProjectId =
                                task.projectId ??
                                task.ProjectId;


                            const allocationId =
                                task.allocationId ??
                                task.AllocationId;


                            if (
                                taskProjectId !== undefined &&
                                taskProjectId !== null
                            ) {

                                return (
                                    Number(taskProjectId) ===
                                    Number(projectId)
                                );

                            }


                            return (
                                Number(allocationId) ===
                                Number(projectId)
                            );

                        });

                    });

            }


            console.log(
                "My Tasks:",
                myTasks
            );


            // ======================================
            // REMOVE DUPLICATE TASKS
            // ======================================

            myTasks =
                myTasks.filter(
                    (task, index, self) =>
                        index ===
                        self.findIndex(
                            (t) =>
                                (
                                    t.taskId ??
                                    t.TaskId
                                ) ===
                                (
                                    task.taskId ??
                                    task.TaskId
                                )
                        )
                );


            // ======================================
            // PENDING TASKS
            // ======================================

            const pending =
                myTasks.filter((task) => {

                    const status =
                        task.status ??
                        task.Status ??
                        task.taskStatus ??
                        task.TaskStatus;


                    return Number(status) !== 3;

                });


            // ======================================
            // COMPLETED TASKS
            // ======================================

            const completed =
                myTasks.filter((task) => {

                    const status =
                        task.status ??
                        task.Status ??
                        task.taskStatus ??
                        task.TaskStatus;


                    return Number(status) === 3;

                });


            setPendingTasks(
                pending.length
            );


            setCompletedTasks(
                completed.length
            );


            // ======================================
            // PROJECT PROGRESS
            // ======================================

            let projectProgress = 0;


            if (myProjects.length > 0) {

                const totalProgress =
                    myProjects.reduce(
                        (total, project) => {

                            return (
                                total +
                                Number(
                                    project.progressPercentage ??
                                    project.ProgressPercentage ??
                                    0
                                )
                            );

                        },
                        0
                    );


                projectProgress =
                    Math.round(
                        totalProgress /
                        myProjects.length
                    );

            }


            setProgress(
                projectProgress
            );


        } catch (error) {

            console.error(
                "Dashboard API Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // CHART DATA
    // ==========================================

    const projectProgressData = {

        labels: [
            "Completed",
            "Remaining"
        ],

        datasets: [
            {
                data: [
                    progress,
                    100 - progress
                ],

                backgroundColor: [
                    "#28a745",
                    "#ffc107"
                ],

                borderWidth: 1
            }
        ]

    };


    const pieOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                position: "bottom"
            }

        }

    };


    const taskData = {

        labels: [
            "Pending",
            "Completed"
        ],

        datasets: [
            {
                label: "Tasks",

                data: [
                    pendingTasks,
                    completedTasks
                ],

                backgroundColor: [
                    "#ffc107",
                    "#28a745"
                ]

            }
        ]

    };


    const barOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div
                className="container-fluid py-5 text-center"
            >

                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                />

                <p className="text-muted">
                    Loading dashboard...
                </p>

            </div>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div
            className="container-fluid py-2"
            style={{
                color: "var(--spms-text)"
            }}
        >


            {/* HEADER */}

            <div className="mb-4">

                <h4 className="mb-1 fs-5 fw-bold">
                    Student Dashboard
                </h4>

                <p
                    className="text-muted mb-0"
                    style={{
                        fontSize: "0.85rem"
                    }}
                >
                    Overview of your project progress
                    and tasks.
                </p>

            </div>


            {/* CARDS */}

            <div className="row g-4 mb-4">


                {/* PROJECT */}

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="My Project"

                        value={projectCount}

                        icon={
                            <FolderKanban
                                size={30}
                            />
                        }

                        color="primary"

                    />

                </div>


                {/* PENDING */}

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Pending Tasks"

                        value={pendingTasks}

                        icon={
                            <Clock3
                                size={30}
                            />
                        }

                        color="warning"

                    />

                </div>


                {/* COMPLETED */}

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Completed Tasks"

                        value={completedTasks}

                        icon={
                            <CheckCircle
                                size={30}
                            />
                        }

                        color="success"

                    />

                </div>


                {/* PROGRESS */}

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Progress"

                        value={`${progress}%`}

                        icon={
                            <TrendingUp
                                size={30}
                            />
                        }

                        color="info"

                    />

                </div>


            </div>


            {/* CHARTS */}

            <div className="row g-4">


                {/* PROJECT PROGRESS */}

                <div className="col-xl-6">

                    <div className="card border-0 shadow-sm">

                        <div
                            className="p-3 fw-bold d-flex gap-2"
                        >

                            <PieChart size={18} />

                            Project Progress

                        </div>


                        <div
                            className="p-4"
                            style={{
                                height: "280px"
                            }}
                        >

                            <Pie
                                data={
                                    projectProgressData
                                }
                                options={
                                    pieOptions
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* TASK STATUS */}

                <div className="col-xl-6">

                    <div className="card border-0 shadow-sm">

                        <div
                            className="p-3 fw-bold d-flex gap-2"
                        >

                            <BarChart2 size={18} />

                            Task Status

                        </div>


                        <div
                            className="p-4"
                            style={{
                                height: "280px"
                            }}
                        >

                            <Bar
                                data={taskData}
                                options={barOptions}
                            />

                        </div>

                    </div>

                </div>


            </div>


        </div>

    );

}


export default Dashboard;