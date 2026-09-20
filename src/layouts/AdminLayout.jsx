import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminLayout() {

  return (

    <div
      style={{
        display:"flex",
        height:"100vh",
        overflow:"hidden"
      }}
    >

      {/* Fixed Sidebar */}
      <aside
        style={{
          width:"250px",
          height:"100vh",
          flexShrink:0,
          background:"#669bbc"
        }}
      >
        <Sidebar />
      </aside>


      {/* Right Section */}
      <div
        style={{
          flex:1,
          display:"flex",
          flexDirection:"column"
        }}
      >

        {/* Fixed Navbar */}
        <header
          style={{
            height:"70px",
            flexShrink:0
          }}
        >
          <Navbar />
        </header>


        {/* Scroll Only Main */}
        <main
          style={{
            flex:1,
            overflowY:"auto",
            padding:"1.5rem",
            background:"#f8f9fa"
          }}
        >

          <Outlet />

        </main>


      </div>


    </div>

  );
}

export default AdminLayout;