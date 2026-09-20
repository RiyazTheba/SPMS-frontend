import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, X, Check, UserPlus, Eye, EyeOff } from 'lucide-react';

import UserList from "./UserList";

function Users() {
  const [users, setUsers] = useState([]);

 
  const API_URL = "http://localhost:5278/api/Users";

 
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const [showPassword, setShowPassword] = useState(false);

  
  const [showTablePasswords, setShowTablePasswords] = useState({});


  const [newUserData, setNewUserData] = useState({
    fullName: "",
    email: "",
    password: "password123", 
    mobileNumber: "",
    profilePicturePath: "",
    isActive: true
  });

  const [showAddForm, setShowAddForm] = useState(false);
  
  // Errors state for required fields
  const [errors, setErrors] = useState({});

  // Edit states
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ 
    fullName: "", 
    email: "", 
    password: "",
    mobileNumber: "", 
    profilePicturePath: "",
    isActive: true 
  });

  const toggleTablePassword = (userId) => {
    setShowTablePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const validateAddForm = () => {
    let newErrors = {};
    if (!newUserData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!newUserData.email.trim()) {
      newErrors.email = "Email Address is required";
    }
    if (!newUserData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required";
    }
    if (!newUserData.profilePicturePath.trim()) {
      newErrors.profilePicturePath = "Profile Picture Path is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API Call: POST (Register User)
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!validateAddForm()) return; 

    try {
      await axios.post(`${API_URL}/Register`, {
        ...newUserData,
        isDeleted: false
      });

      // Refresh list after adding
      fetchUsers();

      setNewUserData({
        fullName: "",
        email: "",
        password: "password123", 
        mobileNumber: "",
        profilePicturePath: "",
        isActive: true
      });
      setErrors({});
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to register user.");
    }
  };

  // API Call: DELETE (Remove User)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // Refresh list after deleting
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.userId);
    setEditUserData({ 
      fullName: user.fullName, 
      email: user.email, 
      password: user.password,
      mobileNumber: user.mobileNumber, 
      profilePicturePath: user.profilePicturePath,
      isActive: user.isActive 
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditUserData({ fullName: "", email: "", password: "", mobileNumber: "", profilePicturePath: "", isActive: true });
  };

  // API Call: PUT (Update User)
  const handleUpdateUser = async (id) => {
    if (!editUserData.fullName.trim() || !editUserData.email.trim() || !editUserData.mobileNumber.trim() || !editUserData.profilePicturePath.trim()) {
      alert("Fields cannot be empty!");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, editUserData);
      // Refresh list after updating
      fetchUsers();
      setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const activeUsers = users.filter(user => !user.isDeleted);

  return (
    <div className="container py-4" style={{ color: "var(--spms-text)" }}>
    
      {/* --- ADD USER TOGGLE BUTTON & FORM --- */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 fs-5">User Management</h4>
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
                setErrors({});
                setNewUserData({
                  fullName: "",
                  email: "",
                  password: "password123",
                  mobileNumber: "",
                  profilePicturePath: "",
                  isActive: true
                });
              }
              setShowAddForm(!showAddForm);
            }}
          >
            <UserPlus size={18} /> {showAddForm ? "Close Form" : "Add New User"}
          </button>
        </div>

        {showAddForm && (
          <div 
            className="card border-0 shadow-sm p-4 mb-4" 
            style={{ 
              backgroundColor: "var(--spms-card)", 
              borderRadius: "0px", 
              border: "1px solid var(--spms-border)" 
            }}
          >
            <h5 className="mb-3 fs-6" style={{ color: "var(--spms-text)" }}>Add User Details</h5>
            <form onSubmit={handleAddUser} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" style={{ fontSize: "0.9rem" }}>Full Name</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${errors.fullName ? 'is-invalid' : ''}`}
                    style={{ borderRadius: "0px" }}
                    value={newUserData.fullName}
                    onChange={(e) => setNewUserData({ ...newUserData, fullName: e.target.value })}
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ fontSize: "0.9rem" }}>Email Address</label>
                  <input 
                    type="email" 
                    className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                    style={{ borderRadius: "0px" }}
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontSize: "0.9rem" }}>Password <span className="text-muted">(Default)</span></label>
                  <div className="input-group input-group-sm">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control"
                      style={{ borderRadius: "0px" }}
                      value={newUserData.password}
                      onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    />
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      style={{ borderRadius: "0px" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontSize: "0.9rem" }}>Mobile Number</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${errors.mobileNumber ? 'is-invalid' : ''}`}
                    style={{ borderRadius: "0px" }}
                    value={newUserData.mobileNumber}
                    onChange={(e) => setNewUserData({ ...newUserData, mobileNumber: e.target.value })}
                  />
                  {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontSize: "0.9rem" }}>Profile Picture URL / Path</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${errors.profilePicturePath ? 'is-invalid' : ''}`}
                    placeholder="/uploads/... or Image URL"
                    style={{ borderRadius: "0px" }}
                    value={newUserData.profilePicturePath}
                    onChange={(e) => setNewUserData({ ...newUserData, profilePicturePath: e.target.value })}
                  />
                  {errors.profilePicturePath && <div className="invalid-feedback">{errors.profilePicturePath}</div>}
                </div>
                <div className="col-12 text-end">
                  <button 
                    type="submit" 
                    className="btn btn-sm px-4 py-2" 
                    style={{ backgroundColor: "var(--spms-accent)", color: "#fff", borderRadius: "0px", fontWeight: 600 }}
                  >
                    Save User
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      <div>
        {/* Pass down required props to UserList component */}
        <UserList 
          users={activeUsers} 
          editingUserId={editingUserId}
          editUserData={editUserData}
          setEditUserData={setEditUserData}
          onEditClick={handleEditClick}
          onCancelEdit={handleCancelEdit}
          onUpdateUser={handleUpdateUser}
          onDelete={handleDelete}
          showTablePasswords={showTablePasswords}
          toggleTablePassword={toggleTablePassword}
        />
      </div>

   
      
    </div> 
  );
}

export default Users;