

function DashboardCard({title, value, icon, color}) {



    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center ">


                    <div>

                        <p className="text-muted mb-1">
                            {title}
                        </p>


                        <h2 className="fw-bold">
                            {value}
                        </h2>

                    </div>


                    <div 
                    className={`fs-1 text-${color}`}>
                        {icon}
                    </div>


                </div>

            </div>

        </div>

    )
}


export default DashboardCard;