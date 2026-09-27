
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

    const roles = [
        {
            id: "student",
            label: "Student",
            icon: GraduationCap,
        },
        {
            id: "faculty",
            label: "Faculty",
            icon: Briefcase,
        },
        {
            id: "admin",
            label: "Admin",
            icon: ShieldCheck,
        },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setErrorMessage("");

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

   
const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // ==============================
    // BASIC VALIDATION
    // ==============================

    if (!formData.email.trim() || !formData.password.trim()) {
        setErrorMessage("Please fill in all required fields.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
        setErrorMessage("Please enter a valid email address.");
        return;
    }

    if (formData.password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
    }

    setIsSubmitting(true);

    try {
        // ==============================
        // LOGIN API
        // ==============================

        const response = await fetch(
            "http://localhost:5278/api/Auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            }
        );

        let data = {};

        try {
            data = await response.json();
        } catch {
            data = {};
        }

        console.log("LOGIN RESPONSE:", data);

        // ==============================
        // LOGIN FAILED
        // ==============================

        if (!response.ok) {
            setErrorMessage(
                data.message ||
                "Invalid email or password."
            );

            setIsSubmitting(false);
            return;
        }

        // ==============================
        // TOKEN
        // ==============================

        const token = data.token || "";

        if (!token) {
            setErrorMessage(
                "Token was not returned by server."
            );

            setIsSubmitting(false);
            return;
        }

        // ==============================
        // GET ROLE FROM `roles`
        // ==============================

        const serverRoles = Array.isArray(data.roles)
            ? data.roles
            : [];

        console.log("SERVER ROLES:", serverRoles);

        if (serverRoles.length === 0) {
            setErrorMessage(
                "Role was not returned by server."
            );

            setIsSubmitting(false);
            return;
        }

        // User currently has one role
        const databaseRole = serverRoles[0]
            .toString()
            .trim()
            .toLowerCase();

        // Selected role from frontend
        const selectedRole = role
            .toString()
            .trim()
            .toLowerCase();

        console.log(
            "DATABASE ROLE:",
            databaseRole
        );

        console.log(
            "SELECTED ROLE:",
            selectedRole
        );

        // ==============================
        // ROLE MATCH CHECK
        // ==============================

        if (databaseRole !== selectedRole) {
            setErrorMessage(
                `Access denied. Your account role is ${databaseRole}.`
            );

            setIsSubmitting(false);
            return;
        }

        // ==============================
        // ROLE MATCHED
        // ==============================

        console.log(
            "Role matched successfully."
        );

        // ==============================
        // SAVE TOKEN
        // ==============================

        localStorage.setItem(
            "token",
            token
        );

        // ==============================
        // SAVE USER
        // ==============================

        const userObj = {
            UserId: data.userId,
            FullName: data.fullName,
            Email: data.email,
            Role: databaseRole,
        };

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(userObj)
        );

        localStorage.setItem(
            "role",
            databaseRole
        );

        // ==============================
        // REDIRECT
        // ==============================

        if (databaseRole === "admin") {

            navigate("/admin/dashboard");

        } else if (databaseRole === "student") {

            navigate("/student/dashboard");

        } else if (databaseRole === "faculty") {

            navigate("/faculty/dashboard");

        } else {

            setErrorMessage(
                "Invalid role."
            );
        }

    } catch (error) {

        console.error(
            "Login Error:",
            error
        );

        setErrorMessage(
            "Unable to connect to server."
        );

    } finally {

        setIsSubmitting(false);

    }
};



    return (
        <div className="spms-shell">

            {/* Mobile Brand */}

            <div className="spms-brand-mobile">

                <div className="spms-logo">
                    SPMS
                    <span className="accent">
                        .
                    </span>
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

                        SPMS
                        <span className="accent">
                            .
                        </span>

                    </div>


                    <h2 className="spms-tagline">

                        Student Project
                        <br />
                        Management System

                    </h2>


                    <p className="spms-desc">

                        Streamline project workflows,
                        facilitate seamless communication,
                        and manage students and faculty
                        effortlessly — all in one academic hub.

                    </p>


                    <div className="spms-features">

                        <div className="spms-feature">

                            <Users size={16} />

                            Team Collaboration

                        </div>


                        <div className="spms-feature">

                            <ShieldCheck size={16} />

                            Secure Access

                        </div>

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

                        {roles.map(
                            ({
                                id,
                                label,
                                icon: Icon,
                            }) => (

                                <button
                                    key={id}
                                    type="button"
                                    className={`spms-role ${
                                        role === id
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {

                                        setRole(id);

                                        setErrorMessage("");

                                    }}
                                >

                                    <Icon size={18} />

                                    {label}

                                </button>

                            )
                        )}

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
                                    autoComplete="email"
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
                                    autoComplete="current-password"
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

                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* Error */}

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
                                    
                                </span>

                            </label>


                            <Link
                                to="/forgot-password"
                                className="spms-link"
                            >
                                Forgot password?
                            </Link>

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            className="spms-btn"
                            disabled={isSubmitting}
                        >

                            {isSubmitting ? (

                                <>

                                    <span className="spms-spinner"></span>

                                    Signing in...

                                </>

                            ) : (

                                <>

                                    Login as{" "}

                                    {
                                        roles.find(
                                            (r) =>
                                                r.id === role
                                        )?.label
                                    }

                                    <ArrowRight
                                        size={18}
                                    />

                                </>

                            )}

                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default Login;

