import React from "react";

const InfoCard = ({ card }) => {
  const { name, icon, description, bgClass } = card;
  return (
    <div
      className={`card text-white my-16 p-6 md:card-side ${bgClass} shadow-xl`}
    >
      <figure>
        <img src={icon} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
