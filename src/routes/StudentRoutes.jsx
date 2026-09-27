import {  Routes, Route,Navigate } from "react-router-dom";



import Dashboard from "../pages/student/Dashboard";

import StudentLayout  from "../layouts/StudentLayout"
import MyProject from "../pages/student/MyProject";
import UploadWork from "../pages/student/UploadWork";
import Feedback from "../pages/student/Feedback";
import TaskDetails from "../pages/student/TaskDetails";
import Profile from "../components/Profile";
function StudentRoutes() {
    const role = localStorage.getItem("role");
      if (role !== "student") {
        return <Navigate to="/" replace />;
    }
    return (
      
            <Routes>
               
                {/* Student */}

              

                   <Route path="/" element={<StudentLayout />}>

                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="myproject" element={<MyProject />} />
                                <Route path="uploadwork" element={<UploadWork />} />
                                <Route path="feedback"  element={<Feedback />} />
                                <Route path="taskdetails" element={<TaskDetails/>} />
                                <Route path="/profile" element={<Profile />} />

                    </Route>



            </Routes>
       
    );
}

export default StudentRoutes;




  {/* <Route path="users" element={<Users />} />
                    */}
                    {/* <Route path="tasks"element={<Tasks />} />
                 
                    <Route  path="roles" element={<Roles />} />
                    <Route  path="add-role"  element={<AddRole />} />
                    <Route path="profile" element={<Profile />}  />
                    <Route path="settings"  element={<Settings />}  />
                    
                       <Route path="projects"  element={<Projects />}  /> */}