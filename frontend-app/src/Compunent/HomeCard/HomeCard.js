import React from 'react';
 
import './HomeCard.css';

const HomeCard = (props) => {
  return (
    <>

        <div className="item" >
        {props.children}

          <img src={props.KategorieBild} alt="Course One" />
          <div className="down-content">
            <h4>{props.KategorieName}</h4>
            <div className="info">
              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <span>{props.KategoriePreis}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default HomeCard;
