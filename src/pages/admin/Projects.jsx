import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

export default function Project() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);
  
  const [availableStudents] = useState([
    { studentId: '1', fullName: 'Rahul Sharma' },
    { studentId: '2', fullName: 'Priya Patel' }
  ]);
  const [availableFaculty] = useState([
    { facultyId: '1', fullName: 'Dr. A. B. Mehta' },
    { facultyId: '2', fullName: 'Prof. K. R. Shah' }
  ]);
  const [availableStatuses] = useState([
    { statusId: 'pending', statusName: 'Pending' },
    { statusId: 'in-progress', statusName: 'In Progress' },
    { statusId: 'completed', statusName: 'Completed' }
  ]);

  const initialFormState = {
    id: null,
    projectTitle: '',
    studentId: '',
    facultyId: '',
    description: '',
    projectStatus: 'pending',
    startDate: '',
    endDate: '',
    totalTasks: '',
    completedTasks: ''
  };

  const [newProjectData, setNewProjectData] = useState(initialFormState);
  
  // Errors state for per-field validation messages (No alert boxes!)
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!newProjectData.projectTitle || !newProjectData.projectTitle.trim()) {
      newErrors.projectTitle = "Required";
    }
    if (!newProjectData.studentId) {
      newErrors.studentId = "Required";
    }
    if (!newProjectData.facultyId) {
      newErrors.facultyId = "Required";
    }
    if (!newProjectData.startDate) {
      newErrors.startDate = "Required";
    }
    if (!newProjectData.endDate) {
      newErrors.endDate = "Required";
    }

    const total = parseInt(newProjectData.totalTasks) || 0;
    const completed = parseInt(newProjectData.completedTasks) || 0;

    if (completed > total) {
      newErrors.completedTasks = "Cannot exceed total tasks";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or Update Project Handler with Validation & Progress Capping
  const handleAddProject = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stops submission & shows red line/error under input boxes

    const total = parseInt(newProjectData.totalTasks) || 0;
    const completed = parseInt(newProjectData.completedTasks) || 0;

    // Resolve Foreign Keys to Names
    const selectedStudent = availableStudents.find(s => s.studentId === newProjectData.studentId);
    const selectedFaculty = availableFaculty.find(f => f.facultyId === newProjectData.facultyId);
    const selectedStatus = availableStatuses.find(s => s.statusId === newProjectData.projectStatus);

    // Calculate Task Progress Percentage (Capped at max 100%)
    const rawProgress = total > 0 ? (completed / total) * 100 : 0;
    const calcProgress = Math.min(100, rawProgress).toFixed(2);

    const processedData = {
      ...newProjectData,
      studentName: selectedStudent ? selectedStudent.fullName : '',
      facultyName: selectedFaculty ? selectedFaculty.fullName : '',
      projectStatusName: selectedStatus ? selectedStatus.statusName : '',
      totalTasks: total,
      completedTasks: completed,
      progressPercentage: parseFloat(calcProgress)
    };

    if (isEditing) {
      // Update existing project
      setProjects(projects.map(p => p.id === processedData.id ? processedData : p));
    } else {
      // Add new project
      setProjects([...projects, { ...processedData, id: Date.now(), assignedDate: new Date().toISOString().split('T')[0] }]);
    }
    
    // Reset and close form
    setShowAddForm(false);
    setIsEditing(false);
    setNewProjectData(initialFormState);
    setErrors({});
  };

  // Triggered when "Update" button is clicked from the list
  const handleEditProject = (proj) => {
    setNewProjectData(proj);
    setIsEditing(true);
    setShowAddForm(true);
    setErrors({});
  };

  // Delete Project Handler
  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(item => item.id !== id));
    }
  };

  return (
    <div className="container py-4" style={{ color: "var(--spms-text)" }}>
      {/* --- HEADER & ADD TOGGLE BUTTON --- */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 fs-5">Project Management</h4>
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
                // If closing, reset form state & errors
                setIsEditing(false);
                setNewProjectData(initialFormState);
                setErrors({});
              }
              setShowAddForm(!showAddForm);
            }}
          >
            <Plus size={18} /> {showAddForm ? "Close Form" : "Add New Project"}
          </button>
        </div>

        {/* --- ADD / EDIT PROJECT FORM COMPONENT --- */}
        {showAddForm && (
          <ProjectForm 
            newProjectData={newProjectData}
            setNewProjectData={setNewProjectData}
            handleAddProject={handleAddProject}
            availableStudents={availableStudents}
            availableFaculty={availableFaculty}
            availableStatuses={availableStatuses}
            isEditing={isEditing}
            errors={errors}
          />
        )}
      </div>

      {/* --- PROJECT LIST COMPONENT --- */}
      <ProjectList 
        projects={projects} 
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
}