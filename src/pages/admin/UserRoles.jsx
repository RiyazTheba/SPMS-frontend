import React, { useState, useEffect } from "react";
import axios from "axios";
import UserRoleAdd from "./UserRoleAdd";
import UserRoleList from "./UserRoleList";

function UserRoles() {
  const [userRoles, setUserRoles] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

  const API_URL = "http://localhost:5278/api/UserRoles";
  const USERS_API_URL = "http://localhost:5278/api/Users";
  const ROLES_API_URL = "http://localhost:5278/api/Roles";

  // Fetch Data (GET APIs)
  const fetchData = async () => {
    try {
      const [userRolesRes, usersRes, rolesRes] = await Promise.all([
        axios.get(API_URL).catch(() => ({ data: [] })),
        axios.get(USERS_API_URL).catch(() => ({ data: [] })),
        axios.get(ROLES_API_URL).catch(() => ({ data: [] }))
      ]);

      setUserRoles(userRolesRes.data);
      setAvailableUsers(usersRes.data);
      setAvailableRoles(rolesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Add (POST API)
  const handleAddSuccess = async (newAssignment, resetFormCallback) => {
    try {
      await axios.post(API_URL, {
        userId: parseInt(newAssignment.userId),
        roleId: parseInt(newAssignment.roleId)
      });
      alert("Role assigned successfully!");
      resetFormCallback();
      fetchData();
    } catch (error) {
      console.error("Error assigning role:", error);
      alert("Failed to assign role.");
    }
  };

  // Handle Delete (DELETE API)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this role assignment?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUserRoles(userRoles.filter((item) => item.rolePermissionId !== id));
        alert("Role assignment removed successfully!");
      } catch (error) {
        console.error("Error deleting role assignment:", error);
        alert("Failed to delete role assignment.");
      }
    }
  };

  // Handle Update (PUT API)
  const handleUpdate = async (id, editData, cancelEditCallback) => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        rolePermissionId: id,
        userId: parseInt(editData.userId),
        roleId: parseInt(editData.roleId)
      });
      cancelEditCallback();
      alert("Role assignment updated successfully!");
      fetchData();
    } catch (error) {
      console.error("Error updating role assignment:", error);
      alert("Failed to update role assignment.");
    }
  };

  return (
    <div className="container py-4">
      {/* 1. Add Form Component */}
      <UserRoleAdd 
        availableUsers={availableUsers} 
        availableRoles={availableRoles} 
        onAddSuccess={handleAddSuccess} 
      />

      {/* 2. Table List Component */}
      <UserRoleList 
        userRoles={userRoles} 
        availableUsers={availableUsers} 
        availableRoles={availableRoles} 
        onDelete={handleDelete} 
        onUpdate={handleUpdate} 
      />
    </div>
  );
}

export default UserRoles;