import React, { useState, useEffect } from "react";
import DashboardCard from "../../components/DashboardCard";

import {
    GraduationCap,
    Users,
    FolderKanban,
    Clock3,
    CheckCircle,
    FileText,
    BarChart2,
    PieChart
} from "lucide-react";

// Chart.js imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// APIs
const API_ROLE_COUNTS = "http://localhost:5278/api/Users/role-counts";
const API_PROJECTS = "http://localhost:5278/api/Projects";
const API_TASKS = "http://localhost:5278/api/Tasks";

function Dashboard() {

    const [roleCounts, setRoleCounts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all dashboard data
    useEffect(() => {

        Promise.all([
            fetch(API_ROLE_COUNTS).then(res => res.json()),
            fetch(API_PROJECTS).then(res => res.json()),
            fetch(API_TASKS).then(res => res.json())
        ])
            .then(([rolesData, projectsData, tasksData]) => {

                setRoleCounts(rolesData);
                setProjects(projectsData);
                setTasks(tasksData);

                setLoading(false);
            })
            .catch((error) => {

                console.error("Error fetching dashboard data:", error);
                setLoading(false);

            });

    }, []);

    // Get users count by role
    const getCountByRoleName = (name) => {

        const found = roleCounts.find(
            r => r.roleName?.toLowerCase() === name.toLowerCase()
        );

        return found ? found.count : 0;
    };

    // ==========================================
    // PROJECT COUNTS
    // ==========================================

    // Total Projects
    const totalProjects = projects.length;

    // ProjectStatus = 0 => Pending
    const pendingProjects = projects.filter(
        p => p.projectStatus === 0
    ).length;

    // ProjectStatus = 1 => In Progress
    const inProgressProjects = projects.filter(
        p => p.projectStatus === 1
    ).length;

    // ProjectStatus = 2 => Completed
    const completedProjects = projects.filter(
        p => p.projectStatus === 2
    ).length;

    // ==========================================
    // TASK COUNTS
    // ==========================================

    // Active tasks = tasks which are not completed
    const activeTasks = tasks.filter(
        t => t.status?.toLowerCase() !== "completed"
    ).length;

    // ==========================================
    // PROJECT STATUS PIE CHART
    // ==========================================

    const projectStatusData = {

        labels: [
           
            "In Progress",
            "Completed"
        ],

        datasets: [
            {
                data: [
                    inProgressProjects,
                    completedProjects
                ],

                backgroundColor: [
                    "#17a2b8",
                    "#28a745"
                ],

                borderWidth: 1,
            },
        ],
    };

    const projectStatusOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                position: "bottom",
            },

        },

    };

    // ==========================================
    // USERS BY ROLE BAR CHART
    // ==========================================

    const usersByRoleData = {

        labels: roleCounts.map(
            r => r.roleName
        ),

        datasets: [

            {
                label: "Count",

                data: roleCounts.map(
                    r => r.count
                ),

                backgroundColor: [
                    "#6c757d",
                    "#17a2b8",
                    "#4f7ea3",
                    "#28a745"
                ],

                borderWidth: 1,
            },

        ],

    };

    const usersByRoleOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false,
            },

        },

    };

    // ==========================================
    // UI
    // ==========================================

    return (

        <div
            className="container-fluid py-2"
            style={{ color: "var(--spms-text)" }}
        >

            {/* DASHBOARD HEADER */}

            <div className="mb-4">

                <h4 className="mb-1 fs-5 fw-bold">
                    Admin Dashboard
                </h4>

                <p
                    className="text-muted mb-0"
                    style={{ fontSize: "0.85rem" }}
                >
                    Overview of student metrics, project progress,
                    and system statistics.
                </p>

            </div>


            {/* ==========================================
                TOP METRICS ROW
            ========================================== */}

            <div className="row g-4 mb-4">

                {/* Total Students */}

                <div className="col-xl-3 col-md-6">

                    <DashboardCard
                        title="Total Students"
                        value={
                            loading
                                ? "Loading..."
                                : getCountByRoleName("Student")
                        }
                        icon={
                            <GraduationCap size={30} />
                        }
                        color="primary"
                    />

                </div>


                {/* Total Faculty */}

                <div className="col-xl-3 col-md-6">

                    <DashboardCard
                        title="Total Faculty"
                        value={
                            loading
                                ? "Loading..."
                                : getCountByRoleName("staff")
                        }
                        icon={
                            <Users size={30} />
                        }
                        color="info"
                    />

                </div>


                {/* Total Projects */}

                <div className="col-xl-3 col-md-6">

                    <DashboardCard
                        title="Total Projects"
                        value={
                            loading
                                ? "Loading..."
                                : totalProjects
                        }
                        icon={
                            <FolderKanban size={30} />
                        }
                        color="success"
                    />

                </div>


              

            </div>


            {/* ==========================================
                SECONDARY METRICS ROW
            ========================================== */}

            <div className="row g-4 mb-4">

                {/* Completed Projects */}

                <div className="col-xl-4 col-md-6">

                    <DashboardCard
                        title="Completed Projects"
                        value={
                            loading
                                ? "Loading..."
                                : completedProjects
                        }
                        icon={
                            <CheckCircle size={30} />
                        }
                        color="dark"
                    />

                </div>


                {/* Active Tasks */}

                <div className="col-xl-4 col-md-6">

                    <DashboardCard
                        title="Active Tasks"
                        value={
                            loading
                                ? "Loading..."
                                : activeTasks
                        }
                        icon={
                            <FileText size={30} />
                        }
                        color="primary"
                    />

                </div>


                {/* In Progress Projects */}

                <div className="col-xl-4 col-md-6">

                    <DashboardCard
                        title="In Progress Projects"
                        value={
                            loading
                                ? "Loading..."
                                : inProgressProjects
                        }
                        icon={
                            <FolderKanban size={30} />
                        }
                        color="info"
                    />

                </div>

            </div>


            {/* ==========================================
                CHARTS
            ========================================== */}

            <div className="row g-4 mb-3">


                {/* PROJECT STATUS PIE CHART */}

                <div className="col-xl-6">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            backgroundColor: "var(--spms-card)",
                            borderRadius: "0px",
                            border: "1px solid var(--spms-border)"
                        }}
                    >

                        {/* Header */}

                        <div
                            className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
                            style={{
                                backgroundColor: "var(--spms-heading)",
                                color: "var(--spms-text)",
                                borderRadius: "0px"
                            }}
                        >

                            <PieChart size={18} />

                            Project Status

                        </div>


                        {/* Chart */}

                        <div
                            className="p-4"
                            style={{
                                height: "280px",
                                position: "relative"
                            }}
                        >

                            <Pie
                                data={projectStatusData}
                                options={projectStatusOptions}
                            />

                        </div>

                    </div>

                </div>


                {/* USERS BY ROLE BAR CHART */}

                <div className="col-xl-6">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            backgroundColor: "var(--spms-card)",
                            borderRadius: "0px",
                            border: "1px solid var(--spms-border)"
                        }}
                    >

                        {/* Header */}

                        <div
                            className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
                            style={{
                                backgroundColor: "var(--spms-heading)",
                                color: "var(--spms-text)",
                                borderRadius: "0px"
                            }}
                        >

                            <BarChart2 size={18} />

                            Users by Role

                        </div>


                        {/* Chart */}

                        <div
                            className="p-4"
                            style={{
                                height: "280px",
                                position: "relative"
                            }}
                        >

                            <Bar
                                data={usersByRoleData}
                                options={usersByRoleOptions}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;