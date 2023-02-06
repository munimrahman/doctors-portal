import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import OptionCard from "./OptionCard";

const AvailableAppointment = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null); // appointment option
  const date = format(selectedDate, "PP");

  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(
        `https://doctors-portal-server-five-inky.vercel.app/appointment-options?date=${date}`
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-16">
      <div className="text-center text-xl">
        <h1 className="text-secondary">
          Available Services on {format(selectedDate, "PP")}
        </h1>
        <p>Please Select a Service</p>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {appointmentOptions.map((option) => (
          <OptionCard
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          ></OptionCard>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          selectedDate={selectedDate}
          refetch={refetch}
          setTreatment={setTreatment}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointment;
