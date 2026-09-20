import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function TaskList({ 
  tasks, 
  handleEditClick, 
  handleDelete 
}) {
  return (
    <div 
      className="card border-0 shadow-sm" 
      style={{ 
        backgroundColor: "var(--spms-card)", 
        borderRadius: "0px",
        border: "1px solid var(--spms-border)"
      }}
    >
      <div 
        className="p-3 d-flex align-items-center fs-6 justify-content-between"
        style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)", borderRadius: "0px" }}
      >
        <div>
          <h4 className="mb-0 fs-6">Task Records</h4>
        </div>
        <span className="badge px-3 py-2" style={{ backgroundColor: "var(--spms-accent)", fontSize: "0.85rem", borderRadius: "0px" }}>
          Total Tasks: {tasks.length}
        </span>
      </div>

      <div className="p-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ color: "var(--spms-text)" }}>
            <thead style={{ color: "var(--spms-muted)" }}>
              <tr style={{ borderBottom: "2px solid var(--spms-border)" }}>
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Task Title & Details</th>
                <th className="py-3 px-3">Allocation</th>
                <th className="py-3 px-3">Status / Priority</th>
                <th className="py-3 px-3">Scores (Asg/Earned)</th>
                <th className="py-3 px-3">Timeline</th>
                <th className="py-3 px-3">Progress</th>
                <th className="py-3 px-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((item, index) => (
                  <tr 
                    key={item.taskId} 
                    style={{ borderBottom: "1px solid var(--spms-border)", transition: "background 0.2s" }}
                  >
                    <td className="py-3 px-3 fw-semibold">{index + 1}</td>
                    
                    {/* Task Title & Description */}
                    <td className="py-3 px-3">
                      <div>
                        <span className="fw-bold d-block" style={{ fontSize: "0.95rem" }}>{item.taskTitle}</span>
                        <small className="text-muted d-block mb-1">{item.taskDescription}</small>
                        {(item.facultyRemarks || item.studentRemarks) && (
                          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                            {item.facultyRemarks && <div><strong>Faculty:</strong> {item.facultyRemarks}</div>}
                            {item.studentRemarks && <div><strong>Student:</strong> {item.studentRemarks}</div>}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Allocation Column */}
                    <td className="py-3 px-3">
                      <span style={{ fontSize: "0.9rem" }}>{item.allocationName}</span>
                    </td>

                    {/* Status & Priority */}
                    <td className="py-3 px-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="badge" style={{ backgroundColor: "rgba(79, 126, 163, 0.1)", color: "var(--spms-sidebar)", borderRadius: "0px", width: "fit-content" }}>
                          {item.taskStatusName}
                        </span>
                        <span className="badge" style={{ backgroundColor: "rgba(108, 117, 125, 0.1)", color: "#6c757d", borderRadius: "0px", width: "fit-content" }}>
                          {item.priorityName} Priority
                        </span>
                      </div>
                    </td>

                    {/* Scores */}
                    <td className="py-3 px-3">
                      <span style={{ fontSize: "0.9rem" }}>
                        {item.assignedScore} / {item.earnedScore !== null ? item.earnedScore : "-"}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td className="py-3 px-3">
                      <div style={{ fontSize: "0.8rem" }} className="text-muted">
                        <div><strong>Start:</strong> {item.startDate ? new Date(item.startDate).toLocaleDateString() : "N/A"}</div>
                        <div><strong>Due:</strong> {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "N/A"}</div>
                        {item.completedDate && <div className="text-success"><strong>Done:</strong> {new Date(item.completedDate).toLocaleDateString()}</div>}
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="py-3 px-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: "6px", borderRadius: "0px", backgroundColor: "#e9ecef" }}>
                          <div className="progress-bar" style={{ width: `${item.progressPercentage}%`, backgroundColor: "var(--spms-accent)" }}></div>
                        </div>
                        <span style={{ fontSize: "0.85rem" }}>{item.progressPercentage}%</span>
                      </div>
                    </td>

                   {/* Actions */}
                    <td className="py-2 px-2 text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                        <button 
                        className="btn btn-lg px-3 py-2 d-flex align-items-center justify-content-center"
                        style={{ 
                            backgroundColor: "transparent", 
                            color: "var(--spms-sidebar)", 
                            border: "1.5px solid var(--spms-sidebar)",
                            fontWeight: 600,
                            borderRadius: "0px"
                        }}
                        onClick={() => handleEditClick(item)}
                        title="Edit Task"
                        >
                        <Pencil size={16} color="#007bff" />
                        </button>
                        <button 
                        className="btn btn-sm px-3 py-2 d-flex align-items-center justify-content-center" 
                        style={{ 
                            backgroundColor: "rgba(220, 53, 69, 0.1)", 
                            color: "#dc3545", 
                            border: "1.5px solid rgba(220, 53, 69, 0.2)",
                            fontWeight: 600,
                            borderRadius: "0px"
                        }}
                        onClick={() => handleDelete(item.taskId)}
                        title="Delete Task"
                        >
                        <Trash2 size={16} color="#dc3545" />
                        </button>
                    </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    No active task records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}