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


const API_URL = "http://localhost:5278/api/Users/role-counts";

function Dashboard() {
    const [roleCounts, setRoleCounts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setRoleCounts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching role counts:", error);
                setLoading(false);
            });
    }, []);

    
    const getCountByRoleName = (name) => {
        const found = roleCounts.find(r => r.roleName?.toLowerCase() === name.toLowerCase());
        return found ? found.count : 0;
    };

   
    const projectStatusData = {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [
            {
                data: [20, 20, 80],
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

   
    const usersByRoleData = {
        labels: roleCounts.map(r => r.roleName),
        datasets: [
            {
                label: 'Count',
                data: roleCounts.map(r => r.count), 
                backgroundColor: [
                    '#6c757d', // Admin
                    '#17a2b8', // Faculty
                    '#4f7ea3', // Student
                    '#28a745', 
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

    return (
        <div className="container-fluid py-2" style={{ color: "var(--spms-text)" }}>
            
            {/* --- DASHBOARD HEADER --- */}
            <div className="mb-4">
                <h4 className="mb-1 fs-5 fw-bold">Admin Dashboard</h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                    Overview of student metrics, project progress, and system statistics.
                </p>
            </div>

            {/* --- TOP METRICS ROW --- */}
            <div className="row g-4 mb-4">
                
                {/* Total Students */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Total Students"
                        value={loading ? "Loading..." : getCountByRoleName("Student")}
                        icon={<GraduationCap size={30} />}
                        color="primary"
                    />
                </div>

                {/* Total Faculty */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Total Faculty"
                        value={loading ? "Loading..." : getCountByRoleName("staff")}
                        icon={<Users size={30} />}
                        color="info"
                    />
                </div>

                {/* Total Projects */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Total Projects"
                        value="120"
                        icon={<FolderKanban size={30} />}
                        color="success"
                    />
                </div>

                {/* Pending Approval */}
                <div className="col-xl-3 col-md-6">
                    <DashboardCard
                        title="Pending Approval"
                        value="20"
                        icon={<Clock3 size={30} />}
                        color="warning"
                    />
                </div>

            </div>

            {/* --- SECONDARY METRICS ROW --- */}
            <div className="row g-4 mb-4">

                {/* Completed Projects */}
                <div className="col-xl-4 col-md-6">
                    <DashboardCard
                        title="Completed Projects"
                        value="80"
                        icon={<CheckCircle size={30} />}
                        color="dark"
                    />
                </div>

                {/* Active Tasks */}
                <div className="col-xl-4 col-md-6">
                    <DashboardCard
                        title="Active Tasks"
                        value="340"
                        icon={<FileText size={30} />}
                        color="primary"
                    />
                </div>

            </div>

            {/* --- SIMPLE CHARTS SECTION --- */}
            <div className="row g-4 mb-3">
                
                {/* 1. Project Status (Pie Chart) */}
                <div className="col-xl-6">
                    <div 
                        className="card border-0 shadow-sm h-100"
                        style={{ backgroundColor: "var(--spms-card)", borderRadius: "0px", border: "1px solid var(--spms-border)" }}
                    >
                        <div 
                            className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
                            style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)", borderRadius: "0px" }}
                        >
                            <PieChart size={18} /> Project Status
                        </div>
                        <div className="p-4" style={{ height: "280px", position: "relative" }}>
                            <Pie data={projectStatusData} options={projectStatusOptions} />
                        </div>
                    </div>
                </div>

                {/* 2. Users by Role (Bar Chart) */}
                <div className="col-xl-6">
                    <div 
                        className="card border-0 shadow-sm h-100"
                        style={{ backgroundColor: "var(--spms-card)", borderRadius: "0px", border: "1px solid var(--spms-border)" }}
                    >
                        <div 
                            className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
                            style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)", borderRadius: "0px" }}
                        >
                            <BarChart2 size={18} /> Users by Role
                        </div>
                        <div className="p-4" style={{ height: "280px", position: "relative" }}>
                            <Bar data={usersByRoleData} options={usersByRoleOptions} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;