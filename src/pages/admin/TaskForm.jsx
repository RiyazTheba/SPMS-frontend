import React from 'react';
import { Plus, X } from 'lucide-react';

export default function TaskForm({
  showAddForm,
  setShowAddForm,
  newTaskData,
  setNewTaskData,
  handleFormSubmit,
  editingTaskId,
  resetForm,
  errors = {},
  availableAllocations = [],
  availableStatuses = [],
  availablePriorities = []
}) {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fs-5">Task Management</h4>
        <button 
          className="btn btn-sm px-3 py-2 d-flex align-items-center gap-2"
          style={{ 
            backgroundColor: "var(--spms-sidebar)", 
            color: "#fff", 
            borderRadius: "0px",
            fontWeight: 600 
          }}
          onClick={() => {
            if (showAddForm) {
              resetForm();
            } else {
              setShowAddForm(true);
            }
          }}
        >
          {showAddForm ? <><X size={18} /> Close Form</> : <><Plus size={18} /> Add New Task</>}
        </button>
      </div>

      {/* --- TASK FORM (ADD / UPDATE) --- */}
      {showAddForm && (
        <div 
          className="card border-0 shadow-sm p-4 mb-4" 
          style={{ 
            backgroundColor: "var(--spms-card)", 
            borderRadius: "0px", 
            border: "1px solid var(--spms-border)" 
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fs-6" style={{ color: "var(--spms-text)" }}>
              {editingTaskId !== null ? `Update Task (ID: ${editingTaskId})` : "Create Task Entry"}
            </h5>
            {editingTaskId !== null && (
              <span className="badge" style={{ backgroundColor: "var(--spms-accent)", borderRadius: "0px" }}>
                Editing Mode Active
              </span>
            )}
          </div>

          <form onSubmit={handleFormSubmit} noValidate>
            <div className="row g-3">
              {/* Allocation */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Allocation (Project/Team)</label>
                <select 
                  className={`form-select form-select-sm ${errors.allocationID ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  value={newTaskData.allocationID}
                  onChange={(e) => setNewTaskData({ ...newTaskData, allocationID: e.target.value })}
                >
                  <option value="">Choose Allocation...</option>
                  {availableAllocations?.map(a => (
                    <option key={a.allocationID} value={a.allocationID}>{a.allocationName}</option>
                  ))}
                </select>
                {errors.allocationID && <div className="invalid-feedback">{errors.allocationID}</div>}
              </div>

              {/* Task Title */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Task Title</label>
                <input 
                  type="text" 
                  className={`form-control form-control-sm ${errors.taskTitle ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  placeholder="Enter task title"
                  value={newTaskData.taskTitle}
                  onChange={(e) => setNewTaskData({ ...newTaskData, taskTitle: e.target.value })}
                />
                {errors.taskTitle && <div className="invalid-feedback">{errors.taskTitle}</div>}
              </div>

              {/* Task Description */}
              <div className="col-md-12">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Task Description</label>
                <textarea 
                  className={`form-control form-control-sm ${errors.taskDescription ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  rows="2"
                  placeholder="Provide details about the task..."
                  value={newTaskData.taskDescription}
                  onChange={(e) => setNewTaskData({ ...newTaskData, taskDescription: e.target.value })}
                ></textarea>
                {errors.taskDescription && <div className="invalid-feedback">{errors.taskDescription}</div>}
              </div>

              {/* Status */}
              <div className="col-md-4">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Status</label>
                <select 
                  className="form-select form-select-sm"
                  style={{ borderRadius: "0px" }}
                  value={newTaskData.taskStatus}
                  onChange={(e) => setNewTaskData({ ...newTaskData, taskStatus: e.target.value })}
                >
                  {availableStatuses?.map(s => (
                    <option key={s.statusId} value={s.statusId}>{s.statusName}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="col-md-4">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Priority</label>
                <select 
                  className={`form-select form-select-sm ${errors.priorityID ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  value={newTaskData.priorityID}
                  onChange={(e) => setNewTaskData({ ...newTaskData, priorityID: e.target.value })}
                >
                  <option value="">Choose Priority...</option>
                  {availablePriorities?.map(p => (
                    <option key={p.priorityId} value={p.priorityId}>{p.priorityName}</option>
                  ))}
                </select>
                {errors.priorityID && <div className="invalid-feedback">{errors.priorityID}</div>}
              </div>

              {/* Assigned Score */}
              <div className="col-md-4">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Assigned Score</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className={`form-control form-control-sm ${errors.assignedScore ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  placeholder="0.00"
                  value={newTaskData.assignedScore}
                  onChange={(e) => setNewTaskData({ ...newTaskData, assignedScore: e.target.value })}
                />
                {errors.assignedScore && <div className="invalid-feedback">{errors.assignedScore}</div>}
              </div>

              {/* Progress (%) */}
              <div className="col-md-3">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Progress (%)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className={`form-control form-control-sm ${errors.progressPercentage ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  value={newTaskData.progressPercentage}
                  onChange={(e) => setNewTaskData({ ...newTaskData, progressPercentage: e.target.value })}
                />
                {errors.progressPercentage && <div className="invalid-feedback">{errors.progressPercentage}</div>}
              </div>

              {/* Start Date */}
              <div className="col-md-3">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Start Date</label>
                <input 
                  type="datetime-local" 
                  className={`form-control form-control-sm ${errors.startDate ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  value={newTaskData.startDate}
                  onChange={(e) => setNewTaskData({ ...newTaskData, startDate: e.target.value })}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
              </div>

              {/* Due Date */}
              <div className="col-md-3">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Due Date</label>
                <input 
                  type="datetime-local" 
                  className={`form-control form-control-sm ${errors.dueDate ? 'is-invalid' : ''}`}
                  style={{ borderRadius: "0px" }}
                  value={newTaskData.dueDate}
                  onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                />
                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
              </div>

              {/* Earned Score (Optional) */}
              <div className="col-md-3">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Earned Score <span className="text-muted">(Opt)</span></label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="form-control form-control-sm"
                  style={{ borderRadius: "0px" }}
                  placeholder="Optional"
                  value={newTaskData.earnedScore}
                  onChange={(e) => setNewTaskData({ ...newTaskData, earnedScore: e.target.value })}
                />
              </div>

              {/* Faculty Remarks (Optional) */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Faculty Remarks <span className="text-muted">(Opt)</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-sm"
                  style={{ borderRadius: "0px" }}
                  placeholder="Remarks by faculty..."
                  value={newTaskData.facultyRemarks}
                  onChange={(e) => setNewTaskData({ ...newTaskData, facultyRemarks: e.target.value })}
                />
              </div>

              {/* Student Remarks (Optional) */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontSize: "0.9rem" }}>Student Remarks <span className="text-muted">(Opt)</span></label>
                <input 
                  type="text" 
                  className="form-control form-control-sm"
                  style={{ borderRadius: "0px" }}
                  placeholder="Remarks by student..."
                  value={newTaskData.studentRemarks}
                  onChange={(e) => setNewTaskData({ ...newTaskData, studentRemarks: e.target.value })}
                />
              </div>

              {/* Buttons */}
              <div className="col-md-12 d-flex justify-content-end gap-2 mt-2">
                <button 
                  type="button" 
                  className="btn btn-sm px-4 py-2" 
                  style={{ backgroundColor: "#6c757d", color: "#fff", borderRadius: "0px", fontWeight: 600 }}
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-sm px-4 py-2" 
                  style={{ backgroundColor: "var(--spms-accent)", color: "#fff", borderRadius: "0px", fontWeight: 600 }}
                >
                  {editingTaskId !== null ? "Update Task" : "Save Task"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}