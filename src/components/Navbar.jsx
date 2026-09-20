import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, UserCircle, Settings, LogOut } from "lucide-react";


function Navbar() {
    const [profileOpen, setProfileOpen] = useState(false);
    const dropdownRef = useRef();

    const role = localStorage.getItem("role") || "Admin";

    const displayName =
        role.charAt(0).toUpperCase() + role.slice(1);

    // Dynamic Profile Route Path based on Role (e.g., /admin/profile, /student/profile, /faculty/profile)
    const currentRole = (localStorage.getItem("role") || "admin").toLowerCase();
    const profilePath = `/${currentRole}/profile`;

    // Logout
    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    // Outside click close dropdown
    useEffect(() => {
        const closeDropdown = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "click",
            closeDropdown
        );

        return () => {
            document.removeEventListener(
                "click",
                closeDropdown
            );
        };
    }, []);


    return (
        <nav className="navbar spms-navbar px-4">

            {/* Right Side */}
            <div 
                ref={dropdownRef}
                className="ms-auto dropdown position-relative"
            >

                <button
                    type="button"
                    className="btn spms-profile-btn d-flex align-items-center gap-2"
                    onClick={(e)=>{
                        e.stopPropagation();
                        setProfileOpen(!profileOpen);
                    }}
                >

                    <div className="spms-avatar">
                        {displayName.charAt(0)}
                    </div>

                    <span>
                        {displayName}
                    </span>

                    <ChevronDown 
                        size={16}
                        style={{
                            transform: profileOpen 
                            ? "rotate(180deg)" 
                            : "rotate(0deg)",
                            transition:"0.3s"
                        }}
                    />

                </button>

                {
                    profileOpen && (

                        <div className="dropdown-menu show spms-dropdown">

                            <Link
                                to={profilePath}  
                                className="dropdown-item"
                                onClick={()=>setProfileOpen(false)}
                            >
                                <UserCircle size={18} />
                                Profile
                            </Link>

                            <hr className="dropdown-divider" />

                            <button
                                className="dropdown-item text-danger"
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                Logout
                            </button>

                        </div>

                    )
                }

            </div>

        </nav>
    );
}

export default Navbar;