import {  Routes, Route } from "react-router-dom";



import Dashboard from "../pages/faculty/Dashboard";
import Projects from "../pages/faculty/Projects";
import Reviews from "../pages/faculty/Reviews";
import FacultyLayout from "../layouts/FacultyLayout";
import FacultyStudents from "../pages/faculty/FacultyStudents";


function StudentRoutes() {
    return (
      
            <Routes>
               
                {/* Student */}

              

                   <Route path="/" element={<FacultyLayout />}>

                               <Route path="dashboard" element={<Dashboard />} />
                               <Route path="projects" element={<Projects />} />
                                 <Route path="reviews" element={<Reviews />} />
                                  <Route path="facultystudents" element={<FacultyStudents />} />
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

