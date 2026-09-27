import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form View State
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);


  const initialFormState = {
    projectId: 0,
    projectTitle: '',
    description: '',
    studentId: '',
    facultyId: '',
    projectStatus: 1, 
    startDate: '',
    endDate: '',
    assignedDate: new Date().toISOString().split('T')[0], // Default current date
  };

  const [formData, setFormData] = useState(initialFormState);

  // API Base URLs
  const PROJECT_API = 'http://localhost:5278/api/Projects';
  const USER_API = 'http://localhost:5278/api/UserRoles';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectRes, roleRes] = await Promise.all([
        axios.get(PROJECT_API),
        axios.get(USER_API)
      ]);

      setProjects(projectRes.data || []);
      setUsers(roleRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Data load error Check API connection.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to get Names from UserRoles data
  const getStudentName = (studentId) => {
    const student = users.find((u) => (u.userId || u.id || u.userRoleId) == studentId);
    return student ? (student.fullName || student.name || student.userName || student.roleName) : `Student #${studentId}`;
  };

  const getFacultyName = (facultyId) => {
    const faculty = users.find((u) => (u.userId || u.id || u.userRoleId) == facultyId);
    return faculty ? (faculty.fullName || faculty.name || faculty.userName || faculty.roleName) : `Faculty #${facultyId}`;
  };

  // Input Field Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open Form for Adding New Project
  const handleAddClick = () => {
    setFormData(initialFormState);
    setIsEditMode(false);
    setShowForm(true);
  };

  // Open Form for Editing Project
  const handleEditClick = (proj) => {
    setFormData({
      projectId: proj.projectId,
      projectTitle: proj.projectTitle || '',
      description: proj.description || '',
      studentId: proj.studentId || '',
      facultyId: proj.facultyId || '',
      projectStatus: proj.projectStatus || 1,
      startDate: proj.startDate ? proj.startDate.split('T')[0] : '',
      endDate: proj.endDate ? proj.endDate.split('T')[0] : '',
      assignedDate: proj.assignedDate ? proj.assignedDate.split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setIsEditMode(true);
    setShowForm(true);
  };

  // Form Submit (Insert / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        projectId: parseInt(formData.projectId) || 0,
        studentId: parseInt(formData.studentId),
        facultyId: parseInt(formData.facultyId),
        projectStatus: parseInt(formData.projectStatus),
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        assignedDate: formData.assignedDate ? new Date(formData.assignedDate).toISOString() : new Date().toISOString(),
      };

      if (isEditMode) {
        await axios.put(`${PROJECT_API}/${formData.projectId}`, payload);
        alert('Project successfully update ');
      } else {
        await axios.post(PROJECT_API, payload);
        alert('New Project successfully add ');
      }

      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error('Full Error Response:', err.response?.data);
      if (err.response?.data?.errors) {
        console.error('Validation Errors Detail:', JSON.stringify(err.response.data.errors, null, 2));
      }
      alert('Project save ');
    }
  };

  // Delete Project
  const handleDelete = async (projectId) => {
    if (window.confirm('are you sure delete project')) {
      try {
        await axios.delete(`${PROJECT_API}/${projectId}`);
        setProjects(projects.filter((proj) => proj.projectId !== projectId));
        alert('Project delete ');
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Project not delete .');
      }
    }
  };

  // --- FILTERING FROM USERROLES API ONLY ---
  const studentList = users.filter((u) => {
    const roleText = (u.role || u.roleName || u.name || u.userType || '').toLowerCase();
    return roleText.includes('student');
  });

  const facultyList = users.filter((u) => {
    const roleText = (u.role || u.roleName || u.name || u.userType || '').toLowerCase();
    return roleText.includes('faculty') || roleText.includes('teacher') || roleText.includes('professor');
  });

  const availableStudents = studentList.length > 0 ? studentList : users;
  const availableFaculties = facultyList.length > 0 ? facultyList : users;

  if (loading) {
    return (
      <div className="container mt-5 text-center" style={{ color: 'var(--spms-text)' }}>
        <div className="spinner-border" role="status" style={{ color: 'var(--spms-accent)' }}></div>
        <p className="mt-2">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4" style={{ color: 'var(--spms-text)', minHeight: '100vh' }}>
      
      {/* Top Header Card */}
      <div className="card shadow-sm mb-4" style={{ backgroundColor: 'var(--spms-card)', borderColor: 'var(--spms-border)' }}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-1" style={{ color: 'var(--spms-text)' }}>Project List</h3>
            <p className="mb-0 text-muted">Manage your student projects efficiently</p>
          </div>
          {!showForm && (
            <button 
              className="btn fw-semibold" 
              style={{ backgroundColor: 'var(--spms-accent)', color: '#fff', border: 'none', borderRadius: 0 }} 
              onClick={handleAddClick}
            >
              <i className="bi bi-plus-lg me-2"></i> + Add New Project
            </button>
          )}
        </div>
      </div>

      {/* Inline Form Section */}
      {showForm ? (
        <div className="card shadow-sm mb-4 border" style={{ backgroundColor: 'var(--spms-card)', borderColor: 'var(--spms-border)' }}>
          <div className="card-header py-3 border-bottom d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--spms-navbar)', color: '#fff', borderColor: 'var(--spms-border)' }}>
            <h5 className="mb-0 fw-bold">{isEditMode ? 'Edit Project Details' : 'Add New Project Form'}</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={() => setShowForm(false)}
            ></button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                {/* Project Title */}
                <div className="col-md-12">
                  <label className="form-label fw-semibold" style={{ color: 'var(--spms-text)' }}>
                    Project Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ backgroundColor: '#fff', borderColor: 'var(--spms-border)', color: 'var(--spms-text)' }}
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter project title"
                  />
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <label className="form-label fw-semibold" style={{ color: 'var(--spms-text)' }}>Description</label>
                  <textarea
                    className="form-control"
                    style={{ backgroundColor: '#fff', borderColor: 'var(--spms-border)', color: 'var(--spms-text)' }}
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter project description"
                  ></textarea>
                </div>

                {/* Student Select */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: 'var(--spms-text)' }}>
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: '#fff', borderColor: 'var(--spms-border)', color: 'var(--spms-text)' }}
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Student --</option>
                    {availableStudents.map((stu) => (
                      <option key={stu.userId || stu.id || stu.userRoleId} value={stu.userId || stu.id || stu.userRoleId}>
                        {stu.fullName || stu.name || stu.userName || stu.roleName || `ID: ${stu.userId || stu.id || stu.userRoleId}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Faculty Select */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: 'var(--spms-text)' }}>
                    Faculty Name <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: '#fff', borderColor: 'var(--spms-border)', color: 'var(--spms-text)' }}
                    name="facultyId"
                    value={formData.facultyId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Faculty --</option>
                    {availableFaculties.map((fac) => (
                      <option key={fac.userId || fac.id || fac.userRoleId} value={fac.userId || fac.id || fac.userRoleId}>
                        {fac.fullName || fac.name || fac.userName || fac.roleName || `ID: ${fac.userId || fac.id || fac.userRoleId}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: 'var(--spms-text)' }}>Start Date <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ backgroundColor: '#fff', borderColor: 'var(--spms-border)', color: 'var(--spms-text)' }}
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* End Date */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: 'var(--spms-text)' }}>End Date <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ backgroundColor: '#fff', borderColor: 'var(--spms-border)', color: 'var(--spms-text)' }}
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Project Status */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: 'var(--spms-text)' }}>Status <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: '#fff', borderColor: 'var(--spms-border)', color: 'var(--spms-text)' }}
                    name="projectStatus"
                    value={formData.projectStatus}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={1}>In Progress</option>
                    <option value={2}>Completed</option>
                  </select>
                </div>

              </div>

              {/* Form Action Buttons */}
              <div className="mt-4 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary px-4" 
                  style={{ borderRadius: 0 }}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn px-4 fw-semibold"
                  style={{ backgroundColor: 'var(--spms-accent)', color: '#fff', border: 'none', borderRadius: 0 }}
                >
                  {isEditMode ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Projects Table Card */}
      <div className="card shadow-sm" style={{ backgroundColor: 'var(--spms-card)', borderColor: 'var(--spms-border)' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ color: 'var(--spms-text)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--spms-sidebar)', color: '#fff' }}>
                  <th className="py-3">Project Title</th>
                  <th className="ps-4 py-3">Student Name</th>
                  <th className="py-3">Faculty Name</th>
                  <th className="py-3">Status</th>
                  <th className="text-center py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((proj) => (
                    <tr key={proj.projectId} style={{ borderBottomColor: 'var(--spms-border)' }}>
                      <td>
                        <div className="fw-semibold">{proj.projectTitle}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '250px' }}>
                          {proj.description}
                        </small>
                      </td>
                      <td className="ps-4 fw-semibold">
                        {proj.studentName || getStudentName(proj.studentId)}
                      </td>
                      <td className="ps-4 fw-semibold">
                        {proj.FacultyName || getFacultyName(proj.facultyId)}
                      </td>
                      <td>
                        <span className={`badge ${proj.projectStatus === 2 ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {proj.projectStatus === 2 ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary" 
                            style={{ borderRadius: 0 }}
                            onClick={() => handleEditClick(proj)}
                          >
                            <Pencil size={16} color="#007bff" />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger" 
                            style={{ borderRadius: 0 }}
                            onClick={() => handleDelete(proj.projectId)}
                          >
                            <Trash2 size={16} color="#dc3545" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="text-muted">
                        <h5>No Projects Found</h5>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Project;