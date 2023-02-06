import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();
  const { data: specialties = [] } = useQuery({
    queryKey: ["appointmentSpecialty"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctors-portal-server-five-inky.vercel.app/appointmentSpecialty"
      );
      const data = res.json();
      return data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const handleAddDoctor = (data) => {
    // console.log(data);
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url,
          };
          //   save info to database
          fetch("https://doctors-portal-server-five-inky.vercel.app/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success(`${data.name} is added successfully`);
              navigate("/dashboard/alldoctors");
            });
        }
      });
  };

  console.log(imageHostKey);
  return (
    <div className="w-96 p-7">
      <h1 className="text-3xl mb-5">Add Doctor</h1>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
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
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty")}
            className="select select-bordered w-full max-w-xs"
          >
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <span className="text-red-500">{errors.specialty.message}</span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            {...register("img", {
              required: "Image is required",
            })}
            type="file"
            // className="file-input file-input-bordered w-full max-w-xs"
            className={`file-input file-input-bordered ${
              errors.img && "input-error"
            } w-full`}
          />
          {errors.img && (
            <span className="text-red-500">{errors.img.message}</span>
          )}
        </div>
        <div className="text-center my-4">
          <input
            type="submit"
            value={"Add Doctor"}
            className="btn btn-accent w-full my-2"
          />
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
