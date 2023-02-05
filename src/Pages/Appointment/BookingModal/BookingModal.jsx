import React, { useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { user } = useContext(AuthContext);
  const { name, slots, price } = treatment || {}; // appointments options
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.name.value;
    const slot = form.slot.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const booking = {
      appointmentDate: format(selectedDate, "PP"),
      treatment: name,
      patient: userName,
      slot,
      email,
      phone,
      price,
    };
    // TODO: send data to the server and once data is saved then close the modal and display the success message
    // console.log(booking);
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking Confirmed!");
          refetch();
        } else {
          toast.error(data.message);
          setTreatment(null);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              type="text"
              placeholder="Type here"
              value={format(selectedDate, "PP")}
              disabled
              className="input w-full input-bordered"
            />
            <select
              name="slot"
              className="select select-bordered focus:outline-none w-full"
            >
              <option disabled>Select a Slot</option>
              {slots?.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Your Email"
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered focus:outline-none"
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
