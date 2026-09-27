import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]); 
  
  const initialFormState = {
    allocationId: '',
    taskTitle: '',
    taskDescription: '',
    status: 'Pending',
    priority: 'Medium',
    assignedScore: 0,
    progress: 0,
    startDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    earnedScore: 0,
    facultyRemarks: '',
    studentRemarks: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const TASK_API_URL = "http://localhost:5278/api/Tasks";
  const PROJECT_API_URL = "http://localhost:5278/api/Projects"; 

  useEffect(() => {
    fetchTasks();
    fetchProjects(); 
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(TASK_API_URL);
      setTasks(response.data);
      setError('');
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks from server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(PROJECT_API_URL);
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to fetch projects list.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value
    });

    // Clear error when user starts typing/selecting
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Validation function
  const validateForm = () => {
    let errors = {};
    if (!formData.allocationId) {
      errors.allocationId = "Please select a project.";
    }
    if (!formData.taskTitle.trim()) {
      errors.taskTitle = "Task title is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        await axios.put(`${TASK_API_URL}/${currentId}`, formData);
        setIsEditing(false);
        setCurrentId(null);
      } else {
        await axios.post(TASK_API_URL, formData);
      }

      setFormData(initialFormState);
      setFormErrors({});
      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err.response?.data || err.message);
      setError("Failed to save task. Check required fields or backend validation.");
    }
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setCurrentId(task.taskId);
    setFormErrors({});
    setFormData({
      allocationId: task.allocationId || '',
      taskTitle: task.taskTitle || '',
      taskDescription: task.taskDescription || '',
      status: task.status || 'Pending',
      priority: task.priority || 'Medium',
      assignedScore: task.assignedScore || 0,
      progress: task.progress || 0,
      startDate: task.startDate ? task.startDate.split('T')[0] : '',
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      earnedScore: task.earnedScore || 0,
      facultyRemarks: task.facultyRemarks || '',
      studentRemarks: task.studentRemarks || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${TASK_API_URL}/${id}`);
        fetchTasks();
      } catch (err) {
        console.error("Error deleting task:", err);
        setError("Failed to delete task.");
      }
    }
  };

  const getProjectTitle = (allocationId) => {
    const matchedProject = projects.find(project => {
      const pId = project.allocationId || project.projectId || project.id;
      return String(pId) === String(allocationId);
    });

    if (matchedProject) {
      return matchedProject.projectTitle || matchedProject.title || matchedProject.projectName || matchedProject.name || `Project ID: ${allocationId}`;
    }
    return `Allocation ID: ${allocationId}`;
  };

  // Helper for dynamic status badge colors
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'In Progress':
        return 'bg-warning text-dark';
      case 'Pending':
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{color: "var(--spms-text)"}}>
      <div className="card  p-4 rounded-0">
        <h2 className=" mb-4 fs-5 ">Task Management</h2>

        {error && <div className="alert alert-danger rounded-0">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-5 bg-light p-4 rounded-0 ">
          <h4 className="mb-3 text-secondary">{isEditing ? 'Update Task' : 'Add New Task'}</h4>
          
          <div className="row" style={{color: "var(--spms-text)"}}>
            {/* Project Selection Dropdown */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Select Project</label>
              <select
                name="allocationId"
                value={formData.allocationId}
                onChange={handleChange}
                className={`form-select rounded-0 ${formErrors.allocationId ? 'is-invalid' : ''}`}
              >
                <option value="">-- Choose Project Name --</option>
                {projects.map((project, index) => {
                  const pId = project.allocationId || project.projectId || project.id;
                  const pName = project.projectTitle || project.title || project.projectName || project.name;
                  
                  return (
                    <option key={pId || index} value={pId}>
                      {pName ? pName : `Project ID: ${pId}`}
                    </option>
                  );
                })}
              </select>
              {formErrors.allocationId && (
                <div className="text-danger small mt-1">{formErrors.allocationId}</div>
              )}
            </div>

            {/* Task Title */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Task Title</label>
              <input
                type="text"
                name="taskTitle"
                value={formData.taskTitle}
                onChange={handleChange}
                className={`form-control rounded-0 ${formErrors.taskTitle ? 'is-invalid' : ''}`}
                placeholder="Enter task title"
              />
              {formErrors.taskTitle && (
                <div className="text-danger small mt-1">{formErrors.taskTitle}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Task Description</label>
            <textarea
              name="taskDescription"
              value={formData.taskDescription}
              onChange={handleChange}
              className="form-control rounded-0"
              rows="2"
              placeholder="Enter task description"
            />
          </div>

          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-select rounded-0">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="form-select rounded-0">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Assigned Score</label>
              <input type="number" name="assignedScore" value={formData.assignedScore} onChange={handleChange} className="form-control rounded-0" />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Progress (%)</label>
              <input type="number" name="progress" value={formData.progress} onChange={handleChange} className="form-control rounded-0" min="0" max="100" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-control rounded-0" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Due Date</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="form-control rounded-0" />
            </div>
          </div>
          
          <div className="d-flex gap-2 mt-3 " style={{}}>
            <button type="submit" className={`btn ${isEditing ? 'btn-success' : 'btn-primary'} rounded-0 px-4`}  style={{backgroundColor: 'var(--spms-accent)',border:'none'}}>
              {isEditing ? 'Update Task' : '+ Add Task'}
            </button>
            {isEditing && (
              <button 
                type="button" 
                onClick={() => { setIsEditing(false); setFormData(initialFormState); setCurrentId(null); setFormErrors({}); }} 
                className="btn btn-secondary border border-none rounded-0 px-4"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List Table */}
        <div>
          <h4 className="mb-3 text-secondary fs-6" style={{color: "var(--spms-text)"}}>Task Records List</h4>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="alert alert-warning text-center rounded-0">No tasks found!</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table">
                  <tr>
                    <th>ID</th>
                    <th>Project Name</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Progress</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.taskId}>
                      <td>{task.taskId}</td>
                      <td>{getProjectTitle(task.allocationId)}</td>
                      <td className="fw-semibold">{task.taskTitle}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td>{task.priority}</td>
                      <td>{task.progress}%</td>
                      <td className="text-center">
                        <button onClick={() => handleEdit(task)} className="btn  btn-sm rounded-0 border  me-2 text-white"><Pencil size={16} color="#007bff" /> </button>
                        <button onClick={() => handleDelete(task.taskId)} className="btn  btn-sm rounded-0 border"> <Trash2 size={16} color="#dc3545" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}