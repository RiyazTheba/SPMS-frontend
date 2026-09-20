import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function StudentLayout() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >

      {/* Sidebar Fixed */}
      <div
        style={{
          width: "250px",
          height: "100vh",
          flexShrink: 0,
          backgroundColor: "#669bbc",
        }}
        className="d-none d-md-block"
      >
        <Sidebar />
      </div>


      {/* Right Side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100vh",
          minWidth: 0,
        }}
      >

        {/* Navbar Fixed */}
        <div
          style={{
            flexShrink: 0,
          }}
        >
          <Navbar />
        </div>


        {/* Only Content Scroll */}
        <main
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "1.5rem",
            backgroundColor: "var(--spms-main-bg, #f8f9fa)",
          }}
        >
          <Outlet />
        </main>


      </div>

    </div>
  );
}

export default StudentLayout;