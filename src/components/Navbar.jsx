
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  UserCircle,
  LogOut,
} from "lucide-react";

function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();

  // Get logged-in user information
  const role = localStorage.getItem("role") || "Admin";
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");

  // Show user's actual name
  const displayName =
    fullName || role.charAt(0).toUpperCase() + role.slice(1);

  // Profile route based on role
  const currentRole = role.toLowerCase();
  const profilePath = `/${currentRole}/profile`;

  // Logout
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar spms-navbar px-4">

      {/* Right Side */}
      <div
        ref={dropdownRef}
        className="ms-auto dropdown position-relative"
      >

        {/* Profile Button */}
        <button
          type="button"
          className="btn spms-profile-btn d-flex align-items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            setProfileOpen(!profileOpen);
          }}
        >

          {/* Avatar */}
          <div className="spms-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>

          {/* User Name */}
          <span>
            {displayName}
          </span>

          {/* Arrow */}
          <ChevronDown
            size={16}
            style={{
              transform: profileOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "0.3s",
            }}
          />

        </button>

        {/* Dropdown */}
        {profileOpen && (
          <div className="dropdown-menu show spms-dropdown">

            {/* User Information */}
            <div className="px-3 py-2">
              <div className="fw-semibold">
                {displayName}
              </div>

              {email && (
                <small className="text-muted">
                  {email}
                </small>
              )}

              <div>
                <small className="text-muted">
                  {role}
                </small>
              </div>
            </div>

            <hr className="dropdown-divider" />

            {/* Profile */}
            <Link
              to={profilePath}
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => setProfileOpen(false)}
            >
              <UserCircle size={18} />
              Profile
            </Link>

            <hr className="dropdown-divider" />

            {/* Logout */}
            <button
              className="dropdown-item text-danger d-flex align-items-center gap-2"
              onClick={logout}
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
