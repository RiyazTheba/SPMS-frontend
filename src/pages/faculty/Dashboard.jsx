
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardCard from "../../components/DashboardCard";

import {
  Users,
  FolderKanban,
  Clock3,
  CheckCircle,
  BarChart2,
  PieChart,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

import { Bar, Pie } from "react-chartjs-2";


// =========================
// CHART REGISTER
// =========================

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);


// =========================
// PROJECT STATUS IDs
// =========================

const STATUS = {
  PENDING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
};


function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  const PROJECTS_API =
    "http://localhost:5278/api/Projects";


  // =========================
  // FETCH PROJECTS
  // =========================

  useEffect(() => {
    fetchProjects();
  }, []);


  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        PROJECTS_API,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      console.log(
        "Projects API Response:",
        response.data
      );


      setProjects(response.data);

      setLoading(false);

    } catch (error) {

      console.error(
        "Error fetching projects:",
        error
      );


      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );

      }

      setLoading(false);
    }
  };


  // =========================
  // PROJECT COUNTS
  // =========================

  const totalProjects =
    projects.length;


  const pendingProjects =
    projects.filter(
      (project) =>
        Number(project.projectStatus) ===
        STATUS.PENDING
    ).length;


  const inProgressProjects =
    projects.filter(
      (project) =>
        Number(project.projectStatus) ===
        STATUS.IN_PROGRESS
    ).length;


  const completedProjects =
    projects.filter(
      (project) =>
        Number(project.projectStatus) ===
        STATUS.COMPLETED
    ).length;


  // =========================
  // UNIQUE STUDENTS
  // =========================

  const uniqueStudentIds =
    new Set(
      projects
        .map((project) => project.studentId)
        .filter((id) => id !== null && id !== undefined)
    );


  const assignedStudents =
    uniqueStudentIds.size;


  // =========================
  // PIE CHART DATA
  // =========================

  const projectStatusData = {

    labels: [
      "Pending Review",
      "In Progress",
      "Completed",
    ],

    datasets: [

      {
        data: [
          pendingProjects,
          inProgressProjects,
          completedProjects,
        ],

        backgroundColor: [
          "#ffc107",
          "#17a2b8",
          "#28a745",
        ],

        borderColor: "#ffffff",

        borderWidth: 2,
      },

    ],
  };


  // =========================
  // PIE CHART OPTIONS
  // =========================

  const projectStatusOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      // Remove labels from bottom
      legend: {
        display: false,
      },


      // Tooltip
      tooltip: {

        callbacks: {

          label: function (context) {

            const label =
              context.label;

            const value =
              context.raw;

            return `${label}: ${value}`;
          },

        },

      },


      // Label inside Pie
      datalabels: {

        color: "#ffffff",

        font: {
          weight: "bold",
          size: 12,
        },


        formatter: (
          value,
          context
        ) => {

          if (value === 0) {
            return "";
          }


          const label =
            context.chart.data.labels[
              context.dataIndex
            ];


          return `${label}\n${value}`;
        },


        textAlign: "center",

        anchor: "center",

        align: "center",

      },

    },

  };


  // =========================
  // BAR CHART
  // =========================

  const projectTitles =
    projects.map(
      (project) =>
        project.projectTitle || "Untitled"
    );


  const submissionsData = {

    labels: projectTitles,

    datasets: [

      {
        label: "Projects",

        data: projects.map(() => 1),

        backgroundColor: "#4f7ea3",

        borderWidth: 1,
      },

    ],

  };


  const submissionsOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        display: false,
      },

    },

  };


  // =========================
  // UI
  // =========================

  return (

    <div
      className="container-fluid py-2"
      style={{
        color: "var(--spms-text)",
      }}
    >


      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-4">

        <h4 className="mb-1 fs-5 fw-bold">
          Faculty Dashboard
        </h4>


        <p
          className="text-muted mb-0"
          style={{
            fontSize: "0.85rem",
          }}
        >
          Overview of your guided projects,
          student progress, and pending evaluations.
        </p>

      </div>



      {/* =========================
          TOP METRICS
      ========================= */}

      <div className="row g-4 mb-4">


        {/* Guided Projects */}

        <div className="col-xl-3 col-md-6">

          <DashboardCard
            title="Guided Projects"
            value={
              loading
                ? "..."
                : totalProjects
            }
            icon={
              <FolderKanban size={30} />
            }
            color="primary"
          />

        </div>



        {/* Assigned Students */}

        <div className="col-xl-3 col-md-6">

          <DashboardCard
            title="Assigned Students"
            value={
              loading
                ? "..."
                : assignedStudents
            }
            icon={
              <Users size={30} />
            }
            color="info"
          />

        </div>



        {/* Pending Reviews */}

        <div className="col-xl-3 col-md-6">

          <DashboardCard
            title="Pending Reviews"
            value={
              loading
                ? "..."
                : pendingProjects
            }
            icon={
              <Clock3 size={30} />
            }
            color="warning"
          />

        </div>



        {/* Completed Projects */}

        <div className="col-xl-3 col-md-6">

          <DashboardCard
            title="Completed Projects"
            value={
              loading
                ? "..."
                : completedProjects
            }
            icon={
              <CheckCircle size={30} />
            }
            color="success"
          />

        </div>

      </div>



      {/* =========================
          CHARTS
      ========================= */}

      <div className="row g-4 mb-3">


        {/* =========================
            PIE CHART
        ========================= */}

        <div className="col-xl-6">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              backgroundColor:
                "var(--spms-card)",

              borderRadius: "0px",

              border:
                "1px solid var(--spms-border)",
            }}
          >


            <div
              className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
              style={{
                backgroundColor:
                  "var(--spms-heading)",

                color:
                  "var(--spms-text)",

                borderRadius: "0px",
              }}
            >

              <PieChart size={18} />

              Guided Project Status

            </div>



            <div
              className="p-4"
              style={{
                height: "280px",
                position: "relative",
              }}
            >

              <Pie
                data={projectStatusData}
                options={
                  projectStatusOptions
                }
              />

            </div>

          </div>

        </div>



        {/* =========================
            BAR CHART
        ========================= */}

        <div className="col-xl-6">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              backgroundColor:
                "var(--spms-card)",

              borderRadius: "0px",

              border:
                "1px solid var(--spms-border)",
            }}
          >


            <div
              className="p-3 fs-6 fw-bold d-flex align-items-center gap-2"
              style={{
                backgroundColor:
                  "var(--spms-heading)",

                color:
                  "var(--spms-text)",

                borderRadius: "0px",
              }}
            >

              <BarChart2 size={18} />

              Projects Overview

            </div>



            <div
              className="p-4"
              style={{
                height: "280px",
                position: "relative",
              }}
            >

              <Bar
                data={submissionsData}
                options={
                  submissionsOptions
                }
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


export default Dashboard;

