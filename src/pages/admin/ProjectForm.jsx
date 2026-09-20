import React from 'react';

export default function ProjectForm({ 
  newProjectData, 
  setNewProjectData, 
  handleAddProject, 
  availableStudents = [], 
  availableFaculty = [], 
  availableStatuses = [],
  isEditing,
  errors = {}
}) {
  return (
    <div 
      className="card border-0 shadow-sm p-4 mb-4" 
      style={{ 
        backgroundColor: "var(--spms-card)", 
        borderRadius: "0px", 
        border: "1px solid var(--spms-border)",
        color: "var(--spms-text)"
      }}
    >
      <h5 className="mb-3 fs-6 fw-semibold" style={{ color: "var(--spms-text)" }}>
        {isEditing ? "Update Project Entry" : "Create Project Entry"}
      </h5>
      
      <form onSubmit={handleAddProject} noValidate>
        <div className="row g-3">
          {/* Project Title */}
          <div className="col-md-6">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Project Title</label>
            <input 
              type="text" 
              className={`form-control form-control-sm ${errors.projectTitle ? 'is-invalid' : ''}`}
              style={{ borderRadius: "0px" }}
              placeholder="Enter project title"
              value={newProjectData.projectTitle}
              onChange={(e) => setNewProjectData({ ...newProjectData, projectTitle: e.target.value })}
            />
            {errors.projectTitle && <div className="invalid-feedback">{errors.projectTitle}</div>}
          </div>

          {/* Student Dropdown */}
          <div className="col-md-3">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Student</label>
            <select 
              className={`form-select form-select-sm ${errors.studentId ? 'is-invalid' : ''}`}
              style={{ borderRadius: "0px" }}
              value={newProjectData.studentId}
              onChange={(e) => setNewProjectData({ ...newProjectData, studentId: e.target.value })}
            >
              <option value="">Choose Student...</option>
              {availableStudents?.map(s => (
                <option key={s.studentId} value={s.studentId}>{s.fullName}</option>
              ))}
            </select>
            {errors.studentId && <div className="invalid-feedback">{errors.studentId}</div>}
          </div>

          {/* Faculty Dropdown */}
          <div className="col-md-3">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Faculty</label>
            <select 
              className={`form-select form-select-sm ${errors.facultyId ? 'is-invalid' : ''}`}
              style={{ borderRadius: "0px" }}
              value={newProjectData.facultyId}
              onChange={(e) => setNewProjectData({ ...newProjectData, facultyId: e.target.value })}
            >
              <option value="">Choose Faculty...</option>
              {availableFaculty?.map(f => (
                <option key={f.facultyId} value={f.facultyId}>{f.fullName}</option>
              ))}
            </select>
            {errors.facultyId && <div className="invalid-feedback">{errors.facultyId}</div>}
          </div>

          {/* Description (Optional) */}
          <div className="col-md-12">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Description <span className="text-muted">(Opt)</span></label>
            <textarea 
              className="form-control form-control-sm"
              style={{ borderRadius: "0px" }}
              rows="2"
              placeholder="Provide project details..."
              value={newProjectData.description}
              onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
            ></textarea>
          </div>

          {/* Status Dropdown */}
          <div className="col-md-3">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Status</label>
            <select 
              className="form-select form-select-sm"
              style={{ borderRadius: "0px" }}
              value={newProjectData.projectStatus}
              onChange={(e) => setNewProjectData({ ...newProjectData, projectStatus: e.target.value })}
            >
              {availableStatuses?.map(s => (
                <option key={s.statusId} value={s.statusId}>{s.statusName}</option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="col-md-3">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Start Date</label>
            <input 
              type="date" 
              className={`form-control form-control-sm ${errors.startDate ? 'is-invalid' : ''}`}
              style={{ borderRadius: "0px" }}
              value={newProjectData.startDate}
              onChange={(e) => setNewProjectData({ ...newProjectData, startDate: e.target.value })}
            />
            {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
          </div>

          {/* End Date */}
          <div className="col-md-3">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>End Date</label>
            <input 
              type="date" 
              className={`form-control form-control-sm ${errors.endDate ? 'is-invalid' : ''}`}
              style={{ borderRadius: "0px" }}
              value={newProjectData.endDate}
              onChange={(e) => setNewProjectData({ ...newProjectData, endDate: e.target.value })}
            />
            {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
          </div>

          {/* Total Tasks (Optional) */}
          <div className="col-md-3">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Total Tasks <span className="text-muted">(Opt)</span></label>
            <input 
              type="number" 
              className="form-control form-control-sm"
              style={{ borderRadius: "0px" }}
              min="0"
              placeholder="0"
              value={newProjectData.totalTasks}
              onChange={(e) => setNewProjectData({ ...newProjectData, totalTasks: e.target.value })}
            />
          </div>

          {/* Completed Tasks (Optional) & Submit Button Row */}
          <div className="col-md-3">
            <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Completed Tasks <span className="text-muted">(Opt)</span></label>
            <input 
              type="number" 
              className="form-control form-control-sm"
              style={{ borderRadius: "0px" }}
              min="0"
              placeholder="0"
              value={newProjectData.completedTasks}
              onChange={(e) => setNewProjectData({ ...newProjectData, completedTasks: e.target.value })}
            />
          </div>

          <div className="col-md-9 d-flex align-items-end">
            <button 
              type="submit" 
              className="btn btn-sm w-100 py-2" 
              style={{ 
                backgroundColor: "var(--spms-accent)", 
                color: "#fff", 
                borderRadius: "0px", 
                fontWeight: 600,
                letterSpacing: "0.5px"
              }}
            >
              {isEditing ? "Update Project" : "Save Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}