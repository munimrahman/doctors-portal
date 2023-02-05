import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  return (
    <div>
      <p className="text-red-500 text-2xl">Something went wrong!!!</p>
      <p className="text-red-400">{error.statusText || error.message}</p>
      <h4 className="text-3xl">
        <Link to={"/"}>Go Home</Link>
      </h4>
    </div>
  );
};

export default ErrorElement;
