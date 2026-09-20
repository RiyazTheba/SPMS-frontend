import React, { useState } from "react";
import {
    CheckCircle,
    Clock,
    AlertCircle,
    Calendar,
    Flag,
    ArrowRight,
    TrendingUp,
    ArrowLeft,
    Upload,
    MessageSquare,
    Award,
    FileText,
    Edit3
} from "lucide-react";

// ==========================================
// 1. TASK DETAILS COMPONENT (Detailed View)
// ==========================================
function TaskDetails({ task, onBack }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [studentRemarks, setStudentRemarks] = useState(task.StudentRemarks || "");

    const getStatusDetails = (statusId) => {
        switch (statusId) {
            case 3:
                return {
                    badge: (
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1.5 border border-success-subtle" style={{ fontSize: "0.8rem" }}>
                            <CheckCircle size={14} /> Completed
                        </span>
                    )
                };
            case 2:
                return {
                    badge: (
                        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1.5 border border-primary-subtle" style={{ fontSize: "0.8rem" }}>
                            <Clock size={14} /> In Progress
                        </span>
                    )
                };
            case 1:
            default:
                return {
                    badge: (
                        <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-1.5 border border-warning-subtle" style={{ fontSize: "0.8rem" }}>
                            <AlertCircle size={14} /> Pending
                        </span>
                    )
                };
        }
    };

    const getPriorityDetails = (priorityId) => {
        switch (priorityId) {
            case 3: return { label: "High", color: "text-danger" };
            case 2: return { label: "Medium", color: "text-warning" };
            case 1: 
            default: return { label: "Low", color: "text-success" };
        }
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file to upload!");
            return;
        }
        alert(`Task "${task.TaskTitle}" submitted successfully with file: ${selectedFile.name}!`);
    };

    const priorityInfo = getPriorityDetails(task.PriorityID);
    const statusInfo = getStatusDetails(task.TaskStatus);

    return (
        <div className="container-fluid px-0 py-3">
            
            {/* Header with Back Button */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-outline-secondary rounded-0 btn-sm d-flex align-items-center gap-1" onClick={onBack}>
                        <ArrowLeft size={16} /> Back to Tasks
                    </button>
                    <div>
                        <h4 className="mb-1 fw-semibold text-dark fs-5 tracking-tight">Task Details & Submission</h4>
                        <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                            Task ID: #{task.TaskId} | Allocation ID: #{task.AllocationID}
                        </p>
                    </div>
                </div>
                <div>
                    {statusInfo.badge}
                </div>
            </div>

            {/* Main Task Card */}
            <div className="card border-0 shadow-sm rounded-0 bg-white mb-4">
                <div className="card-body p-4 p-lg-5">
                    
                    <div className="mb-4">
                        <span className="text-uppercase text-primary fw-medium d-block mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                            Task Title
                        </span>
                        <h3 className="fw-semibold text-dark mb-3" style={{ fontSize: "1.3rem" }}>
                            {task.TaskTitle}
                        </h3>
                        <p className="text-secondary mb-0 fw-light" style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
                            {task.TaskDescription}
                        </p>
                    </div>

                    <hr className="text-muted opacity-10 my-4" />

                    <div className="row g-4 mb-4">
                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <Flag size={16} className="text-warning opacity-75" /> Priority
                                </div>
                                <div className={`fw-medium ${priorityInfo.color}`} style={{ fontSize: "0.9rem" }}>
                                    {priorityInfo.label}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <Award size={16} className="text-primary opacity-75" /> Score (Earned / Max)
                                </div>
                                <div className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                                    {task.EarnedScore !== null ? task.EarnedScore : "--"} / {task.AssignedScore} Marks
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <Calendar size={16} className="text-success opacity-75" /> Start Date
                                </div>
                                <div className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                                    {task.StartDate || "Not Specified"}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="p-3 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                <div className="text-muted small mb-2 d-flex align-items-center gap-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                                    <Calendar size={16} className="text-danger opacity-75" /> Due Date
                                </div>
                                <div className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                                    {task.DueDate || "No Deadline"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-medium text-dark d-flex align-items-center gap-2" style={{ fontSize: "0.875rem" }}>
                                <TrendingUp size={16} className="text-primary opacity-75" /> Task Progress Percentage
                            </span>
                            <span className="fw-semibold text-primary" style={{ fontSize: "0.9rem" }}>
                                {task.ProgressPercentage}%
                            </span>
                        </div>
                        <div className="progress bg-light rounded-0" style={{ height: "6px" }}>
                            <div className="progress-bar bg-primary rounded-0" role="progressbar" style={{ width: `${task.ProgressPercentage}%` }}></div>
                        </div>
                    </div>

                    {task.FacultyRemarks && (
                        <div className="p-3 bg-light border-start border-4 border-primary rounded-0 mb-4">
                            <div className="d-flex align-items-center gap-2 text-dark fw-medium mb-1" style={{ fontSize: "0.85rem" }}>
                                <MessageSquare size={16} className="text-primary" /> Faculty Remarks:
                            </div>
                            <p className="text-secondary mb-0 small" style={{ fontSize: "0.9rem" }}>
                                {task.FacultyRemarks}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Submission Section */}
            <div className="card border-0 shadow-sm rounded-0 bg-white">
                <div className="card-body p-4 p-lg-5">
                    <h5 className="fw-semibold text-dark mb-3" style={{ fontSize: "1.1rem" }}>Submit Your Work</h5>
                    <form onSubmit={handleUploadSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-medium text-dark d-flex align-items-center gap-1">
                                <Edit3 size={14} /> Student Remarks
                            </label>
                            <textarea 
                                className="form-control rounded-0" 
                                rows="3"
                                value={studentRemarks}
                                onChange={(e) => setStudentRemarks(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-medium text-dark d-flex align-items-center gap-1">
                                <FileText size={14} /> Choose File (ZIP, PDF)
                            </label>
                            <input className="form-control rounded-0" type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        </div>
                        <button type="submit" className="btn btn-primary rounded-0 px-4 py-2 d-inline-flex align-items-center gap-2">
                            <Upload size={16} /> Upload & Submit Task
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}

// ==========================================
// 2. MAIN DASHBOARD / LIST COMPONENT
// ==========================================
function TaskListDashboard() {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [tasks] = useState([
        {
            TaskId: 101,
            AllocationID: 12,
            TaskTitle: "Implement Campus Map API Integration",
            TaskDescription: "Integrate Leaflet.js library with backend REST endpoints for building locations.",
            TaskStatus: 2,
            PriorityID: 3,
            AssignedScore: 10.00,
            EarnedScore: null,
            ProgressPercentage: 65,
            StartDate: "2026-03-01",
            DueDate: "2026-03-15",
            FacultyRemarks: "Ensure smooth marker loading."
        },
        {
            TaskId: 102,
            AllocationID: 12,
            TaskTitle: "Student Authentication & JWT Setup",
            TaskDescription: "Create secure login and registration endpoints with token verification middleware.",
            TaskStatus: 1,
            PriorityID: 2,
            AssignedScore: 10.00,
            EarnedScore: null,
            ProgressPercentage: 0,
            StartDate: "2026-03-10",
            DueDate: "2026-03-22",
            FacultyRemarks: "Use bcrypt for password hashing."
        },
        {
            TaskId: 103,
            AllocationID: 12,
            TaskTitle: "Database Indexing & Schema Optimization",
            TaskDescription: "Optimize MongoDB/SQL queries for faster resource tracking and navigation logs.",
            TaskStatus: 3,
            PriorityID: 1,
            AssignedScore: 10.00,
            EarnedScore: 9.50,
            ProgressPercentage: 100,
            StartDate: "2026-02-15",
            DueDate: "2026-02-28",
            FacultyRemarks: "Great job on query performance."
        }
    ]);

    const getStatusDetails = (statusId) => {
        switch (statusId) {
            case 3:
                return <span className="badge bg-success-subtle text-success px-2 py-1 rounded-0 fw-normal d-inline-flex align-items-center gap-1 border border-success-subtle" style={{ fontSize: "0.75rem" }}><CheckCircle size={12} /> Completed</span>;
            case 2:
                return <span className="badge bg-primary-subtle text-primary px-2 py-1 rounded-0 fw-normal d-inline-flex align-items-center gap-1 border border-primary-subtle" style={{ fontSize: "0.75rem" }}><Clock size={12} /> In Progress</span>;
            case 1:
            default:
                return <span className="badge bg-warning-subtle text-warning-emphasis px-2 py-1 rounded-0 fw-normal d-inline-flex align-items-center gap-1 border border-warning-subtle" style={{ fontSize: "0.75rem" }}><AlertCircle size={12} /> Pending</span>;
        }
    };

    const getPriorityDetails = (priorityId) => {
        switch (priorityId) {
            case 3: return { label: "High", color: "text-danger" };
            case 2: return { label: "Medium", color: "text-warning" };
            case 1: 
            default: return { label: "Low", color: "text-success" };
        }
    };

    // Find the current selected task object
    const activeTask = tasks.find(t => t.TaskId === selectedTaskId);

    // If a task is selected, show TaskDetails view
    if (activeTask) {
        return <TaskDetails task={activeTask} onBack={() => setSelectedTaskId(null)} />;
    }

    // Otherwise, show the 3 tasks grid list
    return (
        <div className="container-fluid px-0 py-3">
            <div className="mb-4 pb-3 border-bottom">
                <h4 className="mb-1 fw-semibold text-dark fs-5 tracking-tight">Assigned Tasks Overview</h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                    Manage and track your project tasks, deadlines, and submission status.
                </p>
            </div>

            <div className="row g-4">
                {tasks.map((task) => {
                    const priorityInfo = getPriorityDetails(task.PriorityID);
                    return (
                        <div className="col-md-6 col-lg-4" key={task.TaskId}>
                            <div className="card border-0 shadow-sm rounded-0 bg-white h-100">
                                <div className="card-body p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted fw-medium" style={{ fontSize: "0.75rem" }}>
                                                TASK #{task.TaskId}
                                            </span>
                                            {getStatusDetails(task.TaskStatus)}
                                        </div>

                                        <h5 className="fw-semibold text-dark mb-2 text-truncate" style={{ fontSize: "1.05rem" }}>
                                            {task.TaskTitle}
                                        </h5>

                                        <p className="text-secondary mb-3 fw-light" style={{ fontSize: "0.875rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {task.TaskDescription}
                                        </p>

                                        <hr className="text-muted opacity-10 my-3" />

                                        <div className="row g-2 mb-3">
                                            <div className="col-6">
                                                <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: "0.8rem" }}>
                                                    <Calendar size={14} className="text-danger opacity-75" />
                                                    <span>{task.DueDate}</span>
                                                </div>
                                            </div>
                                            <div className="col-6 text-end">
                                                <div className="d-flex align-items-center justify-content-end gap-1" style={{ fontSize: "0.8rem" }}>
                                                    <Flag size={14} className="opacity-75" />
                                                    <span className={`fw-medium ${priorityInfo.color}`}>{priorityInfo.label}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
                                                    <TrendingUp size={12} /> Progress
                                                </span>
                                                <span className="fw-semibold text-dark" style={{ fontSize: "0.8rem" }}>
                                                    {task.ProgressPercentage}%
                                                </span>
                                            </div>
                                            <div className="progress bg-light rounded-0" style={{ height: "4px" }}>
                                                <div className="progress-bar bg-primary rounded-0" role="progressbar" style={{ width: `${task.ProgressPercentage}%` }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Working View Details Button */}
                                    <div className="pt-2 border-top border-light d-flex justify-content-end align-items-center">
                                        <button 
                                            className="btn btn-link text-primary text-decoration-none p-0 d-inline-flex align-items-center gap-1 fw-medium" 
                                            style={{ fontSize: "0.85rem" }}
                                            onClick={() => setSelectedTaskId(task.TaskId)}
                                        >
                                            View Details <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TaskListDashboard;