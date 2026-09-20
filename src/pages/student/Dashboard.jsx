import React from "react";

import DashboardCard from "../../components/DashboardCard";

import {
    FolderKanban,
    Clock3,
    CheckCircle,
    FileText,
    TrendingUp,
    MessageSquare,
    PieChart,
    BarChart2
} from "lucide-react";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);



function Dashboard() {


    // Project Progress Chart
    const projectProgressData = {

        labels: [
            "Completed",
            "Remaining"
        ],

        datasets: [
            {
                data: [70, 30],
                backgroundColor: [
                    "#28a745",
                    "#ffc107"
                ],
                borderWidth: 1
            }
        ]
    };


    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };



    // Task Status Chart
    const taskData = {

        labels: [
            "Pending",
            "Completed"
        ],

        datasets: [
            {
                label: "Tasks",
                data: [3, 7],
                backgroundColor: [
                    "#ffc107",
                    "#28a745"
                ]
            }
        ]

    };


    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };



    return (

        <div className="container-fluid py-2"
            style={{ color: "var(--spms-text)" }}
        >


            {/* Header */}

            <div className="mb-4">

                <h4 className="mb-1 fs-5 fw-bold">
                    Student Dashboard
                </h4>

                <p className="text-muted mb-0"
                    style={{ fontSize: "0.85rem" }}
                >
                    Overview of your project progress and tasks.
                </p>

            </div>



            {/* Cards */}

            <div className="row g-4 mb-4">


                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="My Project"

                        value="1"

                        icon={<FolderKanban size={30} />}

                        color="primary"

                    />

                </div>



                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Pending Tasks"

                        value="3"

                        icon={<Clock3 size={30} />}

                        color="warning"

                    />

                </div>




                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Completed Tasks"

                        value="7"

                        icon={<CheckCircle size={30} />}

                        color="success"

                    />

                </div>




                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Progress"

                        value="70%"

                        icon={<TrendingUp size={30} />}

                        color="info"

                    />

                </div>


            </div>





            {/* Second Row */}

            <div className="row g-4 mb-4">


                <div className="col-xl-4 col-md-6">

                    <DashboardCard

                        title="Documents"

                        value="5"

                        icon={<FileText size={30} />}

                        color="dark"

                    />

                </div>



                <div className="col-xl-4 col-md-6">

                    <DashboardCard

                        title="Faculty Feedback"

                        value="2"

                        icon={<MessageSquare size={30} />}

                        color="primary"

                    />

                </div>


            </div>





            {/* Charts */}

            <div className="row g-4">



                <div className="col-xl-6">


                    <div className="card border-0 shadow-sm">


                        <div className="p-3 fw-bold d-flex gap-2">

                            <PieChart size={18} />

                            Project Progress

                        </div>


                        <div
                            className="p-4"
                            style={{ height: "280px" }}
                        >

                            <Pie
                                data={projectProgressData}
                                options={pieOptions}
                            />


                        </div>


                    </div>


                </div>





                <div className="col-xl-6">


                    <div className="card border-0 shadow-sm">


                        <div className="p-3 fw-bold d-flex gap-2">

                            <BarChart2 size={18} />

                            Task Status

                        </div>



                        <div
                            className="p-4"
                            style={{ height: "280px" }}
                        >

                            <Bar
                                data={taskData}
                                options={barOptions}
                            />


                        </div>


                    </div>



                </div>



            </div>




        </div>

    );


}


export default Dashboard;