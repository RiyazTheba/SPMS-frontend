import {  Routes, Route, Navigate  } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

import Tasks from "../pages/admin/Tasks";
import AddRole from "../pages/admin/AddRole";

import Roles from "../pages/admin/Roles";
import Projects from "../pages/admin/Projects";


import Profile from "../components/Profile";
import UserRoles from "../pages/admin/UserRoles";

function AdminRoutes() {
    const role = localStorage.getItem("role");

            if (role !== "admin") {
                return <Navigate to="/" replace />;
            }
    return (
  
            <Routes>
              

                {/* Admin */}

                <Route path="/" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />

                    <Route path="tasks" element={<Tasks />} />

                    <Route path="roles" element={<Roles />} />
                    <Route path="add-role" element={<AddRole />} />
                   
                      <Route path="profile" element={<Profile />} />

                    <Route path="projects" element={<Projects />} />
                       <Route path="userroles" element={<UserRoles />} />
                        

                </Route>




            </Routes>
       
    );
}

export default AdminRoutes;