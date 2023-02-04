import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);

  if (token) {
    navigate("/");
  }

  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User Created Successfully!");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // save user to database
  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  const passwordValidation = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/\d/.test(value)) return "Password must contain at least one number";
    if (!/[!@#$_%^&*]/.test(value))
      return "Password must contain at least one special character (!, @, #, $, %, ^, &, or *)";
    return undefined;
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="md:w-4/12 p-10 shadow-xl rounded-lg">
        <h2 className="text-3xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              className={`input input-bordered ${
                errors.name && "input-error"
              } w-full`}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="text"
              className={`input input-bordered ${
                errors.email && "input-error"
              } w-full`}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                validate: passwordValidation,
              })}
              type="password"
              className={`input input-bordered ${
                errors.password && "input-error"
              } w-full`}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="text-center my-4">
            <input
              type="submit"
              value={"Sign Up"}
              className="btn btn-accent w-full my-2"
            />
            <p>
              Already Have an Account?{" "}
              <Link to={"/login"} className="text-secondary">
                Login Here
              </Link>
            </p>
          </div>
          <div className="divider">OR</div>
          <button className="btn btn-accent btn-outline w-full">
            CONTINUE WITH GOOGLE
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
