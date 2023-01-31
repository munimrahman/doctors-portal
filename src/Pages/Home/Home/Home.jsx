import React from "react";
import Banner from "../Banner/Banner";
import HomeContact from "../HomeContact/HomeContact";
import InfoCards from "../InfoCards/InfoCards";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import ServiceDetails from "../Services/ServiceDetails";
import Services from "../Services/Services";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="mx-5">
      <Banner></Banner>
      <InfoCards></InfoCards>
      <Services></Services>
      <ServiceDetails></ServiceDetails>
      <MakeAppointment></MakeAppointment>
      <Testimonial></Testimonial>
      <HomeContact></HomeContact>
    </div>
  );
};

export default Home;
