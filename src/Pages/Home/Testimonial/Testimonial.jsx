import React from "react";
import quote from "../../../assets/icons/quote.svg";
import people from "../../../assets/images/people1.png";
import people1 from "../../../assets/images/people2.png";
import people2 from "../../../assets/images/people3.png";
import Review from "./Review";

const Testimonial = () => {
  const reviewsData = [
    {
      id: 1,
      name: "Winson Herry",
      address: "California",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people,
    },
    {
      id: 2,
      name: "Tamim Iqbal",
      address: "Dhaka",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people1,
    },
    {
      id: 3,
      name: "Mehedi Miraz",
      address: "Barishal",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: people2,
    },
  ];
  return (
    <section className="my-16">
      <div className="flex justify-between">
        <div>
          <h4 className="text-xl text-primary font-bold">Testimonial</h4>
          <h2 className="text-4xl">What Our Patients Says</h2>
        </div>
        <figure className="w-48">
          <img src={quote} alt="" />
        </figure>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviewsData.map((review) => (
          <Review key={review.id} review={review}></Review>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
