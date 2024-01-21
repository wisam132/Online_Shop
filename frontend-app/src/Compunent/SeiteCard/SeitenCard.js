import React from "react";
import { Link } from "react-router-dom";
import "./SeiteCard.css";

const SeiteCard = (props) => {
  return (
    <>
      <div className="col-12 col-md-4 mb-4">
        <Link
          to={`/shop/kategorie/view/${props.id}`}
          className="text-decoration-none"
        >
          <div className="card h-100">
            <img src={props.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <ul className="list-unstyled d-flex justify-content-between">
                <li></li>
              </ul>
              <Link className="h2 text-decoration-none text-dark">
                {props.titel}
              </Link>
              <p className="card-text">{props.description}</p>
              <p className="text-muted">Preis: {props.price}€</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SeiteCard;
