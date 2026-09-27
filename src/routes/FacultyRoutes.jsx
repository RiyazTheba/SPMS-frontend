import {  Routes, Route ,Navigate} from "react-router-dom";



import Dashboard from "../pages/faculty/Dashboard";
import Projects from "../pages/faculty/Projects";
import Tasks from "../pages/faculty/Tasks";
import Profile from "../components/Profile";
import FacultyLayout from "../layouts/FacultyLayout";
import FacultyStudents from "../pages/faculty/FacultyStudents";

function StudentRoutes() {
    const role = localStorage.getItem("role");
      if (role !== "faculty") {
        return <Navigate to="/" replace />;
    }
    return (
      
            <Routes>
               
                {/* Student */}

              

                   <Route path="/" element={<FacultyLayout />}>

                               <Route path="dashboard" element={<Dashboard />} />
                               <Route path="projects" element={<Projects />} />
                               
                                  <Route path="tasks" element={<Tasks />} />
                                  <Route path="facultystudents" element={<FacultyStudents />} />
                                  <Route path="/profile" element={<Profile />} />

                                {/*<Route path="myproject" element={<MyProject />} />
                                 <Route path="uploadwork" element={<UploadWork />} />
                                 <Route path="feedback"  element={<Feedback />} />
                                 <Route path="taskdetails" element={<TaskDetails/>}  />
                                      <Route path="/profile" element={<Profile />} /> */}

                    </Route>



            </Routes>
       
    );
}

export default StudentRoutes;

