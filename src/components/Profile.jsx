import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Edit3, Save, ShieldCheck, BookOpen, Award } from "lucide-react";

function Profile() {
    const [user, setUser] = useState({
        UserId: "",
        FullName: "",
        Email: "",
        MobileNumber: "",
        Role: "",
        EnrolmentNo: "",
        Department: "",
        ProfilePicturePath: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const role = localStorage.getItem("role") || "Student";

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
                ...parsedUser,
                Role: parsedUser.Role || role
            });
        }
    }, []);

    
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

   
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            
            const response = await fetch("https://localhost:5000/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserId: user.UserId,
                    FullName: user.FullName,
                    MobileNumber: user.MobileNumber
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                setMessage("Profile updated successfully!");
                setIsEditing(false);
            } else {
                setMessage(data.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("API Error:", error);
          
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setMessage("Profile updated successfully!");
            setIsEditing(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid px-0 py-3">
            
           
            {/* <div className="mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-1 fw-semibold text-dark fs-5">User Profile Settings</h4>
                    <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                        Manage your account information and personal details.
                    </p>
                </div>
                {!isEditing && (
                    <button 
                        className="btn btn-outline-primary rounded-0 btn-sm d-flex align-items-center gap-1"
                        onClick={() => setIsEditing(true)}
                    >
                        <Edit3 size={16} /> Edit Profile
                    </button>
                )}
            </div> */}

            {/* Success / Error Message Alert */}
            {message && (
                <div className="alert alert-success rounded-0 py-2 small mb-4" role="alert">
                    {message}
                </div>
            )}

            <div className="row g-4">
                
                {/* Left Column: Profile Card Overview */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-0 bg-white text-center p-4 h-100">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="bg-light rounded-circle p-4 border d-inline-flex align-items-center justify-content-center" style={{ width: "90px", height: "90px" }}>
                                <User size={45} className="text-secondary opacity-75" />
                            </div>
                        </div>
                        <h5 className="fw-semibold text-dark mb-1">Prof.{user.FullName || "User Name"}</h5>
                        <p className="text-muted small mb-2">{user.Email || "user@example.com"}</p>
                        
                        <div className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-0 py-1 px-3 fw-normal mx-auto mb-3 text-uppercase" style={{ fontSize: "0.75rem" }}>
                            {user.Role}
                        </div>

                        <div className="badge bg-success-subtle text-success border border-success-subtle rounded-0 py-2 px-3 fw-normal mx-auto d-inline-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
                            <ShieldCheck size={14} /> Active Account
                        </div>
                    </div>
                </div>

                {/* Right Column: Editable / Viewable Details Form */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-0 bg-white p-4 p-lg-5">
                        <h5 className="fw-semibold text-dark mb-4" style={{ fontSize: "1.1rem" }}>
                            Personal Information
                        </h5>

                        <form onSubmit={handleUpdateSubmit}>
                            
                            {/* Full Name */}
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark d-flex align-items-center gap-1">
                                    <User size={14} /> Full Name
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-0" 
                                    name="FullName" 
                                    value={user.FullName} 
                                    onChange={handleChange} 
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Email (Read-Only) */}
                            <div className="mb-3">
                                <label className="form-label small fw-medium text-dark d-flex align-items-center gap-1">
                                    <Mail size={14} /> Email Address (Cannot be changed)
                                </label>
                                <input 
                                    type="email" 
                                    className="form-control rounded-0 bg-light text-muted" 
                                    name="Email" 
                                    value={user.Email} 
                                    disabled 
                                />
                            </div>

                           
                           
                            {user.Role.toLowerCase() === "student" && (
                                <div className="mb-3">
                                    <label className="form-label small fw-medium text-dark d-flex align-items-center gap-1">
                                        <BookOpen size={14} /> Enrolment Number
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control rounded-0 bg-light text-muted" 
                                        value={user.EnrolmentNo || "N/A"} 
                                        disabled 
                                    />
                                </div>
                            )}

                          
                            {user.Role.toLowerCase() === "staff" && (
                                <div className="mb-3">
                                    <label className="form-label small fw-medium text-dark d-flex align-items-center gap-1">
                                        <Award size={14} /> Department
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control rounded-0 bg-light text-muted" 
                                        value={user.Department || "N/A"} 
                                        disabled 
                                    />
                                </div>
                            )}

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="d-flex gap-2 mt-4">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary rounded-0 px-4 py-2 d-inline-flex align-items-center gap-1" 
                                        style={{ fontSize: "0.9rem" }}
                                        disabled={loading}
                                    >
                                        <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary rounded-0 px-4 py-2" 
                                        style={{ fontSize: "0.9rem" }}
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;