import React from 'react'

const MeineBestellungenCard = (props) => {
  return (
    <>
       <div className='kunden-Bestellung-section-wrapper'>
            <div>
              <img src={props.bild} className='kunden-Bestellung-image' />
            </div>
            <div className='kunden-Bestellung-titel-Color'>
              <p className='kunden-Bestellung-titel'>{props.titel}</p>
              <span className='kunden-Bestellung-color'>{props.size} </span>
            </div>

            <div className='kunden-Bestellung-counter'>
              <p className='kunden-Bestellung-counter-value'>{props.value}</p>
            </div>

            <p className='kunden-Bestellung-price'>{props.price}</p>

            </div>
    </>
  )
}

export default MeineBestellungenCard
