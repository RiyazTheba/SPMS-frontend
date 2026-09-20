import React from "react";
import DashboardCard from "../../components/DashboardCard";
import {
    Users,
    FolderKanban,
    Clock3,
    CheckCircle,
    FileText,
    BarChart2,
    PieChart,
    BookOpen
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
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

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

function Dashboard() {
    // 1. Guided Project Status (Pie Chart)
    const projectStatusData = {
        labels: ['Pending Review', 'In Progress', 'Completed'],
        datasets: [
            {
                data: [5, 10, 15],
                backgroundColor: [
                    '#ffc107', // Yellow (Pending)
                    '#17a2b8', // Blue (In Progress)
                    '#28a745', // Green (Completed)
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
                position: 'bottom',
            },
        },
    };

    // 2. Student Submissions per Project (Bar Chart)
    const submissionsData = {
        labels: ['Project Alpha', 'Beta System', 'Gamma App', 'Delta Portal'],
        datasets: [
            {
                label: 'Tasks Submitted',
                data: [12, 8, 15, 6],
                backgroundColor: [
                    '#4f7ea3',
                    '#17a2b8',
                    '#28a745',
                    '#ffc107',
                ],
                borderWidth: 1,
            },
        ],
    };

    const submissionsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="container-fluid py-2" style={{ color: "var(--spms-text)" }}>
            
            {/* --- DASHBOARD HEADER --- */}
            <div className="mb-4">
                <h4 className="mb-1 fs-5 fw-bold">Faculty Dashboard</h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                    Overview of your guided projects, student progress, and pending evaluations.
                </p>
            </div>

            {/* --- TOP METRICS ROW --- */}
            <div className="row g-4 mb-4">
                
                {/* Guided Projects */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Guided Projects"
                        value="30"
                        icon={<FolderKanban size={30} />}
                        color="primary"
                    />
                </div>

                {/* Assigned Students */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Assigned Students"
                        value="75"
                        icon={<Users size={30} />}
                        color="info"
                    />
                </div>

                {/* Pending Reviews */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Pending Reviews"
                        value="5"
                        icon={<Clock3 size={30} />}
                        color="warning"
                    />
                </div>

                {/* Completed Projects */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Completed Projects"
                        value="15"
                        icon={<CheckCircle size={30} />}
                        color="success"
                    />
                </div>

            </div>

            {/* --- CHARTS SECTION --- */}
            <div className="row g-4 mb-3">
                
                {/* 1. Guided Project Status (Pie Chart) */}
                <div className="col-xl-6">
                    <div 
                        className="card border-0 shadow-sm h-100"
                        style={{ backgroundColor: "var(--spms-card)", borderRadius: "0px", border: "1px solid var(--spms-border)" }}
                    >
                        <div 
                            className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
                            style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)", borderRadius: "0px" }}
                        >
                            <PieChart size={18} /> Guided Project Status
                        </div>
                        <div className="p-4" style={{ height: "280px", position: "relative" }}>
                            <Pie data={projectStatusData} options={projectStatusOptions} />
                        </div>
                    </div>
                </div>

                {/* 2. Submissions per Project (Bar Chart) */}
                <div className="col-xl-6">
                    <div 
                        className="card border-0 shadow-sm h-100"
                        style={{ backgroundColor: "var(--spms-card)", borderRadius: "0px", border: "1px solid var(--spms-border)" }}
                    >
                        <div 
                            className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
                            style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)", borderRadius: "0px" }}
                        >
                            <BarChart2 size={18} /> Task Submissions Overview
                        </div>
                        <div className="p-4" style={{ height: "280px", position: "relative" }}>
                            <Bar data={submissionsData} options={submissionsOptions} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;