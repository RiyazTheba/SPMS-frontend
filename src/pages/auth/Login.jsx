import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    GraduationCap,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Users,
    Briefcase,
    ShieldCheck,
} from "lucide-react";


function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [role, setRole] = useState("student");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setErrorMessage(""); // User type kare tyare error remove thai jay

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");

        // 1. Blank Check
        if (!formData.email.trim() || !formData.password.trim()) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        // 2. Email Format Check (@ and . check karva mate simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        // 3. Password Length Check (e.g., minimum 6 characters)
        if (formData.password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            let userObj = {};

            // Admin Login
            if (
                role === "admin" &&
                formData.email === "admin@spms.com" &&
                formData.password === "admin123"
            ) {
                userObj = {
                    UserId: 1,
                    FullName: "Administrator",
                    Email: formData.email,
                    MobileNumber: "9876543210",
                    Role: "Admin"
                };
                localStorage.setItem("role", "admin");
                localStorage.setItem("loggedInUser", JSON.stringify(userObj));
                navigate("/admin/dashboard");
                return;
            }

            // Student Login
            if (
                role === "student" &&
                formData.email === "student@spms.com" &&
                formData.password === "student123"
            ) {
                userObj = {
                    UserId: 2,
                    FullName: "Student",
                    Email: formData.email,
                    MobileNumber: "9123456789",
                    Role: "Student",
                    EnrolmentNo: "MCA2026001"
                };
                localStorage.setItem("role", "student");
                localStorage.setItem("loggedInUser", JSON.stringify(userObj));
                navigate("/student/dashboard");
                return;
            }

            // Staff Login
            if (
                role === "staff" &&
                formData.email === "staff@spms.com" &&
                formData.password === "staff123"
            ) {
                userObj = {
                    UserId: 3,
                    FullName: "Faculty",
                    Email: formData.email,
                    MobileNumber: "9988776655",
                    Role: "Faculty",
                    Department: "Computer Science (MCA)"
                };
                localStorage.setItem("role", "staff");
                localStorage.setItem("loggedInUser", JSON.stringify(userObj));
                navigate("/faculty/dashboard");
                return;
            }

            // 4. Incorrect Credentials Error
            setErrorMessage("Invalid email, password, or role selection.");
            setIsSubmitting(false);

        }, 800);
    };


    const roles = [
        {
            id: "student",
            label: "Student",
            icon: GraduationCap
        },
        {
            id: "staff",
            label: "Staff",
            icon: Briefcase
        },
        {
            id: "admin",
            label: "Admin",
            icon: ShieldCheck
        },
    ];


    return (
        <div className="spms-shell">

            {/* Mobile Brand */}
            <div className="spms-brand-mobile">
                <div className="spms-logo">
                    SPMS<span className="accent">.</span>
                </div>
            </div>

            {/* Left Side */}
            <aside className="spms-brand">
                <div className="spms-brand-inner">

                    <span className="spms-badge">
                        <span className="dot"></span>
                        Academic Portal
                    </span>

                    <div className="spms-logo">
                        SPMS<span className="accent">.</span>
                    </div>

                    <h2 className="spms-tagline">
                        Student Project
                        <br />
                        Management System
                    </h2>

                    <p className="spms-desc">
                        Streamline project workflows, facilitate seamless
                        communication, and manage students and faculty
                        effortlessly — all in one academic hub.
                    </p>

                    <div className="spms-features">
                        {[
                            {
                                icon: Users,
                                label: "Team Collaboration"
                            },
                            {
                                icon: ShieldCheck,
                                label: "Secure Access"
                            }
                        ].map(({ icon: Icon, label }) => (
                            <div className="spms-feature" key={label}>
                                <Icon size={16} />
                                {label}
                            </div>
                        ))}
                    </div>

                </div>
            </aside>


            {/* Login Form */}
            <main className="spms-form-side">
                <div className="spms-form-card">

                    <div className="spms-icon-tile">
                        <GraduationCap size={26} />
                    </div>

                    <div className="spms-form-head">
                        <h2>
                            Welcome back
                        </h2>
                        <p>
                            Sign in to access your dashboard
                        </p>
                    </div>


                    {/* Role Selector */}
                    <div className="spms-role-group">
                        {roles.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                type="button"
                                className={`spms-role ${role === id ? "active" : ""}`}
                                onClick={() => setRole(id)}
                            >
                                <Icon size={18} />
                                {label}
                            </button>
                        ))}
                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="spms-field">
                            <label>
                                Email Address
                            </label>

                            <div className="spms-input-wrap">
                                <Mail
                                    size={18}
                                    className="spms-ic"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="spms-input"
                                    placeholder="name@university.edu"
                                />
                            </div>
                        </div>


                        {/* Password */}
                        <div className="spms-field">
                            <label>
                                Password
                            </label>

                            <div className="spms-input-wrap">
                                <Lock
                                    size={18}
                                    className="spms-ic"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="spms-input"
                                    placeholder="••••••••"
                                />

                                <button
                                    type="button"
                                    className="spms-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {
                                        showPassword
                                            ?
                                            <EyeOff size={18} />
                                            :
                                            <Eye size={18} />
                                    }
                                </button>

                            </div>
                        </div>


                        {/* Inline Error Message (Red text small) */}
                        {errorMessage && (
                            <div className="text-danger small mb-3 fw-medium">
                                {errorMessage}
                            </div>
                        )}


                        {/* Remember */}
                        <div className="spms-row">
                            <label className="spms-check">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={
                                        formData.rememberMe
                                    }
                                    onChange={handleChange}
                                />
                                <span>
                                    Remember me
                                </span>
                            </label>

                            <Link to="/forgot-password" className="spms-link">
                                Forgot password?
                            </Link>
                        </div>


                        {/* Button */}
                        <button
                            type="submit"
                            className="spms-btn"
                            disabled={isSubmitting}
                        >
                            {
                                isSubmitting
                                    ?
                                    <>
                                        <span className="spms-spinner"></span>
                                        Signing in...
                                    </>
                                    :
                                    <>
                                        Login as {
                                            roles.find(
                                                r => r.id === role
                                            )?.label
                                        }
                                        <ArrowRight
                                            size={18}
                                        />
                                    </>
                            }
                        </button>

                    </form>

                </div>
            </main>

        </div>
    );
}

export default Login;