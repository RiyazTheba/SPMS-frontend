import React, { useState, useEffect } from "react";
import AddRole from "./AddRole";
import { Pencil, Trash2, X, Check } from 'lucide-react';
import axios from "axios";
import UserRoles from "./UserRoles";

function Roles() {
  const [roles, setRoles] = useState([]);
  const API_URL = "http://localhost:5278/api/Roles";

  // Edit mateana states
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editRoleData, setEditRoleData] = useState({ roleName: "", description: "" });

  // 1. Fetch Roles on Component Load (GET API)
  const fetchRoles = async () => {
    try {
      const response = await axios.get(API_URL);
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 2. Handle Add Role (Post API call AddRole.jsx andar thase, ahiya fkt list refresh karva mate)
  const handleRoleAdded = () => {
    fetchRoles();
  };

  // 3. Handle Delete (DELETE API)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setRoles(roles.filter((role) => role.roleId !== id));
      } catch (error) {
        console.error("Error deleting role:", error);
        alert("Failed to delete role.");
      }
    }
  };

  // Edit button click thava par data state ma set karva mate
  const handleEditClick = (role) => {
    setEditingRoleId(role.roleId);
    setEditRoleData({ roleName: role.roleName, description: role.description });
  };

  // Edit cancel karva mate
  const handleCancelEdit = () => {
    setEditingRoleId(null);
    setEditRoleData({ roleName: "", description: "" });
  };


  const handleUpdateRole = async (id) => {
    if (!editRoleData.roleName.trim() || !editRoleData.description.trim()) {
      alert("Fields cannot be empty!");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, {
        roleId: id,
        roleName: editRoleData.roleName,
        description: editRoleData.description
      });

      // List update karo
      setRoles(roles.map((role) => (role.roleId === id ? { ...role, ...editRoleData } : role)));
      setEditingRoleId(null);
      alert("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role.");
    }
  };

  return (
    <div className="container py-4" style={{ color: "var(--spms-text)" }}>
      {/* --- ADD ROLE COMPONENT --- */}
      <div className="mb-4">
        <AddRole onRoleAdded={handleRoleAdded} />
      </div>

      {/* --- ROLE LIST CONTAINER --- */}
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
            <h4 className="mb-0 fs-6">Manage Roles</h4>
          </div>
          <span className="badge px-3 py-2" style={{ backgroundColor: "var(--spms-accent)", fontSize: "0.85rem", borderRadius: "0px" }}>
            Total Roles: {roles.length}
          </span>
        </div>

        <div className="p-4">
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ color: "var(--spms-text)" }}>
              <thead style={{ color: "var(--spms-muted)" }}>
                <tr style={{ borderBottom: "2px solid var(--spms-border)" }}>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>#</th>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Role Name</th>
                  <th className="py-3 px-3" style={{ color: "var(--spms-text)" }}>Description</th>
                  <th className="py-3 px-3 text-end" style={{ color: "var(--spms-text)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.length > 0 ? (
                  roles.map((role, index) => {
                    const isEditing = editingRoleId === role.roleId;

                    return (
                      <tr 
                        key={role.roleId} 
                        style={{ borderBottom: "1px solid var(--spms-border)", transition: "background 0.2s" }}
                      >
                        <td className="py-3 px-3 fw-semibold" style={{ color: "var(--spms-text)" }}>
                          {index + 1}
                        </td>
                        
                        {/* Role Name Column */}
                        <td className="py-3 px-3">
                          {isEditing ? (
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={editRoleData.roleName}
                              onChange={(e) => setEditRoleData({ ...editRoleData, roleName: e.target.value })}
                              style={{ borderRadius: "0px" }}
                            />
                          ) : (
                            <span 
                              className="badge px-3 py-2 fw-bold" 
                              style={{ 
                                backgroundColor: "rgba(79, 126, 163, 0.1)", 
                                color: "var(--spms-sidebar)",
                                borderRadius: "0px",
                                fontSize: "0.9rem"
                              }}
                            >
                              {role.roleName}
                            </span>
                          )}
                        </td>

                        {/* Description Column */}
                        <td className="py-3 px-3" style={{ color: "var(--spms-muted)", fontSize: "0.95rem" }}>
                          {isEditing ? (
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={editRoleData.description}
                              onChange={(e) => setEditRoleData({ ...editRoleData, description: e.target.value })}
                              style={{ borderRadius: "0px" }}
                            />
                          ) : (
                            role.description
                          )}
                        </td>

                        {/* Actions Column */}
                        <td className="py-3 px-3 text-end">
                          {isEditing ? (
                            <>
                              <button 
                                className="btn btn-sm me-2 px-2"
                                style={{ backgroundColor: "rgba(40, 167, 69, 0.1)", color: "#28a745", border: "1.5px solid #28a745", borderRadius: "0px" }}
                                onClick={() => handleUpdateRole(role.roleId)}
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
                                style={{ 
                                  backgroundColor: "transparent", 
                                  color: "var(--spms-sidebar)", 
                                  border: "1.5px solid var(--spms-sidebar)",
                                  fontWeight: 600,
                                  borderRadius: "0px"
                                }}
                                onClick={() => handleEditClick(role)}
                              >
                                <Pencil size={20} color="#007bff" />
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
                                onClick={() => handleDelete(role.roleId)}
                              >
                                <Trash2 size={20} color="#dc3545" />
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
                      No roles found in the system.
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
}

export default Roles;