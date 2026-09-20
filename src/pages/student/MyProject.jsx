import React, { useState, useEffect } from "react";
import {
    FolderKanban,
    Calendar,
    UserCheck,
    Cpu,
    CheckCircle,
    Clock,
    AlertCircle,
    TrendingUp
} from "lucide-react";

function MyProject() {
    const [project, setProject] = useState({
        name: "Smart Campus Navigation & Resource Tracker",
        description: "A web-based platform designed to help students and faculty navigate campus facilities, locate empty lecture halls, and track real-time resource availability.",
        facultyName: "Prof. Rohan Mehta",
        technology: "React.js, Node.js, Express, MongoDB, Bootstrap",
        startDate: "2026-01-15",
        endDate: "2026-05-30",
        status: "In Progress",
        progress: 65
    });

    useEffect(() => {
        // Fetch API logic goes here
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Completed":
                return (
                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1.5 border border-success-subtle" style={{ fontSize: "0.8rem" }}>
                        <CheckCircle size={14} /> Completed
                    </span>
                );
            case "In Progress":
                return (
                    <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1.5 border border-primary-subtle" style={{ fontSize: "0.8rem" }}>
                        <Clock size={14} /> In Progress
                    </span>
                );
            case "Pending":
                return (
                    <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1.5 border border-warning-subtle" style={{ fontSize: "0.8rem" }}>
                        <AlertCircle size={14} /> Pending Approval
                    </span>
                );
            default:
                return <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-0 fw-normal" style={{ fontSize: "0.8rem" }}>{status}</span>;
        }
    };

    return (
        <div className="container-fluid px-0 py-3">
            
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div>
                    <h4 className="mb-1 fw-semibold text-dark fs-5 tracking-tight">My Assigned Project</h4>
                    <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                        Overview of your current graduation project timeline, technology stack, and progress.
                    </p>
                </div>
                <div>
                    {getStatusBadge(project.status)}
                </div>
            </div>

            {/* Main Sharp Clean Card */}
            <div className="card border-0 shadow-sm rounded-0 bg-white">
                <div className="card-body p-4 p-lg-5">
                    
                    {/* Project Title & Description */}
                    <div className="mb-4">
                        <span className="text-uppercase text-success fw-medium d-block mb-1 " style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                            Project Title
                        </span>
                        <h3 className="fw-semibold text-dark mb-3" style={{ fontSize: "1.3rem" }}>
                            {project.name}
                        </h3>
                        <p className="text-secondary mb-0 fw-light" style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
                            {project.description}
                        </p>
                    </div>

                    <hr className="text-muted opacity-10 my-4" />

                    {/* Metadata Grid */}
                    <div className="row g-4 mb-4">
                        
                        {/* Faculty / Guide */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <UserCheck size={16} className="text-primary opacity-75" /> Faculty Guide
                                </div>
                                <div className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                                    {project.facultyName}
                                </div>
                            </div>
                        </div>

                        {/* Technology */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <Cpu size={16} className="text-success opacity-75" /> Tech Stack
                                </div>
                                <div className="fw-medium text-dark text-truncate" style={{ fontSize: "0.9rem" }} title={project.technology}>
                                    {project.technology}
                                </div>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <Calendar size={16} className="text-warning opacity-75" /> Start Date
                                </div>
                                <div className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                                    {project.startDate}
                                </div>
                            </div>
                        </div>

                        {/* End Date */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <Calendar size={16} className="text-danger opacity-75" /> End Date
                                </div>
                                <div className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                                    {project.endDate}
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr className="text-muted opacity-10 my-4" />

                    {/* Minimalist Sharp Progress Bar Section */}
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-medium text-dark d-flex align-items-center gap-2" style={{ fontSize: "0.875rem" }}>
                                <TrendingUp size={16} className="text-primary opacity-75" /> Overall Progress
                            </span>
                            <span className="fw-semibold text-primary" style={{ fontSize: "0.9rem" }}>
                                {project.progress}%
                            </span>
                        </div>
                        <div className="progress bg-light rounded-0" style={{ height: "6px" }}>
                            <div 
                                className="progress-bar bg-primary rounded-0" 
                                role="progressbar" 
                                style={{ width: `${project.progress}%` }} 
                                aria-valuenow={project.progress} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MyProject;