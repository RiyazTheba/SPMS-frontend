import React, { useState } from "react";
import { Pencil, Trash2, X, Check } from 'lucide-react';

function UserRoleList({ userRoles, availableUsers, availableRoles, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ userId: "", roleId: "" });

  const handleEditClick = (item) => {
    setEditingId(item.rolePermissionId);
    setEditData({ 
      userId: item.userId, 
      roleId: item.roleId 
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ userId: "", roleId: "" });
  };

  const handleSaveUpdate = (id) => {
    if (!editData.userId || !editData.roleId) {
      alert("Fields cannot be empty!");
      return;
    }
    onUpdate(id, editData, () => {
      setEditingId(null);
    });
  };

  return (
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
          <h4 className="mb-0 fs-6">User Roles Table List</h4>
        </div>
        <span className="badge px-3 py-2" style={{ backgroundColor: "var(--spms-accent)", fontSize: "0.85rem", borderRadius: "0px" }}>
          Total Mappings: {userRoles.length}
        </span>
      </div>

      <div className="p-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ color: "var(--spms-text)" }}>
            <thead style={{ color: "var(--spms-muted)" }}>
              <tr style={{ borderBottom: "2px solid var(--spms-border)" }}>
                <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>#</th>
                <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>User Name</th>
                <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Assigned Role</th>
                <th className="py-3 px-3 text-end" style={{ color: "var(--spms-text)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRoles.length > 0 ? (
                userRoles.map((item, index) => {
                  const isEditing = editingId === item.rolePermissionId;

                  return (
                    <tr key={item.rolePermissionId} style={{ borderBottom: "1px solid var(--spms-border)" }}>
                      <td className="py-3 px-3 fw-semibold" style={{ color: "var(--spms-text)" }}>{index + 1}</td>
                      
                      {/* User Column */}
                      <td className="py-3 px-3">
                        {isEditing ? (
                          <select 
                            className="form-select form-select-sm"
                            value={editData.userId}
                            onChange={(e) => setEditData({ ...editData, userId: e.target.value })}
                            style={{ borderRadius: "0px", width: "200px" }}
                          >
                            <option value="">Select User</option>
                            {availableUsers.map(user => {
                              const uId = user.userId || user.UserId;
                              const uName = user.fullName || user.FullName;
                              return <option key={uId} value={uId}>{uName}</option>;
                            })}
                          </select>
                        ) : (
                          <span className="fw-bold" style={{ fontSize: "0.95rem" }}>{item.userName}</span>
                        )}
                      </td>

                      {/* Role Column */}
                      <td className="py-3 px-3">
                        {isEditing ? (
                          <select 
                            className="form-select form-select-sm"
                            value={editData.roleId}
                            onChange={(e) => setEditData({ ...editData, roleId: e.target.value })}
                            style={{ borderRadius: "0px", width: "160px" }}
                          >
                            <option value="">Select Role</option>
                            {availableRoles.map(role => {
                              const rId = role.roleId || role.RoleId;
                              const rName = role.roleName || role.RoleName;
                              return <option key={rId} value={rId}>{rName}</option>;
                            })}
                          </select>
                        ) : (
                          <span 
                            className="badge px-3 py-2 fw-bold" 
                            style={{ 
                              backgroundColor: "rgba(79, 126, 163, 0.1)", 
                              color: "var(--spms-sidebar)",
                              borderRadius: "0px",
                              fontSize: "0.85rem"
                            }}
                          >
                            {item.roleName}
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
                              onClick={() => handleSaveUpdate(item.rolePermissionId)}
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              className="btn btn-sm px-2"
                              style={{ backgroundColor: "rgba(108, 117, 125, 0.1)", color: "#6c757d", border: "1.5px solid #6c757d", borderRadius: "0px" }}
                              onClick={handleCancelEdit}
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="btn btn-sm me-2 px-3"
                              style={{ backgroundColor: "transparent", color: "var(--spms-sidebar)", border: "1.5px solid var(--spms-sidebar)", fontWeight: 600, borderRadius: "0px" }}
                              onClick={() => handleEditClick(item)}
                            >
                              <Pencil size={18} color="#007bff" />
                            </button>
                            <button 
                              className="btn btn-sm px-3" 
                              style={{ backgroundColor: "rgba(220, 53, 69, 0.1)", color: "#dc3545", border: "1.5px solid rgba(220, 53, 69, 0.2)", fontWeight: 600, borderRadius: "0px" }}
                              onClick={() => onDelete(item.rolePermissionId)}
                            >
                              <Trash2 size={18} color="#dc3545" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    No user role mappings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default UserRoleList;