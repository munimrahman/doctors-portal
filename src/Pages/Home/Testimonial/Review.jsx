import React from "react";

const Review = ({ review }) => {
  const { name, address, description, img } = review;
  return (
    <div className="card shadow-xl">
      <div className="card-body">
        <p className="pt-4">{description}</p>
        <div className="card-actions my-4">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={img} />
            </div>
          </div>
          <div className="px-4">
            <h5 className="text-lg">{name}</h5>
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
