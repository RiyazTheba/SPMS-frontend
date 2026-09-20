


import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import AdminRoutes from "./AdminRoutes";
import StudentRoutes from "./StudentRoutes";
import ForgotPassword from "../pages/auth/ForgotPassword";
import FacultyRoutes    from "./FacultyRoutes";


function AppRoute() {
    return (

        <Routes>

            <Route path="/" element={<Login />} />

          
          
          <Route path="/forgot-password" element={<ForgotPassword />} />
           
            <Route
                path="/student/*"
                element={<StudentRoutes />}
            />

            <Route
                path="/admin/*"
                element={<AdminRoutes />}
            />

            
            <Route
                path="/faculty/*"
                element={<FacultyRoutes />}
            />
          
        </Routes>

    );
}

export default AppRoute;