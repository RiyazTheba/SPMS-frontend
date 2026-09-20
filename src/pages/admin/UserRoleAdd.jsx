import React, { useState } from "react";
import { UserPlus, Search, UserCheck, ShieldCheck } from 'lucide-react';

function UserRoleAdd({ availableUsers, availableRoles, onAddSuccess }) {
  const [newAssignment, setNewAssignment] = useState({
    userId: "",
    roleId: ""
  });
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = availableUsers.filter(user => {
    const uName = user.fullName || user.FullName || "";
    return uName.toLowerCase().includes(userSearch.toLowerCase());
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAssignment.userId || !newAssignment.roleId) {
      alert("Please select both User and Role!");
      return;
    }
    onAddSuccess(newAssignment, () => {
      setNewAssignment({ userId: "", roleId: "" });
      setUserSearch("");
    });
  };

  return (
    <div 
      className="card border-0 shadow-sm mb-4 p-4" 
      style={{ 
        backgroundColor: "var(--spms-card)", 
        borderRadius: "8px",
        border: "1px solid var(--spms-border)"
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom" style={{ borderColor: "var(--spms-border)" }}>
     
        <h4 className="mb-0 fs-5 fw-bold" style={{ color: "var(--spms-text)" }}>Assign Role to User</h4>
      </div>

      <form onSubmit={handleSubmit} className="row g-3 align-items-end">
        
        {/* --- 1. User Selection with Search --- */}
        <div className="col-md-5">
          <label className="form-label small fw-semibold d-flex align-items-center gap-1 mb-1" style={{ color: "var(--spms-text)" }}>
            Select User
          </label>
          
          {/* Search Box */}
          <div className="input-group input-group-sm mb-2">
            <span className="input-group-text bg-transparent" style={{ borderRadius: "6px 0 0 6px", borderColor: "var(--spms-border)", color: "var(--spms-muted)" }}>
              <Search size={14} />
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search user name..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              style={{ borderRadius: "0 6px 6px 0", borderColor: "var(--spms-border)" }}
            />
          </div>

          {/* User Dropdown */}
          <select 
            className="form-select form-select-sm shadow-none"
            value={newAssignment.userId}
            onChange={(e) => setNewAssignment({ ...newAssignment, userId: e.target.value })}
            style={{ borderRadius: "6px", borderColor: "var(--spms-border)", height: "38px" }}
          >
            <option value="">-- Choose User --</option>
            {filteredUsers.map(user => {
              const uId = user.userId || user.UserId;
              const uName = user.fullName || user.FullName;
              return (
                <option key={uId} value={uId}>{uName}</option>
              );
            })}
          </select>
        </div>

        {/* --- 2. Role Selection --- */}
        <div className="col-md-4">
          <label className="form-label small fw-semibold d-flex align-items-center gap-1 mb-1" style={{ color: "var(--spms-text)" }}>
           Select Role
          </label>
          
          {/* Spacer to align perfectly with the user search bar height */}
          <div style={{ height: "31px" }} className="d-none d-md-block"></div>

          {/* Role Dropdown */}
          <select 
            className="form-select form-select-sm shadow-none"
            value={newAssignment.roleId}
            onChange={(e) => setNewAssignment({ ...newAssignment, roleId: e.target.value })}
            style={{ borderRadius: "0px", borderColor: "var(--spms-border)", height: "38px" }}
          >
            <option value="">-- Choose Role --</option>
            {availableRoles.map(role => {
              const rId = role.roleId || role.RoleId;
              const rName = role.roleName || role.RoleName;
              return (
                <option key={rId} value={rId}>{rName}</option>
              );
            })}
          </select>
        </div>

        {/* --- 3. Add Button --- */}
        <div className="col-md-3">
          <button 
            type="submit" 
            className="btn btn-sm w-100 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
            style={{ 
              backgroundColor: "var(--spms-accent, #0d6efd)", 
              color: "#fff", 
              borderRadius: "0px",
              height: "38px"
            }}
          >
            <UserPlus size={16} /> Add UserRole
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRoleAdd;