import React, { useState } from "react";
import axios from "axios";
import { UserPlus } from 'lucide-react'; 
function AddRole({ onRoleAdded }) {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [descError, setDescError] = useState(false);


  const [showAddForm, setShowAddForm] = useState(false);

  
  const API_URL = "http://localhost:5278/api/Roles";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Role Name validation
    if (!roleName.trim()) {
      setRoleError(true);
      isValid = false;
    } else {
      setRoleError(false);
    }

    // Description validation
    if (!description.trim()) {
      setDescError(true);
      isValid = false;
    } else {
      setDescError(false);
    }

    if (!isValid) return;

    try {
      // API Call: POST Request to Backend
      await axios.post(API_URL, {
        roleName: roleName,
        description: description
      });

      alert("Role Added Successfully!");

      
      setRoleName("");
      setDescription("");
      setRoleError(false);
      setDescError(false);

     
      setShowAddForm(false);

     
      if (onRoleAdded) {
        onRoleAdded();
      }

    } catch (error) {
      console.error("Error adding role:", error);
      alert("Failed to add role. Please check backend.");
    }
  };

  return (
    <div className="mb-4">
      
      {/* --- ADD ROLE TOGGLE BUTTON --- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fs-5">Role Management</h4>
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
              setRoleName("");
              setDescription("");
              setRoleError(false);
              setDescError(false);
            }
            setShowAddForm(!showAddForm);
          }}
        >
          <UserPlus size={18} /> {showAddForm ? "Close Form" : "Add New Role"}
        </button>
      </div>

 
      {showAddForm && (
        <div className="card shadow-sm mb-4" style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)", borderRadius: "0px", border: 'none' }}>
          <div className="card-header">
            <h4 className="mb-0 fs-6">Add New Role</h4>
          </div>
          <div className="card-body bg-white" style={{ color: "var(--spms-text)" }}>
            <form onSubmit={handleSubmit}>
              
              {/* Role Name Input */}
              <div className="mb-3">
                <label className="form-label font-weight-bold">Role Name</label>
                <input
                  type="text"
                  className={`form-control ${roleError ? "is-invalid" : ""}`}
                  style={{
                    borderRadius: "0px",
                    border: roleError ? "1.5px solid #dc3545" : "1.5px solid #ced4da"
                  }}
                  placeholder="Enter role name"
                  value={roleName}
                  onChange={(e) => {
                    setRoleName(e.target.value);
                    if (e.target.value.trim()) setRoleError(false);
                  }}
                />
                {roleError && (
                  <small className="text-danger mt-1 d-block" style={{ fontSize: "0.8rem" }}>
                    Role name cannot be empty.
                  </small>
                )}
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <label className="form-label font-weight-bold">Description</label>
                <textarea
                  className={`form-control ${descError ? "is-invalid" : ""}`}
                  style={{
                    borderRadius: "0px",
                    border: descError ? "1.5px solid #dc3545" : "1.5px solid #ced4da"
                  }}
                  placeholder="Enter description"
                  rows="3"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (e.target.value.trim()) setDescError(false);
                  }}
                ></textarea>
                {descError && (
                  <small className="text-danger mt-1 d-block" style={{ fontSize: "0.8rem" }}>
                    Description cannot be empty.
                  </small>
                )}
              </div>

              <button type="submit" className="btn btn-sm me-2 bg-secondary text-white" style={{ borderRadius: "0px" }}>
                Save Role
              </button>
              
              <button 
                type="button" 
                className="btn btn-sm bg-light text-dark"
                style={{ borderRadius: "0px" }}
                onClick={() => { 
                  setRoleName(""); 
                  setDescription(""); 
                  setRoleError(false); 
                  setDescError(false); 
                  setShowAddForm(false); 
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AddRole;