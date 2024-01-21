import React from "react";
import "./ShoppingCardCard.css";

const ShoppingCardCard = (props) => {
  return (
    <div className="shopping-card-section-wrapper">
      <div>
        <button className="shopping-card-x-button" onClick={props.delete}>
          X
        </button>
        <img
          src={props.bild}
          className="shopping-card-image"
          alt={props.titel}
        />
      </div>
      <div className="shopping-card-titel-Color">
        <p className="shopping-card-titel">{props.titel}</p>
        <span className="shopping-card-color">{props.color}</span>
      </div>

      <div className="list-inline pb-3 shopping-card-counter">
        <h5 className="shopping-card-counter-value">{props.value}</h5>{" "}
      </div>

      <p className="shopping-card-price">{props.price}</p>
    </div>
  );
};

export default ShoppingCardCard;
