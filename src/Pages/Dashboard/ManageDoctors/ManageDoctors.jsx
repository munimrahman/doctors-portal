import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { coolGray } from "tailwindcss/colors";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };
  const { data: doctors = [], refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctors-portal-server-five-inky.vercel.app/doctors",
        {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      );
      const data = await res.json();
      return data;
    },
  });
  const handleDeleteDoctor = (doctor) => {
    fetch(
      `https://doctors-portal-server-five-inky.vercel.app/doctors/${doctor._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Delete");
        refetch();
      });
  };
  return (
    <div>
      <h1 className="text-3xl mb-5">Manage Doctors</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row --> */}
            {doctors?.map((doctor, i) => (
              <tr key={i} className="hover">
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctor.image} />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>
                  {/* The button to open modal */}
                  <label
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirmation-modal"
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingDoctor.name}. It can not be undone`}
          closeModal={closeModal}
          confirmDelete={handleDeleteDoctor}
          modalData={deletingDoctor}
          successButtonText={"Delete"}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
