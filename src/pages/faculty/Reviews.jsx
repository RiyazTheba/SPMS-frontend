import React, { useState } from "react";
import { CheckCircle2, XCircle, Clock, FileText, Eye, MessageSquare } from "lucide-react";

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      reviewId: 1,
      projectTitle: "Student Project Management System",
      studentName: "Aarav Patel",
      documentName: "SRS_Document_v1.pdf",
      submissionDate: "2026-08-14",
      status: "Pending",
      feedback: "",
    },
    {
      reviewId: 2,
      projectTitle: "E-Commerce Web Application",
      studentName: "Priya Sharma",
      documentName: "Database_Schema.pdf",
      submissionDate: "2026-08-12",
      status: "Approved",
      feedback: "Looks good. Proceed with implementation.",
    },
    {
      reviewId: 3,
      projectTitle: "Smart Attendance System",
      studentName: "Rohan Mehta",
      documentName: "Project_Synopsis.pdf",
      submissionDate: "2026-08-10",
      status: "Rejected",
      feedback: "Need to revise the scope and add more features.",
    },
  ]);

  // State for modal / action handling
  const [selectedReview, setSelectedReview] = useState(null);
  const [actionType, setActionType] = useState(""); // 'Approve' or 'Reject'
  const [feedbackText, setFeedbackText] = useState("");

  const handleOpenAction = (review, type) => {
    setSelectedReview(review);
    setActionType(type);
    setFeedbackText(review.feedback || "");
  };

  const handleSaveReview = () => {
    if (!feedbackText.trim() && actionType === "Reject") {
      alert("Please provide feedback for rejection.");
      return;
    }

    setReviews(
      reviews.map((r) =>
        r.reviewId === selectedReview.reviewId
          ? { ...r, status: actionType === "Approve" ? "Approved" : "Rejected", feedback: feedbackText }
          : r
      )
    );

    setSelectedReview(null);
    setActionType("");
    setFeedbackText("");
  };

  return (
    <div className="container-fluid py-2" style={{ color: "var(--spms-text)" }}>
      
      {/* --- HEADER --- */}
      <div className="mb-4">
        <h4 className="mb-1 fs-5 fw-bold">Project Reviews & Submissions</h4>
        <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
          Review student document submissions, synopses, and provide feedback or approval.
        </p>
      </div>

      {/* --- REVIEWS TABLE --- */}
      <div
        className="card border-0 shadow-sm"
        style={{
          backgroundColor: "var(--spms-card)",
          borderRadius: "0px",
          border: "1px solid var(--spms-border)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.9rem" }}>
            <thead style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)" }}>
              <tr>
                <th className="py-3 px-3">#ID</th>
                <th className="py-3">Project Title & Student</th>
                <th className="py-3">Submitted Document</th>
                <th className="py-3">Date</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((item) => (
                  <tr key={item.reviewId}>
                    <td className="px-3 fw-semibold">#{item.reviewId}</td>
                    <td>
                      <div className="fw-semibold">{item.projectTitle}</div>
                      <small className="text-muted">{item.studentName}</small>
                    </td>
                    <td>
                      <a
                        href="#view"
                        onClick={(e) => { e.preventDefault(); alert(`Opening document: ${item.documentName}`); }}
                        className="text-decoration-none d-inline-flex align-items-center gap-1 fw-medium"
                      >
                        <FileText size={16} /> {item.documentName}
                      </a>
                    </td>
                    <td>{item.submissionDate}</td>
                    <td>
                      <span
                        className={`badge px-2 py-1 ${
                          item.status === "Approved"
                            ? "bg-success"
                            : item.status === "Rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                        style={{ borderRadius: "0px", fontWeight: 500 }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-end px-3">
                      <div className="d-inline-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-success d-inline-flex align-items-center gap-1"
                          style={{ borderRadius: "0px" }}
                          onClick={() => handleOpenAction(item, "Approve")}
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                          style={{ borderRadius: "0px" }}
                          onClick={() => handleOpenAction(item, "Reject")}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No pending reviews.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- REVIEW MODAL / ACTION BOX --- */}
      {selectedReview && (
        <div 
          className="card border-0 shadow-sm mt-4 p-4"
          style={{ backgroundColor: "var(--spms-card)", borderRadius: "0px", border: "1px solid var(--spms-border)" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fs-6 fw-bold">
              {actionType} Submission: {selectedReview.projectTitle} ({selectedReview.studentName})
            </h5>
            <button 
              className="btn-close" 
              onClick={() => setSelectedReview(null)}
            ></button>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.9rem" }}>Feedback / Comments for Student</label>
            <textarea
              className="form-control form-control-sm"
              rows="3"
              style={{ borderRadius: "0px" }}
              placeholder="Enter your feedback or reason for approval/rejection..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
          </div>

          <div className="text-end">
            <button
              className="btn btn-sm btn-secondary me-2"
              style={{ borderRadius: "0px" }}
              onClick={() => setSelectedReview(null)}
            >
              Cancel
            </button>
            <button
              className={`btn btn-sm px-4 ${actionType === "Approve" ? "btn-success" : "btn-danger"}`}
              style={{ borderRadius: "0px", fontWeight: 600 }}
              onClick={handleSaveReview}
            >
              Confirm {actionType}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Reviews;