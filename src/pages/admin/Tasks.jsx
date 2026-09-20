import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    {
      taskId: 1,
      allocationID: 101,
      allocationName: "Web Development Project - Team A",
      taskTitle: "Design Database Schema",
      taskDescription: "Create a complete ER diagram and implement SQL tables.",
      taskStatus: 2,
      taskStatusName: "In Progress",
      priorityID: 1,
      priorityName: "High",
      assignedScore: 20.00,
      earnedScore: null,
      progressPercentage: 50.00,
      startDate: "2026-06-01T09:00",
      dueDate: "2026-06-10T18:00",
      completedDate: null,
      facultyRemarks: "Make sure to normalize up to 3NF.",
      studentRemarks: "Working on tables now.",
      isDeleted: false
    }
  ]);

  const availableAllocations = [
    { allocationID: 101, allocationName: "Web Development Project - Team A" },
    { allocationID: 102, allocationName: "Mobile App - Team B" },
    { allocationID: 103, allocationName: "AI Research - Team C" }
  ];

  const availableStatuses = [
    { statusId: 1, statusName: "Not Started" },
    { statusId: 2, statusName: "In Progress" },
    { statusId: 3, statusName: "Completed" }
  ];

  const availablePriorities = [
    { priorityId: 1, priorityName: "High" },
    { priorityId: 2, priorityName: "Medium" },
    { priorityId: 3, priorityName: "Low" }
  ];

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [newTaskData, setNewTaskData] = useState({
    allocationID: "",
    taskTitle: "",
    taskDescription: "",
    taskStatus: "1",
    priorityID: "",
    assignedScore: "",
    earnedScore: "",
    progressPercentage: "0",
    startDate: "",
    dueDate: "",
    facultyRemarks: "",
    studentRemarks: ""
  });

  // Errors state for per-field validation messages
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!newTaskData.allocationID) newErrors.allocationID = "Required";
    if (!newTaskData.taskTitle.trim()) newErrors.taskTitle = "Required";
    if (!newTaskData.taskDescription.trim()) newErrors.taskDescription = "Required";
    if (!newTaskData.priorityID) newErrors.priorityID = "Required";
    if (!newTaskData.assignedScore || isNaN(newTaskData.assignedScore)) newErrors.assignedScore = "Required";
    if (newTaskData.progressPercentage === "" || isNaN(newTaskData.progressPercentage)) newErrors.progressPercentage = "Required";
    if (!newTaskData.startDate) newErrors.startDate = "Required";
    if (!newTaskData.dueDate) newErrors.dueDate = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedAlloc = availableAllocations.find(a => a.allocationID === parseInt(newTaskData.allocationID));
    const selectedStatus = availableStatuses.find(s => s.statusId === parseInt(newTaskData.taskStatus));
    const selectedPriority = availablePriorities.find(p => p.priorityId === parseInt(newTaskData.priorityID));

    if (editingTaskId !== null) {
      // Update Task (No alert box)
      const isCompletedNow = parseInt(newTaskData.taskStatus) === 3;
      setTasks(tasks.map(item => item.taskId === editingTaskId ? {
        ...item,
        allocationID: selectedAlloc.allocationID,
        allocationName: selectedAlloc.allocationName,
        taskTitle: newTaskData.taskTitle,
        taskDescription: newTaskData.taskDescription,
        taskStatus: selectedStatus.statusId,
        taskStatusName: selectedStatus.statusName,
        priorityID: selectedPriority.priorityId,
        priorityName: selectedPriority.priorityName,
        assignedScore: parseFloat(newTaskData.assignedScore),
        earnedScore: newTaskData.earnedScore !== "" ? parseFloat(newTaskData.earnedScore) : null,
        progressPercentage: parseFloat(newTaskData.progressPercentage),
        startDate: newTaskData.startDate || null,
        dueDate: newTaskData.dueDate || null,
        completedDate: isCompletedNow && !item.completedDate ? new Date().toISOString() : (isCompletedNow ? item.completedDate : null),
        facultyRemarks: newTaskData.facultyRemarks,
        studentRemarks: newTaskData.studentRemarks
      } : item));
    } else {
      // Add Task (No alert box)
      const newEntry = {
        taskId: tasks.length > 0 ? Math.max(...tasks.map(t => t.taskId)) + 1 : 1,
        allocationID: selectedAlloc.allocationID,
        allocationName: selectedAlloc.allocationName,
        taskTitle: newTaskData.taskTitle,
        taskDescription: newTaskData.taskDescription,
        taskStatus: selectedStatus.statusId,
        taskStatusName: selectedStatus.statusName,
        priorityID: selectedPriority.priorityId,
        priorityName: selectedPriority.priorityName,
        assignedScore: parseFloat(newTaskData.assignedScore) || 0,
        earnedScore: newTaskData.earnedScore !== "" ? parseFloat(newTaskData.earnedScore) : null,
        progressPercentage: parseFloat(newTaskData.progressPercentage) || 0,
        startDate: newTaskData.startDate || null,
        dueDate: newTaskData.dueDate || null,
        completedDate: newTaskData.taskStatus === "3" ? new Date().toISOString() : null,
        facultyRemarks: newTaskData.facultyRemarks,
        studentRemarks: newTaskData.studentRemarks,
        isDeleted: false
      };

      setTasks([...tasks, newEntry]);
    }

    resetForm();
  };

  const resetForm = () => {
    setNewTaskData({
      allocationID: "",
      taskTitle: "",
      taskDescription: "",
      taskStatus: "1",
      priorityID: "",
      assignedScore: "",
      earnedScore: "",
      progressPercentage: "0",
      startDate: "",
      dueDate: "",
      facultyRemarks: "",
      studentRemarks: ""
    });
    setErrors({});
    setEditingTaskId(null);
    setShowAddForm(false);
  };

  const handleEditClickInList = (item) => {
    setEditingTaskId(item.taskId);
    setNewTaskData({
      allocationID: item.allocationID,
      taskTitle: item.taskTitle,
      taskDescription: item.taskDescription || "",
      taskStatus: String(item.taskStatus),
      priorityID: item.priorityID,
      assignedScore: item.assignedScore,
      earnedScore: item.earnedScore !== null ? item.earnedScore : "",
      progressPercentage: item.progressPercentage,
      startDate: item.startDate ? item.startDate.slice(0, 16) : "",
      dueDate: item.dueDate ? item.dueDate.slice(0, 16) : "",
      facultyRemarks: item.facultyRemarks || "",
      studentRemarks: item.studentRemarks || ""
    });
    setErrors({});
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.map(item => item.taskId === id ? { ...item, isDeleted: true } : item));
    }
  };

  const activeTasks = tasks.filter(t => !t.isDeleted);

  return (
    <div className="container py-4" style={{ color: "var(--spms-text)" }}>
      <TaskForm 
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        newTaskData={newTaskData}
        setNewTaskData={setNewTaskData}
        handleFormSubmit={handleFormSubmit}
        editingTaskId={editingTaskId}
        resetForm={resetForm}
        errors={errors}
        availableAllocations={availableAllocations}
        availableStatuses={availableStatuses}
        availablePriorities={availablePriorities}
      />

      <TaskList 
        tasks={activeTasks}
        handleEditClick={handleEditClickInList}
        handleDelete={handleDelete}
      />
    </div>
  );
}