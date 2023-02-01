import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading)
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-live="polite"
        aria-busy="true"
        aria-labelledby="title-08a desc-08a"
        class="w-6 h-6"
      >
        <title id="title-08a">Icon title</title>
        <desc id="desc-08a">Some desc</desc>
        <path
          d="M7 8H3V16H7V8Z"
          class="fill-emerald-500 animate animate-bounce "
        />
        <path
          d="M14 8H10V16H14V8Z"
          class="fill-emerald-500 animate animate-bounce  [animation-delay:.2s]"
        />
        <path
          d="M21 8H17V16H21V8Z"
          class="fill-emerald-500 animate animate-bounce  [animation-delay:.4s]"
        />
      </svg>
    );
  if (user) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
