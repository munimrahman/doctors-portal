import React from "react";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import backgroundImg from "../../../assets/images/appointment.png";

const HomeContact = () => {
  return (
    <section
      className="py-10 my-16"
      style={{ background: `url(${backgroundImg})` }}
    >
      <div className="my-5 text-center">
        <h4 className="text-lg text-secondary font-bold">Contact Us</h4>
        <h1 className="text-4xl font-bold text-white">
          Stay connected with us
        </h1>
      </div>
      <div className="text-center">
        <input
          type="text"
          placeholder="Your Email"
          className="input input-bordered w-full max-w-xl"
        />
        <br />
        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full max-w-xl my-5"
        />
        <br />
        <textarea
          className="textarea input-bordered h-44 w-full max-w-xl"
          placeholder="Your Message Here"
        ></textarea>
        <div className="my-5">
          <PrimaryButton>Submit</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
