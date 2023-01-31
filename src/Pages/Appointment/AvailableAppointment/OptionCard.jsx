import React from "react";
import PrimaryButton from "../../.././components/PrimaryButton/PrimaryButton";

const OptionCard = ({ option, setTreatment }) => {
  const { name, slots } = option || {};

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center my-5">
        <h2 className="text-primary text-xl">{name}</h2>
        <p className="my-2">
          {slots.length > 0 ? slots[0] : "Try Another Day"}
        </p>
        <p className="mb-2">
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <div className="card-actions justify-center">
          <label
            htmlFor="booking-modal"
            className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary"
            onClick={() => setTreatment(option)}
            disabled={slots.length === 0}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;
