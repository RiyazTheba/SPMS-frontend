// import React from 'react';
// import { Pencil, Trash2 } from 'lucide-react';

// export default function ProjectList({ projects, onEditProject, onDeleteProject }) {
//   return (
//     <div 
//       className="card border-0 shadow-sm" 
//       style={{ 
//         backgroundColor: "var(--spms-card)", 
//         borderRadius: "0px",
//         border: "1px solid var(--spms-border)"
//       }}
//     >
//       {/* --- CARD HEADER --- */}
//       <div 
//         className="p-3 d-flex align-items-center fs-6 justify-content-between"
//         style={{ backgroundColor: "var(--spms-heading)", color: "var(--spms-text)", borderRadius: "0px" }}
//       >
//         <div>
//           <h4 className="mb-0 fs-6 fw-semibold">Project Records</h4>
//         </div>
//         <span 
//           className="badge px-3 py-2" 
//           style={{ backgroundColor: "var(--spms-accent)", color: "#fff", fontSize: "0.85rem", borderRadius: "0px" }}
//         >
//           Total Projects: {projects.length}
//         </span>
//       </div>   

//       {/* --- TABLE CONTAINER --- */}
//       <div className="table-responsive m-0">
//         <table className="table align-middle mb-0" style={{ color: "var(--spms-text)" }}>
//           <thead style={{ color: "var(--spms-muted)" }}>
//             <tr style={{ borderBottom: "2px solid var(--spms-border)" }}>
//               <th className="py-3 px-3">#</th>
//               <th className="py-3 px-3">Project Title & Description</th>
//               <th className="py-3 px-3">Assigned (Student / Faculty)</th>
//               <th className="py-3 px-3">Status</th>
//               <th className="py-3 px-3">Tasks</th>
//               <th className="py-3 px-3">Progress</th>
//               <th className="py-3 px-3 text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.length > 0 ? (
//               projects.map((proj, index) => (
//                 <tr 
//                   key={proj.id} 
//                   style={{ borderBottom: "1px solid var(--spms-border)", transition: "background 0.2s" }}
//                 >
//                   {/* Index */}
//                   <td className="py-3 px-3 fw-semibold">{index + 1}</td>

//                   {/* Title & Description */}
//                   <td className="py-3 px-3">
//                     <span className="fw-bold d-block" style={{ fontSize: "0.95rem" }}>{proj.projectTitle}</span>
//                     <small className="text-muted">{proj.description || 'No description provided.'}</small>
//                   </td>

//                   {/* Student & Faculty Assignment */}
//                   <td className="py-3 px-3" style={{ fontSize: "0.9rem" }}>
//                     <div><strong>Student:</strong> {proj.studentName || 'N/A'}</div>
//                     <div><strong>Faculty:</strong> {proj.facultyName || 'N/A'}</div>
//                   </td>

//                   {/* Status Badge */}
//                   <td className="py-3 px-3">
//                     <span 
//                       className="badge px-2 py-1" 
//                       style={{ 
//                         backgroundColor: "rgba(79, 126, 163, 0.1)", 
//                         color: "var(--spms-sidebar)", 
//                         borderRadius: "0px",
//                         fontWeight: 600
//                       }}
//                     >
//                       {proj.projectStatusName || proj.projectStatus}
//                     </span>
//                   </td>

//                   {/* Tasks Count */}
//                   <td className="py-3 px-3" style={{ fontSize: "0.9rem" }}>
//                     {proj.completedTasks || 0} / {proj.totalTasks || 0}
//                   </td>

//                   {/* Progress Bar */}
//                   <td className="py-3 px-3">
//                     <div className="d-flex align-items-center gap-2">
//                       <div className="progress flex-grow-1" style={{ height: "6px", borderRadius: "0px", backgroundColor: "#e9ecef" }}>
//                         <div 
//                           className="progress-bar" 
//                           style={{ width: `${proj.progressPercentage || 0}%`, backgroundColor: "var(--spms-accent)" }}
//                         ></div>
//                       </div>
//                       <span style={{ fontSize: "0.85rem", minWidth: "40px" }}>{proj.progressPercentage || 0}%</span>
//                     </div>
//                   </td>

//                   {/* Action Buttons */}
//                   <td className="py-3 px-3 text-end">
//                     <button 
//                       className="btn btn-sm me-2 px-3"
//                       style={{ 
//                         backgroundColor: "transparent", 
//                         color: "var(--spms-sidebar)", 
//                         border: "1.5px solid var(--spms-sidebar)",
//                         fontWeight: 600,
//                         borderRadius: "0px"
//                       }}
//                       onClick={() => onEditProject(proj)}
//                       title="Edit Project"
//                     >
//                       <Pencil size={16} color="#007bff" />
//                     </button>
//                     <button 
//                       className="btn btn-sm px-3" 
//                       style={{ 
//                         backgroundColor: "rgba(220, 53, 69, 0.1)", 
//                         color: "#dc3545", 
//                         border: "1.5px solid rgba(220, 53, 69, 0.2)",
//                         fontWeight: 600,
//                         borderRadius: "0px"
//                       }}
//                       onClick={() => onDeleteProject(proj.id)}
//                       title="Delete Project"
//                     >
//                       <Trash2 size={16} color="#dc3545" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-5 text-muted">
//                   No project records found. Click "Add New Project" to create one.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

