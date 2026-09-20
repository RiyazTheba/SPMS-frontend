import React, { useState } from "react";
import {
    MessageSquare,
    UserCheck,
    Calendar,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    Send,
    Eye
} from "lucide-react";

function Feedback() {
    // Dummy feedback & review data from the faculty guide
    const [feedbacks, setFeedbacks] = useState([
        {
            id: 1,
            title: "Phase 1: Synopsis & Requirement Analysis",
            facultyName: "Prof. Rohan Mehta",
            date: "2026-02-10",
            status: "Approved",
            comments: "The problem statement is well-defined. Ensure you follow standard IEEE format for your architecture diagram in the next phase.",
            suggestions: "Include use-case diagrams and data flow diagrams (DFD Level 0 and Level 1) in your documentation.",
            fileName: "Synopsis_Report_v1.pdf"
        },
        {
            id: 2,
            title: "Phase 2: Database Schema & Wireframes",
            facultyName: "Prof. Rohan Mehta",
            date: "2026-03-05",
            status: "Needs Revision",
            comments: "MongoDB collection schemas look good, but indexes need to be optimized for campus location queries.",
            suggestions: "Add geospatial indexing (2dsphere) for the navigation tracker module to improve mapping performance.",
            fileName: "Schema_Wireframes.pdf"
        }
    ]);

    const [replyText, setReplyText] = useState("");
    const [activeFeedbackId, setActiveFeedbackId] = useState(null);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Approved":
                return (
                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-2 border border-success-subtle" style={{ fontSize: "0.75rem" }}>
                        <CheckCircle2 size={14} className="me-1" /> Approved
                    </span>
                );
            case "Needs Revision":
                return (
                    <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-2 border border-warning-subtle" style={{ fontSize: "0.75rem" }}>
                        <AlertCircle size={14} className="me-1" /> Needs Revision
                    </span>
                );
            default:
                return (
                    <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-0 fw-normal d-inline-flex align-items-center gap-2 border border-primary-subtle" style={{ fontSize: "0.75rem" }}>
                        <Clock size={14} className="me-1" /> Under Review
                    </span>
                );
        }
    };

    const handleSendReply = (id) => {
        if (!replyText.trim()) return;
        alert(`Reply sent for review ID: ${id}`);
        setReplyText("");
        setActiveFeedbackId(null);
    };

    return (
        <div className="container-fluid px-0 py-3">
            
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div>
                    <h4 className="mb-1 fw-semibold text-dark fs-5 tracking-tight">Faculty Feedback & Review</h4>
                    <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                        Check comments, suggestions, and review remarks provided by your guide.
                    </p>
                </div>
            </div>

            {/* Feedbacks List */}
            <div className="row g-4">
                {feedbacks.map((item) => (
                    <div className="col-12" key={item.id}>
                        <div className="card border-0 shadow-sm rounded-0 bg-white">
                            <div className="card-body p-4 p-lg-5">
                                
                                {/* Card Top: Title & Status */}
                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                                    <div>
                                        <span className="text-uppercase text-muted fw-medium d-block mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                                            Review Milestone
                                        </span>
                                        <h5 className="fw-semibold text-dark mb-0" style={{ fontSize: "1.15rem" }}>
                                            {item.title}
                                        </h5>
                                    </div>
                                    <div>
                                        {getStatusBadge(item.status)}
                                    </div>
                                </div>

                                {/* Metadata Bar */}
                                <div className="d-flex flex-wrap gap-4 text-muted small mb-4 pb-3 border-bottom" style={{ fontSize: "0.85rem" }}>
                                    <div className="d-flex align-items-center">
                                        <UserCheck size={16} className="text-primary opacity-75 me-2" />
                                        <span>Guide: <strong className="text-dark ms-1">{item.facultyName}</strong></span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Calendar size={16} className="text-warning opacity-75 me-2" />
                                        <span>Reviewed on: <strong className="text-dark ms-1">{item.date}</strong></span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FileText size={16} className="text-success opacity-75 me-2" />
                                        <span>File: <span className="text-primary text-decoration-underline ms-1" style={{ cursor: "pointer" }}>{item.fileName}</span></span>
                                    </div>
                                </div>

                                {/* Review Sections Grid */}
                                <div className="row g-4 mb-4">
                                    
                                    {/* Faculty Comments */}
                                    <div className="col-md-6">
                                        <div className="p-3.5 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                            <div className="text-dark small mb-2 d-flex align-items-center fw-semibold" style={{ fontSize: "0.875rem" }}>
                                                <MessageSquare size={16} className="text-primary me-2 flex-shrink-0" /> Faculty Comments
                                            </div>
                                            <p className="text-secondary mb-0 fw-light ps-4" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                                                {item.comments}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Suggestions */}
                                    <div className="col-md-6">
                                        <div className="p-3.5 rounded-0 bg-light bg-opacity-50 border border-light h-100">
                                            <div className="text-dark small mb-2 d-flex align-items-center fw-semibold" style={{ fontSize: "0.875rem" }}>
                                                <Eye size={16} className="text-success me-2 flex-shrink-0" /> Suggestions & Improvements
                                            </div>
                                            <p className="text-secondary mb-0 fw-light ps-4" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                                                {item.suggestions}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {/* Reply Section Toggle / Action */}
                                {activeFeedbackId === item.id ? (
                                    <div className="mt-4 pt-3 border-top">
                                        <label className="form-label fw-medium text-dark small mb-2 d-flex align-items-center">
                                            <MessageSquare size={15} className="text-primary me-2" /> Reply / Clarification to Guide
                                        </label>
                                        <textarea
                                            className="form-control rounded-0 shadow-none border-light bg-light bg-opacity-50 mb-3"
                                            rows="3"
                                            placeholder="Write your note or response here..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            style={{ fontSize: "0.9rem", resize: "none" }}
                                        ></textarea>
                                        <div className="d-flex justify-content-end gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary rounded-0 px-3 py-1.5"
                                                onClick={() => setActiveFeedbackId(null)}
                                                style={{ fontSize: "0.85rem" }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary rounded-0 px-4 py-1.5 d-inline-flex align-items-center"
                                                onClick={() => handleSendReply(item.id)}
                                                style={{ fontSize: "0.85rem" }}
                                            >
                                                <Send size={14} className="me-2" /> Send Reply
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark rounded-0 px-3 py-1.5 d-inline-flex align-items-center"
                                            onClick={() => setActiveFeedbackId(item.id)}
                                            style={{ fontSize: "0.85rem" }}
                                        >
                                            <MessageSquare size={14} className="me-2" /> Reply to Guide
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Feedback;