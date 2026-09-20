import React from "react";
import { Pencil, Trash2, X, Check, Eye, EyeOff } from 'lucide-react';

function UserList({
  users, 
  editingUserId, 
  editUserData, 
  setEditUserData, 
  onEditClick, 
  onCancelEdit, 
  onUpdateUser, 
  onDelete, 
  showTablePasswords, 
  toggleTablePassword
}){

    return (
        <>
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
            <h4 className="mb-0 fs-6">System Users</h4>
          </div>
          {/* Changed activeUsers to users */}
          <span className="badge px-3 py-2" style={{ backgroundColor: "var(--spms-accent)", fontSize: "0.85rem", borderRadius: "0px" }}>
            Total Users: {users.length}
          </span>
        </div>

        <div className="p-4">
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ color: "var(--spms-text)" }}>
              <thead style={{ color: "var(--spms-muted)" }}>
                <tr style={{ borderBottom: "2px solid var(--spms-border)" }}>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>#</th>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Avatar</th>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Full Name</th>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Email</th>
              
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Mobile</th>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Status</th>
                  <th className="py-3 px-3 text-end" style={{ color: "var(--spms-text)" }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{color:"--var(text-muted)"}}>
                {/* Changed activeUsers to users */}
                {users.length > 0 ? (
                  users.map((user, index) => {
                    const isEditing = editingUserId === user.userId;
                    const isPasswordShown = showTablePasswords[user.userId] || false;

                    return (
                      <tr 
                        key={user.userId} 
                        style={{ borderBottom: "1px solid var(--spms-border)", transition: "background 0.2s" }}
                      >
                        <td className="py-3 px-3 fw-semibold" style={{ color:"var(--spms-text)" }}>
                          {index + 1}
                        </td>
                        
                        {/* Profile Picture Column */}
                        <td className="py-3 px-3">
                          {isEditing ? (
                            <input 
                              type="text" 
                              className="form-control form-control-sm "
                              value={editUserData.profilePicturePath}
                              onChange={(e) => setEditUserData({ ...editUserData, profilePicturePath: e.target.value })}
                              placeholder="Image Path/URL"
                              style={{ borderRadius: "0px", width: "100px" }}
                            />
                          ) : (
                            <img 
                              src={user.profilePicturePath || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} 
                              alt={user.fullName}
                              className="rounded-circle"
                              style={{ width: "38px", height: "38px", objectFit: "cover", border: "1px solid var(--spms-border)" }}
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                              }}
                            />
                          )}
                        </td>

                        {/* Full Name Column */}
                        <td className="py-3 px-3">
                          {isEditing ? (
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={editUserData.fullName}
                              onChange={(e) => setEditUserData({ ...editUserData, fullName: e.target.value })}
                              style={{ borderRadius: "0px" }}
                            />
                          ) : (
                            <span className="fw-bold" style={{ fontSize: "0.95rem" }}>
                              {user.fullName}
                            </span>
                          )}
                        </td>

                        {/* Email Column */}
                        <td className="py-3 px-3" style={{ color: "var(--spms-muted)", fontSize: "0.95rem" }}>
                          {isEditing ? (
                            <input 
                              type="email" 
                              className="form-control form-control-sm"
                              value={editUserData.email}
                              onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                              style={{ borderRadius: "0px" }}
                            />
                          ) : (
                            user.email
                          )}
                        </td>

                       

                        {/* Mobile Number Column */}
                        <td className="py-3 px-3" style={{ color: "var(--spms-muted)", fontSize: "0.95rem" }}>
                          {isEditing ? (
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={editUserData.mobileNumber}
                              onChange={(e) => setEditUserData({ ...editUserData, mobileNumber: e.target.value })}
                              style={{ borderRadius: "0px" }}
                            />
                          ) : (
                            user.mobileNumber
                          )}
                        </td>

                        {/* Status Column (IsActive) */}
                        <td className="py-3 px-3">
                          {isEditing ? (
                            <select 
                              className="form-select form-select-sm"
                              value={editUserData.isActive ? "true" : "false"}
                              onChange={(e) => setEditUserData({ ...editUserData, isActive: e.target.value === "true" })}
                              style={{ borderRadius: "0px" }}
                            >
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </select>
                          ) : (
                            <span 
                              className="badge px-2 py-1" 
                              style={{ 
                                backgroundColor: user.isActive ? "rgba(40, 167, 69, 0.1)" : "rgba(220, 53, 69, 0.1)", 
                                color: user.isActive ? "#28a745" : "#dc3545",
                                borderRadius: "0px",
                                fontSize: "0.8rem"
                              }}
                            >
                              {user.isActive ? "Active" : "Inactive"}
                            </span>
                          )}
                        </td>

                        {/* Actions Column */}
                        <td className="py-3 px-3 text-end">
                          {isEditing ? (
                            <>
                              <button 
                                className="btn btn-sm me-2 px-2"
                                style={{ backgroundColor: "rgba(40, 167, 69, 0.1)", color: "#28a745", border: "1.5px solid #28a745", borderRadius: "0px" }}
                                onClick={() => onUpdateUser(user.userId)}
                              >
                                <Check size={18} />
                              </button>
                              <button 
                                className="btn btn-sm px-2"
                                style={{ backgroundColor: "rgba(108, 117, 125, 0.1)", color: "#6c757d", border: "1.5px solid #6c757d", borderRadius: "0px" }}
                                onClick={onCancelEdit}
                              >
                                <X size={18} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                className="btn btn-sm me-2 px-3"
                                style={{ 
                                  backgroundColor: "transparent", 
                                  color: "var(--spms-sidebar)", 
                                  border: "1.5px solid var(--spms-sidebar)",
                                  fontWeight: 600,
                                  borderRadius: "0px"
                                }}
                                onClick={() => onEditClick(user)}
                              >
                                <Pencil size={18} color="#007bff" />
                              </button>
                              <button 
                                className="btn btn-sm px-3" 
                                style={{ 
                                  backgroundColor: "rgba(220, 53, 69, 0.1)", 
                                  color: "#dc3545", 
                                  border: "1.5px solid rgba(220, 53, 69, 0.2)",
                                  fontWeight: 600,
                                  borderRadius: "0px"
                                }}
                                onClick={() => onDelete(user.userId)}
                              >
                                <Trash2 size={18} color="#dc3500" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">
                      No active users found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
    );
}

export default UserList;