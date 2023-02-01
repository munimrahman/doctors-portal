import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-5xl text-primary my-36 text-center">
        Dashboard Coming Soon...
      </h1>
      <div className="text-center">
        <Link to={"/"} className="btn btn-accent">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
